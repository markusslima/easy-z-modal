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
    
    $(window).on('keyup', function (event) {
        if (event.keyCode === 27) {
            var data = $('.ezmodal').data('ezmodal');
            if (data.options.closable) {
                $('.ezmodal').ezmodal('hide');
            }
        }
    });

    $(document).on('click', '.ezmodal', function () {
        var data = $(this).data('ezmodal');
        if (data.options.closable) {
            $(this).ezmodal('hide');
        }
    });

    $(document).on('click', '.ezmodal .ezmodal-container', function (event) {
        event.stopPropagation();
    });

    $(document).on('click', '.ezmodal .ezmodal-close', function () {
        $(this).parent().parent().parent().ezmodal('hide');
    });

    $(document).on('click', '[data-dismiss="ezmodal"]', function () {
        $(this).parent().parent().parent().ezmodal('hide');
    });

    var EZmodal = function (element, options) {
        this.options = options;
        this.$element = $(element);
    };

    EZmodal.prototype = {
        show: function () {
            this.$element.show();
            this.options.onShow();
        },
        
        hide: function () {
            this.$element.hide();
            this.options.onClose();
        },

        isVisible: function () {
            return this.$element.css('display') === 'block' ? true : false;
        },
        
        constructor: function () {
            this.$element.find('.ezmodal-container').css({
                'width': this.options.width+'px',
                'margin-left': '-'+(this.options.width/2)+'px'
            });

            if (!this.options.autoOpen) {
                this.hide();
            } else {
                this.show();
            }
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
        'width': 500,
        'closable': true,
        'autoOpen': false,
        'onShow': function () {},
        'onClose': function () {}
    };

    $.fn.ezmodal.noConflict = function () {
        $.fn.ezmodal = old;
        return this;
    };
})(window.jQuery);