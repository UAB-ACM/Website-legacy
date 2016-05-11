$(document).ready(function() {
    'use strict';

    $(window).scroll(function() {
        if ($(window).scrollTop() > ($(".sidebar").height())+50) {
            $('.scroll-to-top').fadeIn(200);
        } else {
            $('.scroll-to-top').fadeOut(200);
        }
    });
    
    $('.scroll-to-top a').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });
    
});
