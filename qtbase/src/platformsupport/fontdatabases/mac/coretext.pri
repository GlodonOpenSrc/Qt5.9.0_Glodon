HEADERS += $$PWD/qcoretextfontdatabase_p.h $$PWD/qfontengine_coretext_p.h
OBJECTIVE_SOURCES += $$PWD/qfontengine_coretext.mm $$PWD/qcoretextfontdatabase.mm

qtConfig(freetype) {
    QMAKE_USE_PRIVATE += freetype
    HEADERS += freetype/qfontengine_ft_p.h
    SOURCES += freetype/qfontengine_ft.cpp
}

uikit: \
    # On iOS/tvOS/watchOS CoreText and CoreGraphics are stand-alone frameworks
    LIBS_PRIVATE += -framework CoreText -framework CoreGraphics
else: \
    # On macOS they are re-exported by the AppKit framework
    LIBS_PRIVATE += -framework AppKit

# CoreText is documented to be available on watchOS, but the headers aren't present
# in the watchOS Simulator SDK like they are supposed to be. Work around the problem
# by adding the device SDK's headers to the search path as a fallback.
# rdar://25314492, rdar://27844864
watchos:simulator {
    simulator_system_frameworks = $$xcodeSDKInfo(Path, $${simulator.sdk})/System/Library/Frameworks
    device_system_frameworks = $$xcodeSDKInfo(Path, $${device.sdk})/System/Library/Frameworks
    for (arch, QMAKE_APPLE_SIMULATOR_ARCHS) {
        QMAKE_CXXFLAGS += \
            -Xarch_$${arch} \
            -F$$simulator_system_frameworks \
            -Xarch_$${arch} \
            -F$$device_system_frameworks
    }
}
