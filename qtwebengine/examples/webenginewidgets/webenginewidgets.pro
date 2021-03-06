TEMPLATE=subdirs

SUBDIRS += \
    minimal \
    contentmanipulation \
    cookiebrowser \
    demobrowser \
    markdowneditor \
    simplebrowser \
    videoplayer

contains(WEBENGINE_CONFIG, use_spellchecker):!cross_compile {
    !contains(WEBENGINE_CONFIG, use_native_spellchecker) {
        SUBDIRS += spellchecker
    } else {
        message("Spellcheck example will not be built because it depends on usage of Hunspell dictionaries.")
    }
}
