(function ($) {
    "use strict";

    setTimeout(function () {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    }, 1);

    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    var isDesktopNav = function () {
        return window.matchMedia('(min-width: 992px)').matches;
    };

    $(window).on('scroll resize', function () {
        if (isDesktopNav()) {
            if ($(this).scrollTop() > 300) {
                $('.sticky-top').addClass('shadow-sm').css('top', '0px');
            } else {
                $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
            }
        } else {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        }

        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    }).trigger('scroll');

    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 800, 'easeInOutExpo');
        return false;
    });

    // Zamknij menu mobilne po kliknięciu w link
    $('#navbarCollapse .nav-link').on('click', function () {
        var $collapse = $('#navbarCollapse');
        if ($collapse.hasClass('show')) {
            var Collapse = bootstrap.Collapse.getInstance($collapse[0]) || new bootstrap.Collapse($collapse[0], {toggle: false});
            Collapse.hide();
        }
    });

    var $sections = $('section[id], #start');
    if ($sections.length) {
        $(window).on('scroll', function () {
            var scrollPos = $(window).scrollTop() + 120;
            $sections.each(function () {
                var top = $(this).offset().top;
                var bottom = top + $(this).outerHeight();
                var id = $(this).attr('id');
                if (scrollPos >= top && scrollPos < bottom) {
                    $('.navbar-nav .nav-link').removeClass('active');
                    $('.navbar-nav .nav-link[href="#' + id + '"], .navbar-nav .nav-link[href$="#' + id + '"]').addClass('active');
                }
            });
        });
    }
})(jQuery);
