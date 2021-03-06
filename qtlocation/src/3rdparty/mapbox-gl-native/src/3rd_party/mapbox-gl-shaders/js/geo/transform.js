'use strict';

const LngLat = require('./lng_lat'),
    Point = require('point-geometry'),
    Coordinate = require('./coordinate'),
    util = require('../util/util'),
    interp = require('../util/interpolate'),
    TileCoord = require('../source/tile_coord'),
    EXTENT = require('../data/extent'),
    glmatrix = require('@mapbox/gl-matrix');

const vec4 = glmatrix.vec4,
    mat4 = glmatrix.mat4,
    mat2 = glmatrix.mat2;

/**
 * A single transform, generally used for a single tile to be
 * scaled, rotated, and zoomed.
 * @private
 */
class Transform {
    constructor(minZoom, maxZoom, renderWorldCopies) {
        this.tileSize = 512; // constant

        this._renderWorldCopies = renderWorldCopies === undefined ? true : renderWorldCopies;
        this._minZoom = minZoom || 0;
        this._maxZoom = maxZoom || 22;

        this.latRange = [-85.05113, 85.05113];

        this.width = 0;
        this.height = 0;
        this._center = new LngLat(0, 0);
        this.zoom = 0;
        this.angle = 0;
        this._fov = 0.6435011087932844;
        this._pitch = 0;
        this._unmodified = true;
    }

    get minZoom() { return this._minZoom; }
    set minZoom(zoom) {
        if (this._minZoom === zoom) return;
        this._minZoom = zoom;
        this.zoom = Math.max(this.zoom, zoom);
    }

    get maxZoom() { return this._maxZoom; }
    set maxZoom(zoom) {
        if (this._maxZoom === zoom) return;
        this._maxZoom = zoom;
        this.zoom = Math.min(this.zoom, zoom);
    }

    get worldSize() {
        return this.tileSize * this.scale;
    }

    get centerPoint() {
        return this.size._div(2);
    }

    get size() {
        return new Point(this.width, this.height);
    }

    get bearing() {
        return -this.angle / Math.PI * 180;
    }
    set bearing(bearing) {
        const b = -util.wrap(bearing, -180, 180) * Math.PI / 180;
        if (this.angle === b) return;
        this._unmodified = false;
        this.angle = b;
        this._calcMatrices();

        // 2x2 matrix for rotating points
        this.rotationMatrix = mat2.create();
        mat2.rotate(this.rotationMatrix, this.rotationMatrix, this.angle);
    }

    get pitch() {
        return this._pitch / Math.PI * 180;
    }
    set pitch(pitch) {
        const p = util.clamp(pitch, 0, 60) / 180 * Math.PI;
        if (this._pitch === p) return;
        this._unmodified = false;
        this._pitch = p;
        this._calcMatrices();
    }

    get fov() {
        return this._fov / Math.PI * 180;
    }
    set fov(fov) {
        fov = Math.max(0.01, Math.min(60, fov));
        if (this._fov === fov) return;
        this._unmodified = false;
        this._fov = fov / 180 * Math.PI;
        this._calcMatrices();
    }

    get zoom() { return this._zoom; }
    set zoom(zoom) {
        const z = Math.min(Math.max(zoom, this.minZoom), this.maxZoom);
        if (this._zoom === z) return;
        this._unmodified = false;
        this._zoom = z;
        this.scale = this.zoomScale(z);
        this.tileZoom = Math.floor(z);
        this.zoomFraction = z - this.tileZoom;
        this._constrain();
        this._calcMatrices();
    }

    get center() { return this._center; }
    set center(center) {
        if (center.lat === this._center.lat && center.lng === this._center.lng) return;
        this._unmodified = false;
        this._center = center;
        this._constrain();
        this._calcMatrices();
    }

    /**
     * Return a zoom level that will cover all tiles the transform
     * @param {Object} options
     * @param {number} options.tileSize
     * @param {boolean} options.roundZoom
     * @returns {number} zoom level
     */
    coveringZoomLevel(options) {
        return (options.roundZoom ? Math.round : Math.floor)(
            this.zoom + this.scaleZoom(this.tileSize / options.tileSize)
        );
    }

    /**
     * Return all coordinates that could cover this transform for a covering
     * zoom level.
     * @param {Object} options
     * @param {number} options.tileSize
     * @param {number} options.minzoom
     * @param {number} options.maxzoom
     * @param {boolean} options.roundZoom
     * @param {boolean} options.reparseOverscaled
     * @param {boolean} options.renderWorldCopies
     * @returns {Array<Tile>} tiles
     */
    coveringTiles(options) {
        let z = this.coveringZoomLevel(options);
        const actualZ = z;

        if (z < options.minzoom) return [];
        if (z > options.maxzoom) z = options.maxzoom;

        const centerCoord = this.pointCoordinate(this.centerPoint, z);
        const centerPoint = new Point(centerCoord.column - 0.5, centerCoord.row - 0.5);
        const cornerCoords = [
            this.pointCoordinate(new Point(0, 0), z),
            this.pointCoordinate(new Point(this.width, 0), z),
            this.pointCoordinate(new Point(this.width, this.height), z),
            this.pointCoordinate(new Point(0, this.height), z)
        ];
        return TileCoord.cover(z, cornerCoords, options.reparseOverscaled ? actualZ : z, this._renderWorldCopies)
            .sort((a, b) => centerPoint.dist(a) - centerPoint.dist(b));
    }

    resize(width, height) {
        this.width = width;
        this.height = height;

        this.pixelsToGLUnits = [2 / width, -2 / height];
        this._constrain();
        this._calcMatrices();
    }

    get unmodified() { return this._unmodified; }

    zoomScale(zoom) { return Math.pow(2, zoom); }
    scaleZoom(scale) { return Math.log(scale) / Math.LN2; }

    project(lnglat) {
        return new Point(
            this.lngX(lnglat.lng),
            this.latY(lnglat.lat));
    }

    unproject(point) {
        return new LngLat(
            this.xLng(point.x),
            this.yLat(point.y));
    }

    get x() { return this.lngX(this.center.lng); }
    get y() { return this.latY(this.center.lat); }

    get point() { return new Point(this.x, this.y); }

    /**
     * latitude to absolute x coord
     * @param {number} lon
     * @returns {number} pixel coordinate
     */
    lngX(lng) {
        return (180 + lng) * this.worldSize / 360;
    }
    /**
     * latitude to absolute y coord
     * @param {number} lat
     * @returns {number} pixel coordinate
     */
    latY(lat) {
        const y = 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));
        return (180 - y) * this.worldSize / 360;
    }

    xLng(x) {
        return x * 360 / this.worldSize - 180;
    }
    yLat(y) {
        const y2 = 180 - y * 360 / this.worldSize;
        return 360 / Math.PI * Math.atan(Math.exp(y2 * Math.PI / 180)) - 90;
    }

    setLocationAtPoint(lnglat, point) {
        const translate = this.pointCoordinate(point)._sub(this.pointCoordinate(this.centerPoint));
        this.center = this.coordinateLocation(this.locationCoordinate(lnglat)._sub(translate));
    }

    /**
     * Given a location, return the screen point that corresponds to it
     * @param {LngLat} lnglat location
     * @returns {Point} screen point
     */
    locationPoint(lnglat) {
        return this.coordinatePoint(this.locationCoordinate(lnglat));
    }

    /**
     * Given a point on screen, return its lnglat
     * @param {Point} p screen point
     * @returns {LngLat} lnglat location
     */
    pointLocation(p) {
        return this.coordinateLocation(this.pointCoordinate(p));
    }

    /**
     * Given a geographical lnglat, return an unrounded
     * coordinate that represents it at this transform's zoom level.
     * @param {LngLat} lnglat
     * @returns {Coordinate}
     */
    locationCoordinate(lnglat) {
        return new Coordinate(
            this.lngX(lnglat.lng) / this.tileSize,
            this.latY(lnglat.lat) / this.tileSize,
            this.zoom).zoomTo(this.tileZoom);
    }

    /**
     * Given a Coordinate, return its geographical position.
     * @param {Coordinate} coord
     * @returns {LngLat} lnglat
     */
    coordinateLocation(coord) {
        const zoomedCoord = coord.zoomTo(this.zoom);
        return new LngLat(
            this.xLng(zoomedCoord.column * this.tileSize),
            this.yLat(zoomedCoord.row * this.tileSize));
    }

    pointCoordinate(p, zoom) {
        if (zoom === undefined) zoom = this.tileZoom;

        const targetZ = 0;
        // since we don't know the correct projected z value for the point,
        // unproject two points to get a line and then find the point on that
        // line with z=0

        const coord0 = [p.x, p.y, 0, 1];
        const coord1 = [p.x, p.y, 1, 1];

        vec4.transformMat4(coord0, coord0, this.pixelMatrixInverse);
        vec4.transformMat4(coord1, coord1, this.pixelMatrixInverse);

        const w0 = coord0[3];
        const w1 = coord1[3];
        const x0 = coord0[0] / w0;
        const x1 = coord1[0] / w1;
        const y0 = coord0[1] / w0;
        const y1 = coord1[1] / w1;
        const z0 = coord0[2] / w0;
        const z1 = coord1[2] / w1;

        const t = z0 === z1 ? 0 : (targetZ - z0) / (z1 - z0);

        return new Coordinate(
            interp(x0, x1, t) / this.tileSize,
            interp(y0, y1, t) / this.tileSize,
            this.zoom)._zoomTo(zoom);
    }

    /**
     * Given a coordinate, return the screen point that corresponds to it
     * @param {Coordinate} coord
     * @returns {Point} screen point
     */
    coordinatePoint(coord) {
        const zoomedCoord = coord.zoomTo(this.zoom);
        const p = [zoomedCoord.column * this.tileSize, zoomedCoord.row * this.tileSize, 0, 1];
        vec4.transformMat4(p, p, this.pixelMatrix);
        return new Point(p[0] / p[3], p[1] / p[3]);
    }

    /**
     * Calculate the posMatrix that, given a tile coordinate, would be used to display the tile on a map.
     * @param {TileCoord} tileCoord
     * @param {number} maxZoom maximum source zoom to account for overscaling
     */
    calculatePosMatrix(tileCoord, maxZoom) {
        // if z > maxzoom then the tile is actually a overscaled maxzoom tile,
        // so calculate the matrix the maxzoom tile would use.
        const coord = tileCoord.toCoordinate(maxZoom);
        const scale = this.worldSize / this.zoomScale(coord.zoom);

        const posMatrix = mat4.identity(new Float64Array(16));
        mat4.translate(posMatrix, posMatrix, [coord.column * scale, coord.row * scale, 0]);
        mat4.scale(posMatrix, posMatrix, [scale / EXTENT, scale / EXTENT, 1]);
        mat4.multiply(posMatrix, this.projMatrix, posMatrix);

        return new Float32Array(posMatrix);
    }

    _constrain() {
        if (!this.center || !this.width || !this.height || this._constraining) return;

        this._constraining = true;

        let minY, maxY, minX, maxX, sy, sx, x2, y2;
        const size = this.size,
            unmodified = this._unmodified;

        if (this.latRange) {
            minY = this.latY(this.latRange[1]);
            maxY = this.latY(this.latRange[0]);
            sy = maxY - minY < size.y ? size.y / (maxY - minY) : 0;
        }

        if (this.lngRange) {
            minX = this.lngX(this.lngRange[0]);
            maxX = this.lngX(this.lngRange[1]);
            sx = maxX - minX < size.x ? size.x / (maxX - minX) : 0;
        }

        // how much the map should scale to fit the screen into given latitude/longitude ranges
        const s = Math.max(sx || 0, sy || 0);

        if (s) {
            this.center = this.unproject(new Point(
                sx ? (maxX + minX) / 2 : this.x,
                sy ? (maxY + minY) / 2 : this.y));
            this.zoom += this.scaleZoom(s);
            this._unmodified = unmodified;
            this._constraining = false;
            return;
        }

        if (this.latRange) {
            const y = this.y,
                h2 = size.y / 2;

            if (y - h2 < minY) y2 = minY + h2;
            if (y + h2 > maxY) y2 = maxY - h2;
        }

        if (this.lngRange) {
            const x = this.x,
                w2 = size.x / 2;

            if (x - w2 < minX) x2 = minX + w2;
            if (x + w2 > maxX) x2 = maxX - w2;
        }

        // pan the map if the screen goes off the range
        if (x2 !== undefined || y2 !== undefined) {
            this.center = this.unproject(new Point(
                x2 !== undefined ? x2 : this.x,
                y2 !== undefined ? y2 : this.y));
        }

        this._unmodified = unmodified;
        this._constraining = false;
    }

    _calcMatrices() {
        if (!this.height) return;

        this.cameraToCenterDistance = 0.5 / Math.tan(this._fov / 2) * this.height;

        // Find the distance from the center point [width/2, height/2] to the
        // center top point [width/2, 0] in Z units, using the law of sines.
        // 1 Z unit is equivalent to 1 horizontal px at the center of the map
        // (the distance between[width/2, height/2] and [width/2 + 1, height/2])
        const halfFov = this._fov / 2;
        const groundAngle = Math.PI / 2 + this._pitch;
        const topHalfSurfaceDistance = Math.sin(halfFov) * this.cameraToCenterDistance / Math.sin(Math.PI - groundAngle - halfFov);

        // Calculate z distance of the farthest fragment that should be rendered.
        const furthestDistance = Math.cos(Math.PI / 2 - this._pitch) * topHalfSurfaceDistance + this.cameraToCenterDistance;
        // Add a bit extra to avoid precision problems when a fragment's distance is exactly `furthestDistance`
        const farZ = furthestDistance * 1.01;

        // matrix for conversion from location to GL coordinates (-1 .. 1)
        let m = new Float64Array(16);
        mat4.perspective(m, this._fov, this.width / this.height, 1, farZ);

        mat4.scale(m, m, [1, -1, 1]);
        mat4.translate(m, m, [0, 0, -this.cameraToCenterDistance]);
        mat4.rotateX(m, m, this._pitch);
        mat4.rotateZ(m, m, this.angle);
        mat4.translate(m, m, [-this.x, -this.y, 0]);

        // scale vertically to meters per pixel (inverse of ground resolution):
        // worldSize / (circumferenceOfEarth * cos(lat * ?? / 180))
        const verticalScale = this.worldSize / (2 * Math.PI * 6378137 * Math.abs(Math.cos(this.center.lat * (Math.PI / 180))));
        mat4.scale(m, m, [1, 1, verticalScale, 1]);

        this.projMatrix = m;

        // matrix for conversion from location to screen coordinates
        m = mat4.create();
        mat4.scale(m, m, [this.width / 2, -this.height / 2, 1]);
        mat4.translate(m, m, [1, -1, 0]);
        this.pixelMatrix = mat4.multiply(new Float64Array(16), m, this.projMatrix);

        // inverse matrix for conversion from screen coordinaes to location
        m = mat4.invert(new Float64Array(16), this.pixelMatrix);
        if (!m) throw new Error("failed to invert matrix");
        this.pixelMatrixInverse = m;

    }
}

module.exports = Transform;
