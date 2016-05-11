$(window).load(function () {

    "use strict";

    /* *****************************************************************
     * ENABLE SMOOTH SCROLL
     * ************************************************************** */

    $('.btn-link,.nav-wrapper .main-nav li a,.nav-wrapper .side-nav li a').smoothScroll({offset: -50, speed: 1200});


    /* *****************************************************************
     * SCROLL TOP
     * ************************************************************** */

    $(window).scroll(function () {
        if ($(window).scrollTop() > ($('#home').height()) + 50) {
            $('.scroll-to-top').fadeIn(200);
        } else {
            $('.scroll-to-top').fadeOut(200);
        }
    });

    $('.scroll-to-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });


    /* *****************************************************************
     * INTRO SLIDER
     * ************************************************************** */

    $(".hero-slider").flexslider({
        directionNav: true,
        controlNav: false,
        prevText: "<i class='ion-ios-arrow-left'></i>",
        nextText: "<i class='ion-ios-arrow-right'></i>"
    });


    /* *****************************************************************
     * TESTIMONIAL SLIDER INIT
     * ************************************************************** */

    $("#testimonial-slider").owlCarousel({
        navigation: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });


    /* *****************************************************************
     * SCREEN SLIDER
     * ************************************************************** */

    $("#screen-slider").owlCarousel({
        item: 4,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsMobile: [767, 1]
    });


    /* *****************************************************************
     * NAVBAR INIT
     * ************************************************************** */

    $(".button-collapse").sideNav();


    /* *****************************************************************
     * TYPED INIT
     * ************************************************************** */

    $(".type").typed({
        strings: ["Learn", "Improve", "Explore", "Excel"],
        typeSpeed: 20,
        backDelay: 2000,
        loop: true,
        loopCount: false
    });


    /* *****************************************************************
     * GOOGLE MAP INIT
     * ************************************************************** */

    initMap();

    function initMap() {
        var mapOptions = {
            zoom: 15,
            scrollwheel: false,
            // Add your location here.
            center: new google.maps.LatLng(33.500648, -86.808504),
            styles: [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": 0}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#00aeff"}, {"lightness": 25}]}]};

        // Add your address here.
        var contentString = "<div id='map-content'>"
                + "<div class='address'>"
                + "<p>115A Campbell Hall</p>"
                + "<p>1300 University Boulevard</p>"
                + "<p>Birmingham, Alabama 35294</p>"
                + "</div>"
                + "</div>";
        var infowindow = new google.maps.InfoWindow({content: contentString});
        var mapElement = document.getElementById('map');
        var map = new google.maps.Map(mapElement, mapOptions);
        var icon = {
            url: "img/marker.png",
            scaledSize: new google.maps.Size(80, 80)
        };
        var marker = new google.maps.Marker({
            // Add your location here.
            position: new google.maps.LatLng(33.500648, -86.808504),
            map: map,
            icon: icon,
            title: 'Location',
            animation: google.maps.Animation.BOUNCE
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
        google.maps.event.addListener(marker, 'click', toggleAnimation);
        function toggleAnimation() {
            if (marker.getAnimation() != null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
    }


    /* *****************************************************************
     * GOOGLE MAP SIZE FIX
     * ************************************************************** */

    if ($(window).width() > 767) {
        var height = $('.address-block').outerHeight();
        $('.map-block').outerHeight(height);
    }


    /* *****************************************************************
     * WOW PLUGIN INIT
     * ************************************************************** */

    var wow = new WOW(
            {
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 100,
                mobile: false
            }
    );
    wow.init();


    /* *****************************************************************
     * COUNTER INIT
     * ************************************************************** */

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });


    /* *****************************************************************
     * APP SHOWCASE GALLERY INIT
     * ************************************************************** */

    var showcase = (function () {

        var $el = $('#img-wrapper'),
                $device = $el.find('.feature-device'),
                $trigger = $device.children('a:first'),
                $screens = $el.find('.feature-grid > a'),
                $screenImg = $device.find('.screen'),
                $screenTitle = $device.find('.ac-title'),
                $body = $('body');

        function init() {
            $trigger.on('click', showGrid);
            $screens.on('click', function () {
                showScreen($(this));
                return false;
            });
        }

        function showGrid() {
            $el.addClass('feature-gridview');
            $body.off('click').on('click', function () {
                showScreen();
            });
            return false;
        }

        function showScreen($screen) {
            $el.removeClass('feature-gridview');
            if ($screen) {
                $screenImg.attr('src', $screen.find('img').attr('src'));
                $('.features-section-box i').removeClass('red-text');
                var box_num = $screen.find('img').attr('data-num');
                $('.features-section-box.' + box_num + ' i').addClass('red-text');
                $screenTitle.text($screen.find('span').text());
            }
        }

        return {init: init};

    })();

    $(function () {
        showcase.init();
    });


    /* *****************************************************************
     * MODAL INIT
     * ************************************************************** */

    var ModalEffects = (function () {

        function init() {

            [].slice.call(document.querySelectorAll('.md-trigger')).forEach(function (el, i) {
                var modal = document.querySelector('#' + el.getAttribute('data-modal')),
                        close = modal.querySelector('.md-close');

                function removeModal(hasPerspective) {
                    classie.remove(modal, 'md-show');
                    if (hasPerspective) {
                        classie.remove(document.documentElement, 'md-perspective');
                    }
                }

                function removeModalHandler() {
                    removeModal(classie.has(el, 'md-setperspective'));
                }

                $(el).on('click', function () {
                    classie.add(modal, 'md-show');
                    if (classie.has(el, 'md-setperspective')) {
                        setTimeout(function () {
                            classie.add(document.documentElement, 'md-perspective');
                        }, 25);
                    }
                });

                $(close).on('click', function (ev) {
                    ev.stopPropagation();
                    removeModalHandler();
                });

            });
        }

        return {init: init};

    })();

    $(function () {
        ModalEffects.init();
    });

    /* *****************************************************************
     * FORM VALIDATION
     * ************************************************************** */

    $("#contactForm").validate({
        rules: {
            fullname: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            fullname: {
                required: "Please enter your name"
            },
            email: "Please enter a valid email address",
            message: "Please enter your message"
        },
        submitHandler: function () {
            // Add your ajax form processing here.
        }
    });

    $("#subscribeForm").validate({
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            email: "Please enter a valid email address"
        },
        submitHandler: function () {
            // Add your ajax form processing here.
        }
    });


    /* *****************************************************************
     * PRELOADER
     * ************************************************************** */

    $('.preloader').fadeOut('slow');


});
