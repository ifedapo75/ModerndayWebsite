jQuery(document).ready(function() {
    jQuery('.contact-form').each(function() {
        var t = jQuery(this);
        var t_result = jQuery(this).find('.form-send');
        var t_result_init_val = t_result.val();
        var validate_email = function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };
        var t_timeout;
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
                    t_result.val(result);
                });
            clearTimeout(t_timeout);
            t_timeout = setTimeout(function() {
                t_result.val(t_result_init_val);
            }, 3000);
        });

    });
    
});