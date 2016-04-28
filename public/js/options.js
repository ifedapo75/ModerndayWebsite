jQuery(document).ready(function() {
    "use strict";
    jQuery('#calendar').datepicker({
        firstDay: 1,
    });


    jQuery(".responsive-menu").on('click',function(e) {
        jQuery(".main-nav>ul").css({
            display: "block"
        });
        e.stopPropagation();
        if (e.preventDefault)
            e.preventDefault();
        return false;
    });
    jQuery("body").on('click',function() {
        jQuery(".main-nav>ul").css({
            display: "none"
        });
    });

    jQuery(".swipebox").swipebox();


    jQuery('.contact-form').each(function() {
        var t = jQuery(this);
        var t_result = jQuery(this).find('.form-send');
        var t_result_init_val = t_result.val();
        var validate_email = function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };
        var t_timeout;
        var json;
        t.submit(function(event) {
            event.preventDefault();
            var t_values = {};
            var t_values_items = t.find('input[name],textarea[name]');
            t_values_items.each(function() {
                t_values[this.name] = jQuery(this).val();
            });
            if (t_values['contact-name'] === '' || t_values['contact-email'] === '' || t_values['contact-message'] === '') {
                t_result.val('Please fill in all the required fields.');
            } else
            if (!validate_email(t_values['contact-email']))
                t_result.val('Please provide a valid e-mail.');
            else
                jQuery.post("php/contacts.php", t.serialize(), function(result) {
                    json = jQuery.parseJSON(result);
                    t_result.val(json.message);
                    
                    if(json.send == true)
                        setTimeout(function(){
                             window.location.href = 'http://www.teslathemes.com';
                        }, 2000);
                });
            clearTimeout(t_timeout);
            t_timeout = setTimeout(function() {
                t_result.val(t_result_init_val);
            }, 3000);
        });

    });
    
    function initialize() {

        var styleArray = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];

        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: new google.maps.LatLng(44.5403, -78.5463),
            zoom: 12,
            styles: styleArray,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);
    }
    if (jQuery('#map').length) {
        google.maps.event.addDomListener(window, 'load', initialize);
    }

    var priceSlider = $('.main-sidebar .widget-price-filter .price-slider .slider')[0],
        step = $(priceSlider).data('step'),
        start = $(priceSlider).data('start'),
        stop = $(priceSlider).data('stop'),
        min = $(priceSlider).data('min'),
        max = $(priceSlider).data('max');

    // Set Values Container Position
    function setPosition () {
        var valuesContainer = $('.price-slider .values-wrapper'),
            containerOffset = $('.price-slider').offset().left,
            lowerOffset = $('.noUi-handle-lower').offset().left - containerOffset,
            upperOffset = $('.noUi-handle-upper').offset().left - containerOffset,
            bestPosition = (upperOffset + lowerOffset) / 2;

        valuesContainer.css({
            'left': bestPosition + 'px'
        });
    }

    if ($('.main-sidebar .widget-price-filter .price-slider').length) {
        noUiSlider.create(priceSlider, {
            start: [start, stop],
            connect: true,
            step: step,
            range: {
                'min': min,
                'max': max
            }
        });

        // Set Values Container Position for the First Time
        setTimeout(function () {
            setPosition();
        }, 100);

        // Display Slider Values
        var snapValues = [
            document.getElementsByClassName('slider-snap-value-lower')[0],
            document.getElementsByClassName('slider-snap-value-upper')[0]
        ];

        priceSlider.noUiSlider.on('update', function( values, handle ) {
            snapValues[handle].innerHTML = parseFloat(values[handle]);

            // Set Values Container Position on Change
            setPosition();
        });
    }
});

jQuery(document).ready(function(){
    // This button will increment the value
    $('.qtyplus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });
    // This button will decrement the value till 0
    $(".qtyminus").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });

});

