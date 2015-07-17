/*
 * eZmodal
 * doc: http://markusslima.github.io/ezmodal/
 * github: https://github.com/markusslima/ezmodal
 *
 * Copyright (c) 2015 Markus Vinicius da Silva Lima
 * Version 0.1.1
 * Licensed under the MIT license.
 */
(function ($) {
    "use strict";

    $(window).on('keyup', function (event) {
        if (event.keyCode === 27) {
            $('.ezmodal').each(function () {
                if ($(this).ezmodal('isVisible')) {
                    if ($(this).data('ezmodal').options.closable) {
                        $(this).ezmodal('hide');
                    }
                }
            });
        }
    });

    $(document).on('click', '.ezmodal', function () {
        if ($(this).data('ezmodal').options.closable) {
            $(this).ezmodal('hide');
        }
    });

    $(document).on('click', '.ezmodal .ezmodal-container', function (event) {
        event.stopPropagation();
    });

    $(document).on('click', '[data-dismiss="ezmodal"]', function () {
        $(this).parent().parent().parent().ezmodal('hide');
    });

    $(document).on('click', '[ezmodal-target]', function () {
        $($(this).attr('ezmodal-target')).ezmodal('show');
    });

    var EZmodal = function (element, options) {
			this.options = options;
			this.$element = $(element);
		},
		old;

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
            var width = this.options.width,
                container = this.$element.find('.ezmodal-container');
                
            if (this.options.autoOpen) {
                this.show();
            }
            
            if (Number(this.options.width)) {
                container.css({
                    'width': width + 'px'
                });
            } else {
                switch (width) {
                case 'small':
					container.css({'width': '40%'});
					break;
				case 'medium':
					container.css({'width': '75%'});
					break;
				case 'full':
					container.css({'width': '95%'});
					break;
                }
            }
        }
    };

    old = $.fn.ezmodal;

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

        if (typeof get !== 'undefined') {
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
    
    $(function () {
		$('.ezmodal').each(function () {
			var $this = $(this),
                options = {
					'width' : $this.attr('ezmodal-width'),
					'closable' : $this.attr('ezmodal-closable') === 'false' ? false : true,
					'autoOpen' : $this.attr('ezmodal-autoopen') === 'true' ? true : false
				};
			$this.ezmodal(options);
		});
	});
})(window.jQuery);