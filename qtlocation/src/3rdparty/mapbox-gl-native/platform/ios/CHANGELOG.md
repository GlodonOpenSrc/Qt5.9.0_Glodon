# Changelog for Mapbox iOS SDK

Mapbox welcomes participation and contributions from everyone. Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) to get started.

## master

### Internationalization

* Added support for right-to-left text and Arabic ligatures in labels. ([#6984](https://github.com/mapbox/mapbox-gl-native/pull/6984), [#7123](https://github.com/mapbox/mapbox-gl-native/pull/7123))
* Improved the line wrapping behavior of point-placed labels, especially labels written in Chinese and Japanese. ([#6828](https://github.com/mapbox/mapbox-gl-native/pull/6828), [#7446](https://github.com/mapbox/mapbox-gl-native/pull/7446))
* Added a Simplified Chinese localization. ([#7316](https://github.com/mapbox/mapbox-gl-native/pull/7316))

### Styles

* Added `circleStrokeColor`, `circleStrokeWidth`, and `circleStrokeOpacity` properties to MGLCircleStyleLayer and support for corresponding properties in style JSON files. ([#7356](https://github.com/mapbox/mapbox-gl-native/pull/7356))
* Point-placed labels in symbol style layers are now placed at more optimal locations within polygons. ([#7465](https://github.com/mapbox/mapbox-gl-native/pull/7465))
* Fixed flickering that occurred when manipulating a style layer. ([#7616](https://github.com/mapbox/mapbox-gl-native/pull/7616))
* Symbol style layers can now render point collections (known as multipoints in GeoJSON). ([#7445](https://github.com/mapbox/mapbox-gl-native/pull/7445))
* Added properties to MGLStyle to delay or animate changes to style layers. ([#7711](https://github.com/mapbox/mapbox-gl-native/pull/7711))
* Fixed an issue causing lines and text labels toward the top of the map view to appear blurry when the map is tilted. ([#7444](https://github.com/mapbox/mapbox-gl-native/pull/7444))
* Fixed incorrect interpolation of style functions in Boolean-typed style attributes. ([#7526](https://github.com/mapbox/mapbox-gl-native/pull/7526))
* Removed support for the `ref` property in layers in style JSON files. ([#7586](https://github.com/mapbox/mapbox-gl-native/pull/7586))
* Fixed an issue that collapsed consecutive newlines within text labels. ([#7446](https://github.com/mapbox/mapbox-gl-native/pull/7446))

### Other changes

* Fixed an issue where translucent, non-view-backed point annotations along tile boundaries would be drawn darker than expected. ([#6832](https://github.com/mapbox/mapbox-gl-native/pull/6832))
* Fixed flickering that occurred when panning past the antimeridian. ([#7574](https://github.com/mapbox/mapbox-gl-native/pull/7574))
* Fixed an issue that could prevent a cached style from appearing while the device is offline. ([#7770](https://github.com/mapbox/mapbox-gl-native/pull/7770))

## 3.4.0

### Packaging

* Xcode 7.3 or above is required for using this SDK. ([#6059](https://github.com/mapbox/mapbox-gl-native/issues/6059))
* Clarified that the `-ObjC` linker flag is required for linking against the static framework distribution of this SDK. ([#6213](https://github.com/mapbox/mapbox-gl-native/pull/6213))
* The API reference has a sharper look. ([#7422](https://github.com/mapbox/mapbox-gl-native/pull/7422))
* Added documentation for the Info.plist keys used by this SDK. ([#6833](https://github.com/mapbox/mapbox-gl-native/pull/6833))

### Styles and data

* A new runtime styling API allows you to adjust the style and content of the base map dynamically. All the options available in [Mapbox Studio](https://www.mapbox.com/studio/) are now exposed via MGLStyle and subclasses of MGLStyleLayer and MGLSource. ([#5727](https://github.com/mapbox/mapbox-gl-native/pull/5727))
* MGLMapView???s `styleURL` property can now be set to an absolute file URL. ([#6026](https://github.com/mapbox/mapbox-gl-native/pull/6026))
* When creating an MGLShapeSource, you can now specify options for clustering point features within the shape source. Similarly, GeoJSON sources specified by the stylesheet at design time can specify the `cluster`, `clusterMaxZoom`, and `clusterRadius` attributes. ([#5724](https://github.com/mapbox/mapbox-gl-native/pull/5724))
* Added [quadkey](https://msdn.microsoft.com/en-us/library/bb259689.aspx) support and limited WMS support in raster tile URL templates. ([#5628](https://github.com/mapbox/mapbox-gl-native/pull/5628))
* When creating an MGLTileSource, you can now specify that the tile URLs use [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) coordinates by setting `MGLTileSourceOptionTileCoordinateSystem` to `MGLTileCoordinateSystemTMS`. TileJSON files can specify `"scheme": "tms"`. ([#2270](https://github.com/mapbox/mapbox-gl-native/pull/2270))
* Fixed an issue causing abstract MGLMultiPointFeature objects to be returned in feature query results. Now concrete MGLPointCollectionFeature objects are returned. MGLMultiPointFeature is now an alias of MGLPointCollectionFeature. ([#6742](https://github.com/mapbox/mapbox-gl-native/pull/6742))
* Fixed rendering artifacts and missing glyphs that occurred after viewing a large number of CJK characters on the map. ([#5908](https://github.com/mapbox/mapbox-gl-native/pull/5908))
* `-[MGLMapView resetPosition]` now resets to the current style???s default center coordinates, zoom level, direction, and pitch, if specified. ([#6127](https://github.com/mapbox/mapbox-gl-native/pull/6127))
* Fixed an issue where feature querying sometimes failed to return the expected features when the map was tilted. ([#6773](https://github.com/mapbox/mapbox-gl-native/pull/6773))
* MGLFeature???s `attributes` and `identifier` properties are now writable. ([#6728](https://github.com/mapbox/mapbox-gl-native/pull/6728))
* The action sheet that appears when tapping the information button in the bottom-right corner now lists the correct attribution for the current style. ([#5999](https://github.com/mapbox/mapbox-gl-native/pull/5999))
* Added support for MGLSymbolStyleLayer???s `textPitchAlignment` property and the corresponding style JSON property for improved street label legibility on a tilted map. ([#5288](https://github.com/mapbox/mapbox-gl-native/pull/5288))
* Added support for MGLSymbolStyleLayer???s `iconTextFit` and `iconTextFitPadding` properties and the corresponding style JSON properties, allowing the background of a shield to automatically resize to fit the shield???s text. ([#5334](https://github.com/mapbox/mapbox-gl-native/pull/5334))
* Added support for MGLSymbolStyleLayer???s `circlePitchScale` property and the corresponding style JSON property, allowing circle features in a tilted base map to scale or remain the same size as the viewing distance changes. ([#5576](https://github.com/mapbox/mapbox-gl-native/pull/5576))
* The `identifier` property of an MGLFeature may now be either a number or string. ([#5514](https://github.com/mapbox/mapbox-gl-native/pull/5514))
* If MGLMapView is unable to obtain or parse a style, it now calls its delegate???s `-mapViewDidFailLoadingMap:withError:` method. ([#6145](https://github.com/mapbox/mapbox-gl-native/pull/6145))
* Added the `-[MGLMapViewDelegate mapView:didFinishLoadingStyle:]` delegate method, which offers the earliest opportunity to modify the layout or appearance of the current style before the map view is displayed to the user. ([#6636](https://github.com/mapbox/mapbox-gl-native/pull/6636))
* Fixed crashes that could occur when loading a malformed stylesheet. ([#5736](https://github.com/mapbox/mapbox-gl-native/pull/5736))
* Fixed an issue causing stepwise zoom functions to be misinterpreted. ([#6328](https://github.com/mapbox/mapbox-gl-native/pull/6328))
* A source???s tiles are no longer rendered when the map is outside the source???s supported zoom levels. ([#6345](https://github.com/mapbox/mapbox-gl-native/pull/6345))
* Improved style parsing performance. ([#6170](https://github.com/mapbox/mapbox-gl-native/pull/6170))
* Improved feature querying performance. ([#6514](https://github.com/mapbox/mapbox-gl-native/pull/6514))
* Fixed an issue where shapes that cannot currently be visually represented as annotations were still shown on the map as point annotations. ([#6764](https://github.com/mapbox/mapbox-gl-native/issues/6764)) 

### User location

* The user dot now animates between user locations when user tracking is disabled. ([#6215](https://github.com/mapbox/mapbox-gl-native/pull/6215))
* To customize the appearance of the user location annotation, subclass the newly added MGLUserLocationAnnotationView class and implement `-[MGLMapViewDelegate mapView:viewForAnnotation:]`. ([#5882](https://github.com/mapbox/mapbox-gl-native/pull/5882))
* `-[MGLMapView viewForAnnotation:]` now returns the user location annotation view when given the user location annotation. ([#6957](https://github.com/mapbox/mapbox-gl-native/pull/6957))
* Fixed an issue causing the user dot???s accuracy ring to wobble while zooming in and out. ([#6019](https://github.com/mapbox/mapbox-gl-native/pull/6019))
* Heading accuracy indicator sizing has been changed to appear more precise. ([#6120](https://github.com/mapbox/mapbox-gl-native/pull/6120))
* Fixed an issue that caused the map to not update to reflect the centerOffset when the user location was tracked. ([#6216](https://github.com/mapbox/mapbox-gl-native/pull/6216))

### Annotations

* Added new methods to MGLMultiPoint for changing the vertices along a polyline annotation or the exterior of a polygon annotation. ([#6565](https://github.com/mapbox/mapbox-gl-native/pull/6565))
* Added new APIs to MGLMapView to query for visible annotations. Combined with `-[MGLMapView viewForAnnotation:]`, these APIs can be used to access all visible annotation views. ([6061](https://github.com/mapbox/mapbox-gl-native/pull/6061))
* Shape, feature, and annotation classes now conform to NSSecureCoding. ([#6559](https://github.com/mapbox/mapbox-gl-native/pull/6559))
* Fixed an issue causing offscreen annotation views to be updated even when they were in the reuse queue. ([#5987](https://github.com/mapbox/mapbox-gl-native/pull/5987))
* Fixed an issue preventing MGLAnnotationView from animating when its coordinate changes. ([#6215](https://github.com/mapbox/mapbox-gl-native/pull/6215))
* Fixed an issue causing the wrong annotation view to be selected when tapping an annotation view with a center offset applied. ([#5931](https://github.com/mapbox/mapbox-gl-native/pull/5931))
* Fixed an issue that assigned annotation views to polyline and polygon annotations. ([#5770](https://github.com/mapbox/mapbox-gl-native/pull/5770))
* Fixed an issue causing the callout view to be dismissed when panning around. ([#6676](https://github.com/mapbox/mapbox-gl-native/pull/6676))
* Per documentation, the first and last coordinates in an MGLPolygon must be identical in order for the polygon to draw correctly. The same is true for an MGLPolygon???s interior polygon. ([#5514](https://github.com/mapbox/mapbox-gl-native/pull/5514))
* To make an MGLPolyline or MGLPolygon span the antimeridian, specify coordinates with longitudes greater than 180?? or less than ???180??. ([#6088](https://github.com/mapbox/mapbox-gl-native/pull/6088))
* Various method arguments that are represented as C arrays of `CLLocationCoordinate2D` instances have been marked `const` to streamline bridging to Swift. ([#7215](https://github.com/mapbox/mapbox-gl-native/pull/7215))
* Fixed an issue that caused an annotation view to disappear if it isn???t created using the annotation view reuse queue. ([#6485](https://github.com/mapbox/mapbox-gl-native/pull/6485))
* Fixed an issue that could reset user-added transformations on annotation views. ([#6166](https://github.com/mapbox/mapbox-gl-native/pull/6166))
* Improved the performance of relocating a non-view-backed point annotation by changing its `coordinate` property. ([#5385](https://github.com/mapbox/mapbox-gl-native/pull/5385))
* Fixed an issue that caused an assertion failure if a `MGLShapeCollection` (a GeoJSON GeometryCollection) was created with an empty array of shapes. ([#7632](https://github.com/mapbox/mapbox-gl-native/pull/7632))
* Improved the precision of annotations at zoom levels greater than 18. ([#5517](https://github.com/mapbox/mapbox-gl-native/pull/5517))

### Networking and offline maps

* Fixed an issue preventing an MGLMapView from loading tiles while an offline pack is downloading. ([#6446](https://github.com/mapbox/mapbox-gl-native/pull/6446))
* Fixed a crash that could occur when the device is disconnected while downloading an offline pack. ([#6293](https://github.com/mapbox/mapbox-gl-native/pull/6293))
* Fixed a crash that occurred when encountering a rate-limit error in response to a network request. ([#6223](https://github.com/mapbox/mapbox-gl-native/pull/6223))
* Fixed an issue causing an MGLOfflinePack???s progress to continue to update after calling `-suspend`. ([#6186](https://github.com/mapbox/mapbox-gl-native/pull/6186))
* Fixed an issue preventing cached annotation images from displaying while the device is offline. ([#6358](https://github.com/mapbox/mapbox-gl-native/pull/6358))
* Added support for an `MGLMapboxAPIBaseURL` key in an app's `Info.plist` in order to customize the base URL used for retrieving map data, styles, and other resources. ([#6709](https://github.com/mapbox/mapbox-gl-native/pull/6709))
* Query parameters are no longer stripped from mapbox: URLs used as resource URLs. ([#6182](https://github.com/mapbox/mapbox-gl-native/pull/6182), [#6432](https://github.com/mapbox/mapbox-gl-native/pull/6432))
* Database errors are now logged to the console. ([#6291](https://github.com/mapbox/mapbox-gl-native/pull/6291))

### Other changes

* Raster tiles such as those from Mapbox Satellite are now cached, eliminating flashing while panning back and forth. ([#7091](https://github.com/mapbox/mapbox-gl-native/pull/7091))
* Improved the performance of symbol style layers. ([#7025](https://github.com/mapbox/mapbox-gl-native/pull/7025))
* As the user zooms in, tiles from lower zoom levels are scaled up until tiles for higher zoom levels are loaded. ([#5143](https://github.com/mapbox/mapbox-gl-native/pull/5143))
* Notification names and user info keys are now string enumeration values for ease of use in Swift. ([#6794](https://github.com/mapbox/mapbox-gl-native/pull/6794))
* MGLMapDebugOverdrawVisualizationMask no longer has any effect in Release builds of the SDK. This debug mask has been disabled for performance reasons. ([#5555](https://github.com/mapbox/mapbox-gl-native/pull/5555))
* Fixed a typo in the documentation for the MGLCompassDirectionFormatter class. ([#5879](https://github.com/mapbox/mapbox-gl-native/pull/5879))
* The UITapGestureRecognizer on MGLMapView that is used for selecting annotations now fails if a tap does not select an annotation. ([#7246](https://github.com/mapbox/mapbox-gl-native/pull/7246))
* Fixed issues related to the visibility of sources in viewports less than 512 pixels wide or tall. ([#7438](https://github.com/mapbox/mapbox-gl-native/pull/7438))

## 3.3.7 - November 17, 2016

* This version is the same as 3.3.6 but it is built with Xcode 8 that produces a smaller binary. Developers using this version in Swift applications built with Xcode 7.3.1 should use the  unstripped, `*-symbols` framework.

## 3.3.6 - November 9, 2016

* Fixed a crash that occurred during low-memory situations when multiple instances of MGLMapView were in the view hierarchy. The speculative fix in v3.3.5 has been reverted. ([#6972](https://github.com/mapbox/mapbox-gl-native/pull/6972))

## 3.3.5 - November 2, 2016

* Speculatively fixed an OpenGL rendering crash. ([#6844](https://github.com/mapbox/mapbox-gl-native/pull/6844))
* Fixed an issue with symbols not being properly stripped from the dynamic framework. The dSYM file included with the standard dynamic framework in previous releases (e.g., `mapbox-ios-sdk-3.3.4-dynamic.zip` or the `Mapbox-iOS-SDK` pod) could not be used to symbolicate crashes. ([#6531](https://github.com/mapbox/mapbox-gl-native/pull/6531))
* Simulator architecture slices are included in the included dSYM file, allowing you to symbolicate crashes that occur in the Simulator. ([#5740](https://github.com/mapbox/mapbox-gl-native/pull/5740))
* Fixed a crash that sometimes occurred when initializing an MGLMapView. ([#5932](https://github.com/mapbox/mapbox-gl-native/pull/5932))

## 3.3.4 - August 8, 2016

* Fixed an issue that caused the user dot to be selected when tapping an annotation that lies within the user dot???s accuracy circle. First attempt was [#5816](https://github.com/mapbox/mapbox-gl-native/pull/5816) in v3.3.2, which excluded the pulsing halo but not the accuracy circle. ([#5894](https://github.com/mapbox/mapbox-gl-native/pull/5894))

## 3.3.3 - July 29, 2016

* Fixed an issue where the style zoom levels were not respected when deciding when to render a layer. ([#5811](https://github.com/mapbox/mapbox-gl-native/issues/5811))

## 3.3.2 - July 28, 2016

* Speculatively fixed a crash that occurred when initializing an MGLMapView on iOS 7.x. ([#5791](https://github.com/mapbox/mapbox-gl-native/pull/5791))
* View-backed annotations no longer prevent the user from starting to pan the map. ([#5813](https://github.com/mapbox/mapbox-gl-native/pull/5813))
* Fixed an issue that caused the user dot to be selected when tapping an annotation that lies within the user dot???s accuracy circle. ([#5816](https://github.com/mapbox/mapbox-gl-native/pull/5816))

## 3.3.1 - July 19, 2016

* Fixed a crash that occurred when a sprite URL lacks a file extension. See [this comment](https://github.com/mapbox/mapbox-gl-native/issues/5722#issuecomment-233701251) to determine who may be affected by this bug. ([#5723](https://github.com/mapbox/mapbox-gl-native/pull/5723))
* Fixed an issue causing overlapping polylines and polygons to be drawn in undefined z-order. Shapes are always drawn in the order they are added to the map, from the oldest on the bottom to the newest on the top. ([#5710](https://github.com/mapbox/mapbox-gl-native/pull/5710))
* Fixed an issue preventing MGLMapView from changing its viewport when a single annotation was passed into `-[MGLMapView showAnnotations:animated:]`. ([#5693](https://github.com/mapbox/mapbox-gl-native/pull/5693))
* Fixed an issue causing polyline and polygon annotations to disappear when the zoom level is one less than the maximum zoom level. ([#5418](https://github.com/mapbox/mapbox-gl-native/pull/5418))
* Fixed a crash that occurred when a style or other resource URL has a query string. ([#5554](https://github.com/mapbox/mapbox-gl-native/pull/5554))
* If you subclass MGLAnnotationView, your implementation of `-setSelected:animated:` is now called with the correct value in the `animated` parameter, making it possible to animate a deselection. ([#5677](https://github.com/mapbox/mapbox-gl-native/pull/5677))
* The compass, Mapbox logo, and attribution button now accommodate the containing map view???s content insets. If your interface elements partially overlap the map view but do not affect the top and bottom layout guides, set the `automaticallyAdjustsScrollViewInsets` property to `NO` and set the `contentInset` property to a suitable value. ([#5671](https://github.com/mapbox/mapbox-gl-native/pull/5671))
* Added a property to MGLOfflineStorage, `countOfBytesCompleted`, that indicates the disk space occupied by all cached and offline resources. ([#5585](https://github.com/mapbox/mapbox-gl-native/pull/5585))

## 3.3.0 - July 14, 2016

### Styles and data

- Added methods to MGLMapView for obtaining the underlying map data rendered by the current style, along with additional classes to represent complex geometry in that data. ([#5110](https://github.com/mapbox/mapbox-gl-native/pull/5110))
- Improved performance viewing regions with large landcover polygons when viewing a style that uses the Mapbox Streets source. ([#2444](https://github.com/mapbox/mapbox-gl-native/pull/2444))
- Fixed a memory leak when using raster resources. ([#5141](https://github.com/mapbox/mapbox-gl-native/pull/5141))
- Rendering now occurs on the main thread, fixing a hang when calling `-[MGLMapView styleURL]` before the map view has fully loaded or while the application is in the background. ([#2909](https://github.com/mapbox/mapbox-gl-native/pull/2909))
- Added a `-reloadStyle:` action to MGLMapView to force a reload of the current style. ([#4728](https://github.com/mapbox/mapbox-gl-native/pull/4728))
- A more specific user agent string is now sent with style and tile requests. ([#4012](https://github.com/mapbox/mapbox-gl-native/pull/4012))
- Added a new option to `MGLMapDebugMaskOptions`, `MGLMapDebugOverdrawVisualizationMask`, that highlights overlapping drawing operations instead of the usual rendered output. ([#5403](https://github.com/mapbox/mapbox-gl-native/pull/5403))

### Interactivity

- The compass, user dot, and visible annotations are now accessible to VoiceOver users. ([#1496](https://github.com/mapbox/mapbox-gl-native/pull/1496))
- Added a method to MGLMapView, `-anchorPointForGesture:`, that you can override to anchor gestures at a point other than the user location. ([#5302](https://github.com/mapbox/mapbox-gl-native/pull/5302))
- Added a property to MGLMapView, `decelerationRate`, that allows you to speed up or slow down the drift animation at the end of a user gesture. You can also use this property to disable the drift animation entirely. ([#5504](https://github.com/mapbox/mapbox-gl-native/pull/5504))
- Improved responsiveness when zooming in then immediately panning around. ([#4595](https://github.com/mapbox/mapbox-gl-native/pull/4595))
- Added a new method, `-[MGLMapView cameraThatFitsCoordinateBounds:]`, to get a camera that you can pass into `-setCamera:` that fits the given coordinate bounds. ([#4790](https://github.com/mapbox/mapbox-gl-native/pull/4790))

### Annotations

- MGLPointAnnotation and custom MGLAnnotation implementations (but not MGLMultiPoint) can be backed by an MGLAnnotationView instead of an MGLAnnotationImage. MGLAnnotationView is a subclass of UIView, so you can use Core Animation and other familiar technologies with it. To associate an MGLAnnotation with an MGLAnnotationView, implement `-mapView:viewForAnnotation:` in your MGLMapViewDelegate class. ([#4801](https://github.com/mapbox/mapbox-gl-native/pull/4801))
- An MGLAnnotation can be relocated by changing its `coordinate` property in a KVO-compliant way. An MGLMultiPoint cannot be relocated. ([#3835](https://github.com/mapbox/mapbox-gl-native/pull/3835))
- Setting the `image` property of an MGLAnnotationImage to `nil` resets it to the default red pin image and reclaims resources that can be used to customize additional annotations. ([#3835](https://github.com/mapbox/mapbox-gl-native/pull/3835))
- An MGLPolygon can now have interior polygons, representing holes knocked out of the overall shape. ([#5110](https://github.com/mapbox/mapbox-gl-native/pull/5110))

### User location

- The user dot now moves smoothly between user location updates while user location tracking is disabled. ([#1582](https://github.com/mapbox/mapbox-gl-native/pull/1582))
- Fixed an issue preventing KVO change notifications from being generated on MGLMapView???s `userTrackingMode` key path when `-setUserTrackingMode:animated:` is called. ([#4724](https://github.com/mapbox/mapbox-gl-native/pull/4724))
- Fixed a crash setting MGLMapView???s `userLocationVerticalAlignment` property before a user location update has occurred. ([#5278](https://github.com/mapbox/mapbox-gl-native/pull/5278))
- Mapbox Telemetry is automatically disabled while the host application is running in the iOS Simulator. ([#4726](https://github.com/mapbox/mapbox-gl-native/pull/4726))

### Offline maps

- `MGLOfflinePackProgress` now indicates how many tiles have been downloaded and how much space they take up. ([#4874](https://github.com/mapbox/mapbox-gl-native/pull/4874))
- Fixed an issue where the tile cache could be included in iCloud backups on the first launch. ([#5124](https://github.com/mapbox/mapbox-gl-native/pull/5124), [#5601](https://github.com/mapbox/mapbox-gl-native/pull/5601))
- Suppressed ???Unable to make space for entry??? console spew. ([#4708](https://github.com/mapbox/mapbox-gl-native/pull/4708))
- Deprecated `-[MGLMapView emptyMemoryCache]`. ([#4725](https://github.com/mapbox/mapbox-gl-native/pull/4725))

### Packaging

- Improved the design of the generated API documentation. ([#5306](https://github.com/mapbox/mapbox-gl-native/pull/5306))
- Applications linking against the SDK static framework no longer need to add `-ObjC` to the Other Linker Flags (`OTHER_LDFLAGS`) build setting. If you previously added this flag solely for this SDK, removing the flag may potentially reduce the overall size of your application. ([#4641](https://github.com/mapbox/mapbox-gl-native/pull/4641))
- Removed the `armv7s` slice from the SDK to reduce its size. iPhone 5 and iPhone 5c automatically use the `armv7` slice instead. ([#4641](https://github.com/mapbox/mapbox-gl-native/pull/4641))
- The SDK is now localizable. No localizations are currently provided, other than English, but if you need a particular localization, you can install the SDK manually and drop a .lproj folder into the framework. ([#4783](https://github.com/mapbox/mapbox-gl-native/pull/4783))
- Removed unused SVG files from the SDK???s resource bundle. ([#4641](https://github.com/mapbox/mapbox-gl-native/pull/4641))

### Other changes

- Added category methods on NSValue for converting to and from the structure types defined in MGLGeometry.h. ([#4802](https://github.com/mapbox/mapbox-gl-native/pull/4802))
- Added NSFormatter subclasses for converting geographic coordinates and directions into display strings. ([#4802](https://github.com/mapbox/mapbox-gl-native/pull/4802))
- Added `MGLCoordinateInCoordinateBounds()`, a function that tests whether or not a coordinate is in a given bounds. ([#5053](https://github.com/mapbox/mapbox-gl-native/pull/5053))

## 3.2.3 - June 7, 2016

- Fixed an issue preventing `-[MGLMapViewDelegate mapViewDidFinishLoadingMap:]` from being called when returning to the view controller containing the map view from another view controller. ([#5164](https://github.com/mapbox/mapbox-gl-native/pull/5164))
- Declarations in the API documentation are shown in both Objective-C and Swift. ([realm/jazzy#530](https://github.com/realm/jazzy/pull/530))

## 3.2.2 - May 10, 2016

- Existing MGLStyle class methods that return default style URLs have been deprecated in favor of new methods that require an explicit style version parameter. The deprecated, unversioned methods continue to return version 8 of the respective styles and will not be updated as new versions of the styles are released. ([#4759](https://github.com/mapbox/mapbox-gl-native/pull/4759))
- Deprecated `+[MGLStyle emeraldStyleURL]` with no replacement method. To use the Emerald style going forward, we recommend that you use the underlying URL. ([#4759](https://github.com/mapbox/mapbox-gl-native/pull/4759))
- Added `+[MGLStyle outdoorsStyleURLWithVersion:]` for the new Outdoors style. ([#4759](https://github.com/mapbox/mapbox-gl-native/pull/4759))
- The Hybrid style is now called Satellite Streets. ([#4759](https://github.com/mapbox/mapbox-gl-native/pull/4759))

## 3.2.1 - April 20, 2016

- Fixed a hang that could occur if the host application attempts to set user defaults on a background queue. ([#4745](https://github.com/mapbox/mapbox-gl-native/pull/4745))
- User location heading updates now resume properly when an app becomes active again. ([#4674](https://github.com/mapbox/mapbox-gl-native/pull/4674))
- Fixed an issue causing hyperlinks in the documentation to be displayed as raw Markdown syntax when viewed in Xcode???s Quick Help popover or sidebar. ([#4760](https://github.com/mapbox/mapbox-gl-native/pull/4760))

## 3.2.0 - April 5, 2016

- If you???ve previously installed the SDK as a static framework, the installation workflow has changed to address issues when submitting your application to the App Store or installing it on a device. Upon upgrading to this version of the SDK, you???ll need to add Mapbox.bundle to the Copy Bundle Resources build phase and remove Mapbox.framework from the Embed Frameworks build phase. ([#4455](https://github.com/mapbox/mapbox-gl-native/pull/4455))
- Offline packs can now be downloaded to allow users to view specific regions of the map offline. A new MGLOfflineStorage class provides APIs for managing MGLOfflinePacks. ([#4221](https://github.com/mapbox/mapbox-gl-native/pull/4221))
- Tiles and other resources are cached in the same file that holds offline resources. The combined cache file is located in a subdirectory of the user???s Application Support directory, which means iOS will not delete the file when disk space runs low. ([#4377](https://github.com/mapbox/mapbox-gl-native/pull/4377))
- Fixed an issue where the map view???s center would always be calculated as if the view occupied the entire screen. ([#4504](https://github.com/mapbox/mapbox-gl-native/issues/4504))
- The user dot no longer disappears after panning the map across the antimeridian at low zoom levels. ([#4275](https://github.com/mapbox/mapbox-gl-native/pull/4275))
- The map no longer recoils when panning quickly at low zoom levels. ([#4214](https://github.com/mapbox/mapbox-gl-native/pull/4214))
- Fixed an issue causing the map to pan the wrong way when the user pinches unevenly. ([#4427](https://github.com/mapbox/mapbox-gl-native/pull/4427))
- The maximum zoom level is capped at 21 due to rendering issues at higher zoom levels. ([#4417](https://github.com/mapbox/mapbox-gl-native/pull/4417))
- An icon laid out along a line no longer appears if it would extend past the end of the line. Some one-way arrows no longer point the wrong way. ([#3839](https://github.com/mapbox/mapbox-gl-native/pull/3839))
- Fixed warping of dashed lines near sharp corners. ([#3914](https://github.com/mapbox/mapbox-gl-native/pull/3914))
- Telemetry location gathering now occurs only when the device is in motion. ([#4115](https://github.com/mapbox/mapbox-gl-native/pull/4115))
- An account???s monthly active users metric only counts a user once a map view is displayed to that user. ([#3713](https://github.com/mapbox/mapbox-gl-native/pull/3713))
- A .dSYM bundle is included with the dynamic framework to facilitate symbolication of crash logs.
- Updated documentation to reflect the requirement that you must embed the dynamic framework in the ???Embedded Binaries??? section in Xcode. ([#4011](https://github.com/mapbox/mapbox-gl-native/issues/4011))
- Polygons and polylines now default to using the map view???s tint color. ([#4028](https://github.com/mapbox/mapbox-gl-native/pull/4028))
- The user dot no longer lags when panning the map. ([#3683](https://github.com/mapbox/mapbox-gl-native/pull/3683))
- The Improve This Map tool now uses the same zoom level that is currently being shown in the map view. ([#4068](https://github.com/mapbox/mapbox-gl-native/pull/4068))
- Fixed a formatting issue in the documentation for `MGLCoordinateBoundsIsEmpty()`. ([#3958](https://github.com/mapbox/mapbox-gl-native/pull/3958))

## 3.1.2 - February 22, 2016

- You can once again install the static framework without manually linking several framework and library dependencies. ([#4029](https://github.com/mapbox/mapbox-gl-native/pull/4029))
- The location manager used by MGLMapView to show the user???s location is now paused when the application is sent to the background. ([#4034](https://github.com/mapbox/mapbox-gl-native/pull/4034))

## 3.1.1 - February 15, 2016

- Corrected the dynamic framework???s minimum deployment target to iOS 8.0. ([#3872](https://github.com/mapbox/mapbox-gl-native/pull/3872))
- Fixed Fabric compatibility. ([#3847](https://github.com/mapbox/mapbox-gl-native/pull/3847))
- Fixed a crash that can occur when reselecting an annotation. ([#3881](https://github.com/mapbox/mapbox-gl-native/pull/3881))
- Fixed an issue preventing the Latitude inspectable from working when it is set before setting the Zoom Level inspectable in Interface Builder. ([#3886](https://github.com/mapbox/mapbox-gl-native/pull/3886))
- Fixed an issue that incorrectly expanded the tappable area of an annotation and prevented the annotation???s alignment rect insets from having any effect on the tappable area. ([#3898](https://github.com/mapbox/mapbox-gl-native/pull/3898))
- Fixed an issue preventing `-[MGLMapViewDelegate mapView:tapOnCalloutForAnnotation:]` from being called when a non-custom callout view is tapped. ([#3875](https://github.com/mapbox/mapbox-gl-native/pull/3875))

## 3.1.0 - February 5, 2016

- The SDK is now distributed as a dynamic framework instead of a static library, resulting in a simpler installation workflow and significantly reduced download size. The framework contains both simulator and device content. If you install the dynamic framework manually, you???ll need to strip out the simulator content before submitting your application to the App Store due to [an Xcode bug](http://www.openradar.me/radar?id=6409498411401216); see the installation instructions included with the framework for details. ([#3183](https://github.com/mapbox/mapbox-gl-native/pull/3183))
- Fixed an issue causing the entire MGLMapView to leak. ([#3448](https://github.com/mapbox/mapbox-gl-native/pull/3448))
- `MGLMapView` methods that alter the viewport now accept optional completion handlers. ([#3090](https://github.com/mapbox/mapbox-gl-native/pull/3090))
- You can now modify an annotation???s image after adding the annotation to the map. ([#3146](https://github.com/mapbox/mapbox-gl-native/pull/3146))
- Tapping now selects annotations more reliably. Tapping near the top of a large annotation image now selects that annotation. An annotation image???s alignment insets influence how far away the user can tap and still select the annotation. For example, if your annotation image has a large shadow, you can keep that shadow from being tappable by excluding it from the image???s alignment rect. ([#3261](https://github.com/mapbox/mapbox-gl-native/pull/3261))
- Annotations remain visible after switching to a different style. ([#3049](https://github.com/mapbox/mapbox-gl-native/pull/3049))
- The minimum and maximum zoom levels can now be configured using the `minimumZoomLevel` and `maximumZoomLevel` properties, respectively. The map is no longer limited to zoom level 18: by default, the maximum zoom level is now 20, allowing for a more detailed map in urban areas. ([#3712](https://github.com/mapbox/mapbox-gl-native/pull/3712))
- A new method on MGLMapView, `-flyToCamera:withDuration:completionHandler:`, lets you transition between viewpoints along an arc as if by aircraft. ([#3171](https://github.com/mapbox/mapbox-gl-native/pull/3171), [#3301](https://github.com/mapbox/mapbox-gl-native/pull/3301))
- MGLMapCamera???s `altitude` values now match those of MKMapCamera. ([#3362](https://github.com/mapbox/mapbox-gl-native/pull/3362))
- MGLMapView properties like `centerCoordinate` and `camera` now offset the center to account for any translucent top or bottom bar. As a result, when user tracking is enabled and the map view is an immediate child of a view controller, the user dot is centered in the unobscured portion of the map view. To override this offset, modify the `contentInset` property; you may also need to set the containing view controller???s `automaticallyAdjustsScrollViewInsets` property to `NO`. ([#3583](https://github.com/mapbox/mapbox-gl-native/pull/3583))
- In user tracking mode, the user dot stays in a fixed position within MGLMapView while the map pans smoothly. A new property, `userLocationVerticalAlignment`, determines the user dot???s fixed position. ([#3589](https://github.com/mapbox/mapbox-gl-native/pull/3589))
- When the user tracking mode is set to `MGLUserTrackingModeFollowWithCourse`, an optional `targetCoordinate` is kept within sight at all times as the user changes location. This property, in conjunction with the `userLocationVerticalAlignment` property, may be useful for displaying the user???s progress toward a waypoint. ([#3680](https://github.com/mapbox/mapbox-gl-native/pull/3680))
- Heading or course tracking mode can now be enabled as soon as an MGLMapView is initialized. ([#3680](https://github.com/mapbox/mapbox-gl-native/pull/3680))
- Zooming and rotation gestures no longer disable user tracking mode. ([#3589](https://github.com/mapbox/mapbox-gl-native/pull/3589))
- User tracking mode starts out at a lower zoom level by default. ([#3589](https://github.com/mapbox/mapbox-gl-native/pull/3589))
- Fixed an issue with small map views not properly fitting annotations within bounds. (#[3407](https://github.com/mapbox/mapbox-gl-native/pull/3407))
- When the user rotates the map to within 7?? of true north, the map view now snaps to true north. ([#3403](https://github.com/mapbox/mapbox-gl-native/pull/3403))
- The map view???s background can now be transparent or translucent, as long as the style???s background layer is transparent or translucent and `MGLMapView.opaque` is set to `NO`. ([#3096](https://github.com/mapbox/mapbox-gl-native/pull/3096))
- Documentation is now generated by [jazzy](https://github.com/realm/jazzy) instead of appledoc. ?????? ([#3203](https://github.com/mapbox/mapbox-gl-native/pull/3203))
- New API to provide a custom callout view to the map for annotations. ([#3456](https://github.com/mapbox/mapbox-gl-native/pull/3456))
- Made telemetry on/off setting available in-app. ([#3445](https://github.com/mapbox/mapbox-gl-native/pull/3445))
- Fixed an issue with users not being counted by Mapbox if they had disabled telemetry. ([#3495](https://github.com/mapbox/mapbox-gl-native/pull/3495))
- Fixed crash caused by MGLAnnotationImage with non-integer width or height ([#2198](https://github.com/mapbox/mapbox-gl-native/issues/2198))
- Fixed ???include of non-modular header??? errors in Swift projects managed by CocoaPods. ([#3679](https://github.com/mapbox/mapbox-gl-native/pull/3679))
- Avoids triggering the blue background location status bar when user has granted "when in use" permission. ([#3671](https://github.com/mapbox/mapbox-gl-native/issues/3671))
- Deprecated the `debugActive` property and `-toggleDebug` method on MGLMapView in favor of a new `debugMask` property that exposes individual style debugging options. ([#3742](https://github.com/mapbox/mapbox-gl-native/pull/3742))

## 3.0.1 - December 7, 2015

- Fixed CoreTelephony.framework crash. ([#3170](https://github.com/mapbox/mapbox-gl-native/pull/3170))
- Fixed an issue preventing the compass from responding to taps after the compass is moved programmatically. ([#3117](https://github.com/mapbox/mapbox-gl-native/pull/3117))
- CocoaPods is now distributed via a (static) framework. ([#3181](https://github.com/mapbox/mapbox-gl-native/issues/3181))

## 3.0.0 - November 23, 2015

- If you install this SDK via CocoaPods, CocoaPods version 0.38.0 or above is required. ([#2132](https://github.com/mapbox/mapbox-gl-native/pull/2132))
- The `styleID` property has been removed from MGLMapView. Instead, set the `styleURL` property to an NSURL in the form `mapbox://styles/STYLE_ID`. If you previously set the style ID in Interface Builder???s Attributes inspector, delete the `styleID` entry from the User Defined Runtime Attributes section of the Identity inspector, then set the new ???Style URL??? inspectable to a value in the form `mapbox://styles/STYLE_ID`. ([#2632](https://github.com/mapbox/mapbox-gl-native/pull/2632))
- Default styles such as Streets are no longer bundled with the SDK; instead, they are loaded at runtime from the style API on mapbox.com. As always, you can use these default styles with any valid access token, and Streets continues to be `MGLMapView`???s initial style. The `bundledStyleURLs` property on `MGLMapView` has been deprecated in favor of several class methods on `MGLStyle` that provide direct access to the default styles. ([#2746](https://github.com/mapbox/mapbox-gl-native/pull/2746))
- The SDK now builds with Bitcode enabled. A version of libMapbox.a with Bitcode disabled is also available. ([#2332](https://github.com/mapbox/mapbox-gl-native/issues/2332), [#3003](https://github.com/mapbox/mapbox-gl-native/pull/3003))
- The style URL can be set to a local resource: `asset://local-color.json` and `local-color.json` both resolve to a file named `local-color.json` in the application???s root folder. ([#3087](https://github.com/mapbox/mapbox-gl-native/pull/3087))
- The double-tap-drag gesture for zooming in and out is now consistent with the Google Maps SDK. ([#2153](https://github.com/mapbox/mapbox-gl-native/pull/2153))
- A new `MGLAnnotationImage.enabled` property allows you to disable touch events on individual annotations. ([#2501](https://github.com/mapbox/mapbox-gl-native/pull/2501))
- Fixed a rendering issue that caused one-way arrows along tile boundaries to point due east instead of in the direction of travel. ([#2530](https://github.com/mapbox/mapbox-gl-native/pull/2530))
- Fixed an issue that prevented zoom level???dependent style properties from updating after zooming programmatically with animation. ([#2951](https://github.com/mapbox/mapbox-gl-native/pull/2951))
- Performance and appearance improvements during annotation adds & removes. ([#1688](https://github.com/mapbox/mapbox-gl-native/issues/1688))
- Overall improved performance during renders by not rendering faster than necessary. ([#1975](https://github.com/mapbox/mapbox-gl-native/issues/1975))
- Fixed a rendering issue with styles that use the `background-pattern` property. ([#2531](https://github.com/mapbox/mapbox-gl-native/pull/2531))
- Fixed a crash when reusing a single `MGLMapView` across multiple `UIViewController`s. ([#2969](https://github.com/mapbox/mapbox-gl-native/pull/2969))
- Fixed a crash on iPod touch and other devices or simulators without a cell carrier. ([#2687](https://github.com/mapbox/mapbox-gl-native/issues/2687))
- Eliminated flickering when opening and closing an overlay, such as an alert or action sheet. ([#2309](https://github.com/mapbox/mapbox-gl-native/pull/2309))
- Labels can now line wrap on hyphens and other punctuation. ([#2598](https://github.com/mapbox/mapbox-gl-native/pull/2598))
- A new delegate callback was added for observing taps to annotation callout views. ([#2596](https://github.com/mapbox/mapbox-gl-native/pull/2596))
- `-mapViewRegionIsChanging:` is now sent to the map view???s delegate during gestures. ([#2700](https://github.com/mapbox/mapbox-gl-native/pull/2700))
- Improved gesture recognition while the map is tilted. ([#2770](https://github.com/mapbox/mapbox-gl-native/pull/2770))
- `-mapViewWillStartLoadingMap:` and `-mapViewDidFinishLoadingMap:` delegate methods now work. ([#2706](https://github.com/mapbox/mapbox-gl-native/pull/2706))
- Removed CoreTelephony.framework dependency. ([#2581](https://github.com/mapbox/mapbox-gl-native/pull/2581))
- Improved user location annotation responsiveness. ([#2643](https://github.com/mapbox/mapbox-gl-native/pull/2643))

## 2.1.2 - September 15, 2015

- Built with Xcode 6.4 to not yet trigger Bitcode compatibility until Xcode 7 stabilizes. ([#2332](https://github.com/mapbox/mapbox-gl-native/issues/2332))

## 2.1.1 - September 15, 2015

- Fixes for Xcode 7 and Bitcode. ([#2238](https://github.com/mapbox/mapbox-gl-native/pull/2238))

## 2.1.0 - September 14, 2015

- A two-finger vertical swipe now tilts the map into perspective mode. ([#2116](https://github.com/mapbox/mapbox-gl-native/pull/2116))
- A new `MGLMapCamera` API allows you to transition multiple viewpoint properties, including rotation and pitch, simultaneously with an optional custom duration and timing function. ([#2193](https://github.com/mapbox/mapbox-gl-native/pull/2193))
- A new user tracking mode, `MGLUserTrackingModeFollowWithCourse`, has been added for indicating the current direction of travel. ([#2068](https://github.com/mapbox/mapbox-gl-native/pull/2068))
- Version 8 (`v8`) of the [Mapbox GL style spec](https://www.mapbox.com/mapbox-gl-style-spec/) is now required. If you are using a custom `v7` style, it needs to be upgraded using [this migrator script](https://github.com/mapbox/mapbox-gl-style-spec/blob/mb-pages/migrations/v7.js). ([#2052](https://github.com/mapbox/mapbox-gl-native/pull/2052))
- Applications built with Mapbox GL no longer crash when Location Services launches them in background mode. ([#1821](https://github.com/mapbox/mapbox-gl-native/pull/1821), [#1869](https://github.com/mapbox/mapbox-gl-native/pull/1869))
- Fixed a crash when adding annotations to an `MGLMapView` inside `-viewDidLoad`. ([#1874](https://github.com/mapbox/mapbox-gl-native/pull/1874))
- The user location annotation view now indicates the location reading???s accuracy and the device???s heading. ([#2010](https://github.com/mapbox/mapbox-gl-native/pull/2010))
- Eliminated linker warnings and errors when building against the iOS 9.0 SDK in Xcode 7. ([#1962](https://github.com/mapbox/mapbox-gl-native/pull/1962))
- Worked around a bug in the iOS 9.0 SDK that caused a crash on launch. ([#1958](https://github.com/mapbox/mapbox-gl-native/pull/1958))
- User location tracking no longer sends `MGLMapView` into an invalid region on iOS 9. ([#1925](https://github.com/mapbox/mapbox-gl-native/pull/1925))
- Eliminated console spew in the iOS demo application that was related to Mapbox Metrics HTTP requests. ([#1937](https://github.com/mapbox/mapbox-gl-native/issues/1937))
- Implemented `-[MGLMapView showAnnotations:animated:]`. ([#2050](https://github.com/mapbox/mapbox-gl-native/pull/2050))
- Fixed a crash adding a shape annotation with zero points. ([#2098](https://github.com/mapbox/mapbox-gl-native/pull/2098))
- Debug mode now displays information useful for debugging the label collision algorithm. ([#1808](https://github.com/mapbox/mapbox-gl-native/pull/1808))
- Minor style updates. ([#1910](https://github.com/mapbox/mapbox-gl-native/pull/1910))
- The CocoaPods pod now contains a `README.md` file. ([#1886](https://github.com/mapbox/mapbox-gl-native/pull/1886))

## 2.0.0 - August 21, 2015

Repackaging 2.0.0-pre.1 as it contained no issues.

## 2.0.0-pre.1 - August 21, 2015

Repackaging 0.5.1 as the Mapbox iOS SDK 2.0.0 series.

## 0.5.1 - July 13, 2015

### iOS

- Added support for CocoaPods 0.38.0. ([#1876](https://github.com/mapbox/mapbox-gl-native/pull/1876))

## 0.5.0 - July 9, 2015

### Core

- Support for runtime marker imagery. ([#941](https://github.com/mapbox/mapbox-gl-native/pull/941))
- Added `Map::fitBounds()` for region-based viewport setting. ([#1092](https://github.com/mapbox/mapbox-gl-native/issues/1092))
- Added a raster satellite bundled style and improved raster rendering. ([#963](https://github.com/mapbox/mapbox-gl-native/issues/963))
- Improved round line joins for semi-transparent lines. ([#1839](https://github.com/mapbox/mapbox-gl-native/pull/1839))
- Improved map render lifecycle notifications. ([#1026](https://github.com/mapbox/mapbox-gl-native/issues/1026))
- Fixed a bug that caused annotations not to show at zoom level zero. ([#1279](https://github.com/mapbox/mapbox-gl-native/issues/1279))
- Fixed a bug with the ordering of shape layers. ([#1866](https://github.com/mapbox/mapbox-gl-native/pull/1866))
- Other bug fixes and performance improvements.

### iOS

- **Breaking:** Headers now make use of lightweight generics, eliminating many unnecessary casts when working with annotations in Swift 2.0 in Xcode 7. ([#1711](https://github.com/mapbox/mapbox-gl-native/pull/1711))
- **Breaking:** `-mapView:symbolNameForAnnotation:` has been removed from the `MGLMapViewDelegate` protocol. Implement `-mapView:imageForAnnotation:` instead, which accepts images at runtime. ([#941](https://github.com/mapbox/mapbox-gl-native/pull/941))
- **Breaking:** `MGLMapView.direction` is now expressed in terms of degrees clockwise from true north, as indicated in the documentation, rather than counterclockwise. ([#1789](https://github.com/mapbox/mapbox-gl-native/pull/1789))
- A Satellite style showing Mapbox Satellite imagery is now bundled with Mapbox GL. ([#1845](https://github.com/mapbox/mapbox-gl-native/pull/1845))
- Improved `UIView` tracking to the map. ([#1813](https://github.com/mapbox/mapbox-gl-native/pull/1813))
- Delegate method `-[MGLMapViewDelegate mapView:didFailToLocateUserWithError:]` now works. ([#1608](https://github.com/mapbox/mapbox-gl-native/pull/1608))
- It is now possible to fit the map???s viewport to a coordinate bounding box via `-[MGLMapView setVisibleCoordinateBounds:animated:]` or to a specific set of coordinates via `-[MGLMapView setVisibleCoordinates:count:edgePadding:animated:]`. ([#1783](https://github.com/mapbox/mapbox-gl-native/pull/1783), [#1795](https://github.com/mapbox/mapbox-gl-native/pull/1795))
- The logo and ?????? no longer disappear or get distorted after embedding MGLMapView in a different view, and you can now access these subviews directly via properties on MGLMapView. ([#1779](https://github.com/mapbox/mapbox-gl-native/pull/1779), [#1815](https://github.com/mapbox/mapbox-gl-native/pull/1815))
- Raster tiles now look sharper midway between two zoom levels. ([#1843](https://github.com/mapbox/mapbox-gl-native/pull/1843))
- Resetting the map rotation to north no longer also resets the user location tracking mode. ([#1809](https://github.com/mapbox/mapbox-gl-native/pull/1809))
- `-[MGLMapView convertPoint:toCoordinateFromView:]` now returns accurate coordinates on iPhone 6. ([#1827](https://github.com/mapbox/mapbox-gl-native/pull/1827))
- Fixed an issue in which `-[MGLMapView direction]` would sometimes return 360 instead of 0. ([#1829](https://github.com/mapbox/mapbox-gl-native/pull/1829))
- Build against iOS 8.4. ([#1868](https://github.com/mapbox/mapbox-gl-native/pull/1868))

## 0.4.0 - June 19, 2015

### Core

- Support for polyline and polygon shape annotations. ([#1655](https://github.com/mapbox/mapbox-gl-native/issues/1655))
- Improved placement and density of labels. ([#1666](https://github.com/mapbox/mapbox-gl-native/issues/1666), [blog](https://www.mapbox.com/blog/better-label-placement-mapbox-mobile/))
- Improved z-ordering appearance of point markers. ([#988](https://github.com/mapbox/mapbox-gl-native/issues/988))
- Fixed an issue in which certain features, such as roundabouts, were not rendered completely. ([#1725](https://github.com/mapbox/mapbox-gl-native/issues/1725))
- Many bug fixes and performance and stability improvements.
- Improved tests.

### iOS

- **Breaking:** `MGLMapView` no longer manages Mapbox access tokens directly; an access token cannot be passed in when initializing the map view. Instead, set `MGLMapboxAccessToken` to your access token in your app???s `Info.plist` file, or call `+[MGLAccountManager setAccessToken:]` before initializing the map view. If you were setting the access token inside an Interface Builder inspectable, also remove it from the User Defined Runtime Attributes section of the Identity inspector. ([#1553](https://github.com/mapbox/mapbox-gl-native/issues/1553))
- **Breaking:** `MGLAccountManager`'s `-setMapboxMetricsEnabledSettingShownInApp:` has been removed. If you implement a Mapbox Metrics switch inside your app, instead of inside a Settings bundle, set `MGLMapboxMetricsEnabledSettingShownInApp` to `YES` in the `Info.plist` file. ([#1553](https://github.com/mapbox/mapbox-gl-native/issues/1553))
- **Breaking:** `MGLMapView`'s `-mapID` has been renamed to `-styleID`. ([#1561](https://github.com/mapbox/mapbox-gl-native/issues/1561))
- Headers have been audited for nullability, improving type safety in both Objective-C and Swift 1.2 when compiling with Xcode 6.3 or above. ([#1578](https://github.com/mapbox/mapbox-gl-native/issues/1578))
- Fixed an issue in which the map would sometimes spin 180?? while rotating the map with two fingers. ([#1453](https://github.com/mapbox/mapbox-gl-native/issues/1453))
- Added a shortcut to the Mapbox Metrics switch in `MGLMapView`'s action sheet that is attached to the ?????? button. ([#1611](https://github.com/mapbox/mapbox-gl-native/issues/1611))
- `MGLMapView` now supports Interface Builder designables. When you add an `MGLMapView` to a storyboard, it displays instructions for getting set up directly on the storyboard canvas. ([#1573](https://github.com/mapbox/mapbox-gl-native/issues/1573))
- The default title for the user location annotation is now ???You Are Here???. You can customize the title by setting `mapView.userAnnotation.title`. ([#1559](https://github.com/mapbox/mapbox-gl-native/issues/1559))
- Internal use of the Reachability library has been cleaned up so that your app can include its own copy of Reachability. ([#1718](https://github.com/mapbox/mapbox-gl-native/issues/1718))
- Now distribute a binary stripped of debugging symbols by default with an optional, secondary symbols build. ([#1650](https://github.com/mapbox/mapbox-gl-native/issues/1650))

## 0.3.1 - May 15, 2015

- Temporarily removed `IBDesignable` support on iOS.

## 0.3.0 - May 14, 2015

- Initial iOS beta release.

Known issues:

- None.
