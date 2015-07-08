/*
 * eZmodal
 * doc: http://markusslima.github.io/ezmodal/
 * github: https://github.com/markusslima/ezmodal
 *
 * Copyright (c) 2015 Markus Vinicius da Silva Lima
 * Version 0.1.0
 * Licensed under the MIT license.
 */
(function ($) {
    "use strict";
    
    var EZmodal = function (element, options) {
        this.options = options;
        this.$element = $(element);
        this.$elementEZmodal = [];
    };

    EZmodal.prototype = {
        show: function () {
            this.$element.show();
        },
        
        hide: function () {
            this.$element.show();
        },
        
        html: function () {
            
        },
        
        constructor: function () {
            var $html = $('<div class="ezmodal-container"></div>');
            
            $html.html(this.$element);
            
            $('body').append($html);
            
            /*if (!this.options.autoOpen) {
                this.$element.hide();
            }*/
        }
    };

    var old = $.fn.ezmodal;

    $.fn.ezmodal = function (option, value) {
        var get = '',
            element = this.each(function () {
                var $this = $(this),
                    data = $this.data('ezmodal'),
                    options = $.extend({}, $.fn.ezmodal.defaults, option, typeof option === 'object' && option);

                if (!data) {
                    $this.data('ezmodal', (data = new EZmodal(this, options)));
                    data.constructor();
                }

                if (typeof option === 'string') {
                    get = data[option](value);
                }
            });

        if (typeof get !== undefined) {
            return get;
        } else {
            return element;
        }
    };

    $.fn.ezmodal.defaults = {
        'size': 'small',
        'modal': true,
        'preserve': false,
        'autoOpen': false
    };

    $.fn.ezmodal.noConflict = function () {
        $.fn.ezmodal = old;
        return this;
    };

    // Data attributes register
    $('.ezmodal').each(function () {
        var $this = $(this),
            options = {
                'size': $this.attr('data-ezmodal-size')
            };

        $this.ezmodal(options);
    });

})(window.jQuery);