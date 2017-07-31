jQuery(document).ready(function($){
    var _windowWidth = window.innerWidth;

    // headroom.js
    // handle .headerbar show/hide animation
    $("header").headroom({
        "offset": 205,
        "tolerance": 5,
        "classes": {
            initial:    'headerbar',              // when element is initialised
            pinned:     'headerbar-pinned',       // when scrolling up
            unpinned:   'headerbar-unpinned',   // when scrolling down
            top:        'headerbar-top',              // when above offset
            notTop:     'headerbar-not-top',       // when below offset
            bottom:     'headerbar-bottom',        // when at bottom of scoll area
            notBottom:  'headerbar-not-bottom'  // when not at bottom of scroll area
        }
    });

    // home page
    // animate screen text and image on scroll
    if(_windowWidth > 416) {
        var $screenBlocks = $('.screen'),
            offset = .5;

        //hide screen blocks which are outside the viewport
        hideBlocks($screenBlocks, offset);

        //on scrolling, show/animate blocks when they enter the viewport
        $(window).on('scroll', function(){
            (!window.requestAnimationFrame)
                ? setTimeout(function(){ showBlocks($screenBlocks, offset); }, 100)
                : window.requestAnimationFrame(function(){ showBlocks($screenBlocks, offset); });
        });

        function hideBlocks(blocks, offset) {
            blocks.each(function(){
                var $this = $(this);
                if ($this.offset().top > $(window).scrollTop() + $(window).height() * offset) {
                    $this.find('.screen--about, .screen--illustration, .lt-contact--fieldset, .lt-contact--illustration').addClass('bounce-hidden');
                }
            });
        }

        function showBlocks(blocks, offset) {
            blocks.each(function(){
                var $this = $(this);
                if ($this.offset().top <= $(window).scrollTop() + $(window).height() * offset) {
                    if ($this.find('.screen--about, .screen--illustration').hasClass('bounce-hidden')) {
                        $this.find('.screen--about, .screen--illustration').removeClass('bounce-hidden').addClass('bounce-in');
                    }
                    else if ($this.find('.lt-contact--fieldset, .lt-contact--illustration').hasClass('bounce-hidden')) {
                        $this.find('.lt-contact--fieldset, .lt-contact--illustration').removeClass('bounce-hidden').addClass('bounce-up');
                    }
                }
            });
        }
    }
});
