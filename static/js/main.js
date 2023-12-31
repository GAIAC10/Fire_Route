(function(a) {
    window.onerror = function() {
        return true
    };
    a(window).on("load", function() {
        a("#preloader-active").delay(450).fadeOut("slow");
        a("body").delay(450).css({
            overflow: "visible"
        })
    });
    var l = function() {
        var p = a(document).height(),
            r = a(window).height(),
            q;
        a(window).on("scroll", function() {
            q = a(window).scrollTop() / (p - r) * 100;
            a(".scroll-progress").width(q + "%")
        })
    };
    var j = function() {
        a("#off-canvas-toggle").on("click", function() {
            a("body").toggleClass("canvas-opened")
        });
        a(".dark-mark").on("click", function() {
            a("body").removeClass("canvas-opened")
        });
        a(".off-canvas-close").on("click", function() {
            a("body").removeClass("canvas-opened")
        })
    };
    var k = function() {
        a(".search-close").hide();
        a("button.search-icon").on("click", function() {
            a(this).hide();
            a("body").toggleClass("open-search-form");
            a(".search-close").show();
            a("html, body").animate({
                scrollTop: 0
            }, "slow")
        });
        a(".search-close").on("click", function() {
            a(this).hide();
            a("body").removeClass("open-search-form");
            a("button.search-icon").show()
        })
    };
    var g = function() {
        var p = a("ul#navigation");
        if (p.length) {
            p.slicknav({
                prependTo: ".mobile_menu",
                closedSymbol: "+",
                openedSymbol: "-"
            })
        }
    };
    var c = function() {
        a(".featured-slider-1-items").slick({
            dots: false,
            infinite: true,
            speed: 500,
            arrows: true,
            slidesToShow: 1,
            autoplay: false,
            loop: true,
            adaptiveHeight: true,
            fade: true,
            cssEase: "linear",
            prevArrow: '<button type="button" class="slick-prev"><i class="flaticon-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="flaticon-right"></i></button>',
            appendArrows: ".arrow-cover",
        });
        a(".post-carausel-1-items").slick({
            dots: false,
            infinite: true,
            speed: 1000,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            loop: true,
            adaptiveHeight: true,
            cssEase: "linear",
            prevArrow: '<button type="button" class="slick-prev"><i class="flaticon-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="flaticon-right"></i></button>',
            appendArrows: ".post-carausel-1-arrow",
            centerPadding: 50,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false,
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }]
        });
        a(".post-carausel-2").slick({
            dots: true,
            infinite: true,
            speed: 1000,
            arrows: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            loop: true,
            adaptiveHeight: true,
            cssEase: "linear",
            centerPadding: 50,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false,
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        a(".post-carausel-3").slick({
            dots: true,
            infinite: true,
            speed: 1000,
            arrows: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            loop: true,
            adaptiveHeight: true,
            cssEase: "linear",
            centerPadding: 50,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false,
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        a(".featured-slider-2-items").slick({
            fade: true,
            asNavFor: ".featured-slider-2-nav",
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="flaticon-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="flaticon-right"></i></button>',
            appendArrows: ".arrow-cover",
        });
        a(".featured-slider-2-nav").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: ".featured-slider-2-items",
            dots: false,
            arrows: false,
            centerMode: true,
            focusOnSelect: true,
            centerPadding: 0,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }]
        })
    };
    var h = function() {
        var p = a("select");
        if (p.length) {
            p.niceSelect()
        }
    };
    var d = function() {
        a(window).on("scroll", function() {
            var p = a(window).scrollTop();
            if (p < 245) {
                a(".header-sticky ").removeClass("sticky-bar")
            } else {
                a(".header-sticky").addClass("sticky-bar")
            }
        })
    };
    var m = function() {
        a.scrollUp({
            scrollName: "scrollUp",
            topDistance: "300",
            topSpeed: 300,
            animation: "fade",
            animationInSpeed: 200,
            animationOutSpeed: 200,
            scrollText: '<i class="ti-arrow-up"></i>',
            activeOverlay: false,
        })
    };
    var o = function() {
        a("#datetime").vTicker({
            speed: 500,
            pause: 2000,
            animation: "fade",
            mousePause: false,
            showItems: 1
        });
        a("#news-flash").vTicker({
            speed: 500,
            pause: 2000,
            animation: "fade",
            mousePause: false,
            showItems: 1
        })
    };
    var n = function() {
        a(".sticky-sidebar").theiaStickySidebar()
    };
    var b = function() {
        var p = document.querySelector.bind(document);
        var q = new PerfectScrollbar(".custom-scrollbar")
    };
    var f = function() {
        a(".sub-mega-menu .nav-pills > a").on("mouseover", function(p) {
            a(this).tab("show")
        })
    };
    var i = function() {
        a(".counter-number").counterUp({
            delay: 10,
            time: 2000
        })
    };
    var e = function() {
        a(".play-video").magnificPopup({
            disableOn: 700,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        })
    };
    new WOW().init();
    a(document).ready(function() {
        j();
        b();
        i();
        f();
        e();
        m();
        d();
        n();
        c();
        g();
        l();
        h();
        k();
        o()
    })
})(jQuery);