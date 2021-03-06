$(function() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
        windowWidth = window.innerWidth,
        $body = $('body'),
        $modalvideo = $('#modalvideo'),
        $videoplayer = $('#videoplayer'),
        $scrolldown = $('#scrolldown'),
        $video1 = null,
        $video2 = null;

    // headroom.js
    // handle .headerbar show/hide animation
    $("header").headroom({
        "offset": 205,
        "tolerance": 5,
        "classes": {
            initial:    'headerbar',              // when element is initialised
            pinned:     'headerbar-pinned',       // when scrolling up
            unpinned:   'headerbar-unpinned',     // when scrolling down
            top:        'headerbar-top',          // when above offset
            notTop:     'headerbar-not-top',      // when below offset
            bottom:     'headerbar-bottom',       // when at bottom of scoll area
            notBottom:  'headerbar-not-bottom'    // when not at bottom of scroll area
        }
    });

    // handle .balloon fixed positioning on scroll
    if (0 < $(".balloon").length) {
        var balloonOffsetTop = $(".balloon").offset().top - 100;
        $(".balloon").headroom({
            "offset": balloonOffsetTop,
            "tolerance": 5,
            "classes": {
                initial:    'balloon',              // when element is initialised
                pinned:     'balloon-pinned',       // when scrolling up
                unpinned:   'balloon-unpinned',     // when scrolling down
                top:        'balloon-top',          // when above offset
                notTop:     'balloon-not-top',      // when below offset
                bottom:     'balloon-bottom',       // when at bottom of scoll area
                notBottom:  'balloon-not-bottom'    // when not at bottom of scroll area
            }
        });
    }

    // home page
    // animate teaser text and image on scroll
    if(windowWidth > 416) {
        var $teaserBlocks = $('.l-teaser, .l-contact'),
            offset = .5;
        //hide teaser blocks which are outside the viewport
        hideBlocks($teaserBlocks, offset);

        //on scrolling, show/animate blocks when they enter the viewport
        $(window).on('scroll', function(){
            (!window.requestAnimationFrame)
                ? setTimeout(function(){ showBlocks($teaserBlocks, offset); }, 100)
                : window.requestAnimationFrame(function(){ showBlocks($teaserBlocks, offset); });
        });

        function hideBlocks(blocks, offset) {
            blocks.each(function(){
                var $this = $(this);
                if ($this.offset().top > $(window).scrollTop() + $(window).height() * offset) {
                    $this.find('.l-teaser-aside, .l-teaser-body, .l-contact-fieldset, .l-contact-aside').addClass('bounce-hidden');
                }
            });
        }

        function showBlocks(blocks, offset) {
            blocks.each(function(){
                var $this = $(this);
                if ($this.offset().top <= $(window).scrollTop() + $(window).height() * offset) {
                    if ($this.find('.l-teaser-aside, .l-teaser-body').hasClass('bounce-hidden')) {
                        $this.find('.l-teaser-aside, .l-teaser-body').removeClass('bounce-hidden').addClass('bounce-in');
                    }
                    else if ($this.find('.l-contact-fieldset, .l-contact-aside').hasClass('bounce-hidden')) {
                        $this.find('.l-contact-fieldset, .l-contact-aside').removeClass('bounce-hidden').addClass('bounce-up');
                    }
                }
            });
        }
    }

    function toggleModal($modal) {
        // open/close modal
        // + allow/disallow body scroll
        if ($modal.is('[aria-hidden]')) {
            $body.css('overflow', 'hidden');
            $modal.removeAttr('aria-hidden');
        } else {
            $modal.attr('aria-hidden', true);
            $body.removeAttr('style');
        }
    }

    // modal toggle button
    $body.on('click', '[data-modal]', function(e) {
        e.preventDefault();

        var target = $(this).attr('data-modal'),
            $target = $(target);
        toggleModal($target);
    });

    // load showreel video
    if(false === isMobile) {
        $('#videocover').html('<video id="video1" class="l-videowrap-cover" width="100%" height="100%" autoplay muted loop preload="metadata"><source src="web/video/showreel.mp4"></video>');
        $video1 = $('#video1');
    }

    // trigger modal video
    $('#videoplay').on('click', function(e) {
        e.preventDefault();

        if(0 === $('#video2').length) {
            $('#videoplayer').html('<video id="video2" width="100%" height="100%" controls preload="metadata"><source src="web/video/showreel2.mp4"></video>');
            $video2 = $('#video2');
        }

        if(null !== $video1) {
            $video1[0].pause();
        }

        toggleModal($modalvideo);
        $video2[0].play();
    });

    // close modal video
    $modalvideo.on('click', '.modal-close', function() {
        if(null !== $video1) {
            $video1[0].play();
        }

        toggleModal($modalvideo);
        $video2[0].pause();
        $video2[0].currentTime = 0;
    });

    // start teaser scroll down button
    $scrolldown.on('click', function(e) {
        e.preventDefault();

        var target = $(this).attr('href'),
            value = $(target).offset().top;

        $("html, body").stop(true, false).animate({
            scrollTop: value
        }, 1000);
    });
});
