$("header").headroom({
    "offset": 205,
    "tolerance": 5,
    "classes": {
        initial : 'headerbar',              // when element is initialised
        pinned: 'headerbar-pinned',       // when scrolling up
        unpinned: 'headerbar-unpinned',   // when scrolling down
        top : 'headerbar-top',              // when above offset
        notTop : 'headerbar-not-top',       // when below offset
        bottom : 'headerbar-bottom',        // when at bottom of scoll area
        notBottom : 'headerbar-not-bottom'  // when not at bottom of scroll area
    }
});

