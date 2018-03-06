/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ({

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),

/***/ 20:
/***/ (function(module, exports) {

var OptionModal;

window.OptionModal = Garnish.Modal.extend({
    option: null,
    $form: null,
    $modalInputs: null,
    $redactor: null,
    $validationItems: [],
    $togglerInput: null,
    errors: [],
    errorLength: 0,
    init: function init(option) {
        var body, fields, self;
        self = this;
        this.option = option;
        this.base();
        this.$form = $('<form class="modal fitted formbuilder-modal">').appendTo(Garnish.$bod);
        this.setContainer(this.$form);

        body = $(['<header>', '<span class="modal-title">', option.$data.title, '</span>', '<div class="instructions">', option.$data.instructions, '</div>', '</header>', '<div class="body"></div>', '<footer class="footer">', '<div class="buttons">', '<input type="button" class="btns btn-modal cancel" value="' + Craft.t('form-builder', 'Cancel') + '">', '<input type="submit" class="btns btn-modal submit" value="' + Craft.t('form-builder', 'Save') + '">', '</div>', '</footer>'].join('')).appendTo(this.$form);

        $.each(option.$inputs, function (i, item) {
            var $input, camelClassName, className, required, validation;
            required = item.required ? 'data-required' : 'data-not-required';

            if (item.toggler) {
                self.$togglerInput = item;
            }

            if (item.type !== 'checkbox' && !item.toggler) {
                className = item.name.replace(/[_\W]+/g, "-").slice(0, -1);

                camelClassName = className.replace(/-([a-z])/g, function (g) {
                    return g[1].toUpperCase();
                });

                if (item.validation) {
                    validation = item.validation;
                    validation['passed'] = false;
                    validation['inputClass'] = className;
                    self.$validationItems[i] = item;
                }

                if (item.type === 'textarea') {
                    $input = "<textarea class='" + className + " " + required + "' value='" + item.value + "' data-hint='" + item.hint + "' data-name='" + item.name + "' " + required + " />" + item.value + "</textarea>";
                } else if (item.type === 'select') {
                    $input = $.parseJSON(item.options);
                } else {
                    $input = "<input type='" + item.type + "' class='" + className + " " + required + "' value='" + item.value + "' data-hint='" + item.hint + "' data-name='" + item.name + "' " + required + " />";
                }

                return self.renderInputs(required, $input, item.value, item.type, item.name, item.hint, className);
            }
        });

        if (this.option.$container.hasClass('has-fields')) {
            fields = new Fields(this.option, this.$form);
        }

        this.$modalInputs = this.$form.find('.body').find('input, textarea, select');

        if (this.$togglerInput) {
            this.activateFieldToggle();
        }

        this.show();
        this.$saveBtn = body.find('.submit');
        this.$cancelBtn = body.find('.cancel');
        this.addListener(this.$cancelBtn, 'click', 'cancel');

        return this.addListener(this.$form, 'submit', 'save');
    },

    activateFieldToggle: function activateFieldToggle() {
        var $toggler, item;
        $toggler = this.$form.find('.input-hint');

        if (this.$togglerInput.value) {
            item = this.$form.find('[data-selection-target="' + this.$togglerInput.value + '"]');
            item.addClass('active-field');
        }

        $toggler.on('click', $.proxy(function (e) {
            var input, target;
            $toggler.removeClass('active-field');
            $(e.target).addClass('active-field');
            target = $(e.target).data('selection-target');
            input = $('input[name="' + this.$togglerInput.name + '"]');

            return input.val(target);
        }, this));
    },

    renderInputs: function renderInputs(required, el, value, type, name, hint, className) {
        var $input;
        if (type === 'select') {
            $input = $('<div class="fb-field">' + '<div class="input-hint" data-selection-target="' + hint.toLowerCase() + '">' + hint + '</div>' + '<div class="select input"><select class="' + className + ' ' + required + '" data-hint="' + hint + '" data-name="' + name + '" /></div>' + '</div>');
            $.each(el, function (i, item) {
                $input.find('select').append($('<option>', {
                    value: item.value,
                    text: item.label
                }));
            });
            $input.find('select').val(value);
        } else {
            $input = $('<div class="fb-field">' + '<div class="input-hint" data-selection-target="' + hint.toLowerCase() + '">' + hint + '</div>' + '<div class="input">' + el + '</div>' + '</div>');
        }

        this.$form.find('.body').append($input);

        // if (type === 'textarea') {
        //     return this.initRedactor(el);
        // }
    },

    initRedactor: function initRedactor(item) {
        var className, el;
        className = $(item)[0].className;
        el = this.$form.find("." + className);
        el.redactor({
            maxHeight: 160,
            minHeight: 150,
            maxWidth: '400px',
            buttons: ['bold', 'italic', 'link', 'horizontalrule'],
            plugins: ['fontfamily', 'fontsize', 'alignment', 'fontcolor']
        });

        return this.$redactor = el.redactor('core.object');
    },

    cancel: function cancel() {
        if (!this.option.editing) {
            this.option.$edit.addClass('hidden');
            this.option.$container.removeClass('option-enabled');
            this.option.$resultContainer.html('');
            this.option.$toggle.html('ENABLE');
            this.disableOption();
            return this.closeModal();
        } else {
            return this.closeModal();
        }
    },

    disableOption: function disableOption() {
        if (this.option.$enableCheckbox) {
            return this.option.$enableCheckbox.prop('checked', false);
        }
    },

    hide: function hide() {
        return this.cancel();
    },

    closeModal: function closeModal(ev) {
        this.disable();

        if (ev) {
            ev.stopPropagation();
        }

        if (this.$container) {
            this.$container.velocity('fadeOut', {
                duration: Garnish.FX_DURATION
            });

            this.$shade.velocity('fadeOut', {
                duration: Garnish.FX_DURATION,
                complete: $.proxy(this, 'onFadeOut')
            });

            if (this.settings.hideOnShadeClick) {
                this.removeListener(this.$shade, 'click');
            }

            this.removeListener(Garnish.$win, 'resize');
        }

        this.visible = false;
        Garnish.Modal.visibleModal = null;

        if (this.settings.hideOnEsc) {
            Garnish.escManager.unregister(this);
        }

        this.trigger('hide');

        return this.settings.onHide();
    },

    runValidation: function runValidation(e) {
        var self;
        e.preventDefault();
        self = this;

        if (this.$validationItems) {
            return $.each(this.$validationItems, function (i, item) {
                var input;
                input = self.$form.find("." + item.validation.inputClass);
                if (input.val().match(/^\d+$/)) {
                    return item.validation.passed = true;
                } else {
                    item.validation.passed = false;
                    return Craft.cp.displayNotice(item.validation.errorMessage);
                }
            });
        } else {
            return this.save();
        }
    },

    save: function save(e) {
        var self;
        e.preventDefault();
        self = this;

        if (this.option.$container.hasClass('tags')) {
            this.checkErrors();
            if (this.errors.length > 0) {
                $.each(self.errors, function (i, item) {
                    $(item).parent().parent().addClass('error');
                });

                Garnish.shake(this.$container);
            } else {
                this.updateOption();
            }
        } else {
            this.checkErrors();
            if (this.errorLength === this.$modalInputs.length) {
                $.each(self.errors, function (i, item) {
                    if ($(item).is('select')) {
                        $(item).parent().parent().addClass('error');
                    } else {
                        $(item).parent().parent().addClass('error');
                    }
                });

                Garnish.shake(this.$container);
            } else {
                this.updateOption();
            }
        }
    },

    checkErrors: function checkErrors() {
        var self;
        self = this;
        this.errors = [];
        this.errorLength = 0;

        $.each(this.$modalInputs, function (i, item) {
            if ($(item).hasClass('data-required')) {
                if ($(item).val() === '') {
                    self.errors[i] = item;
                    self.errorLength += 1;
                }
            }
        });
    },

    updateOption: function updateOption() {
        this.option.updateHtmlFromModal();
        this.closeModal();
        this.$form[0].reset();

        Craft.cp.displayNotice(this.option.$data.successMessage);
    }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNThiMTRmNTEwZjNmNzVlZmFiNGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZGFsLmpzIl0sIm5hbWVzIjpbIk9wdGlvbk1vZGFsIiwid2luZG93IiwiR2FybmlzaCIsIk1vZGFsIiwiZXh0ZW5kIiwib3B0aW9uIiwiJGZvcm0iLCIkbW9kYWxJbnB1dHMiLCIkcmVkYWN0b3IiLCIkdmFsaWRhdGlvbkl0ZW1zIiwiJHRvZ2dsZXJJbnB1dCIsImVycm9ycyIsImVycm9yTGVuZ3RoIiwiaW5pdCIsImJvZHkiLCJmaWVsZHMiLCJzZWxmIiwiYmFzZSIsIiQiLCJhcHBlbmRUbyIsIiRib2QiLCJzZXRDb250YWluZXIiLCIkZGF0YSIsInRpdGxlIiwiaW5zdHJ1Y3Rpb25zIiwiQ3JhZnQiLCJ0Iiwiam9pbiIsImVhY2giLCIkaW5wdXRzIiwiaSIsIml0ZW0iLCIkaW5wdXQiLCJjYW1lbENsYXNzTmFtZSIsImNsYXNzTmFtZSIsInJlcXVpcmVkIiwidmFsaWRhdGlvbiIsInRvZ2dsZXIiLCJ0eXBlIiwibmFtZSIsInJlcGxhY2UiLCJzbGljZSIsImciLCJ0b1VwcGVyQ2FzZSIsInZhbHVlIiwiaGludCIsInBhcnNlSlNPTiIsIm9wdGlvbnMiLCJyZW5kZXJJbnB1dHMiLCIkY29udGFpbmVyIiwiaGFzQ2xhc3MiLCJGaWVsZHMiLCJmaW5kIiwiYWN0aXZhdGVGaWVsZFRvZ2dsZSIsInNob3ciLCIkc2F2ZUJ0biIsIiRjYW5jZWxCdG4iLCJhZGRMaXN0ZW5lciIsIiR0b2dnbGVyIiwiYWRkQ2xhc3MiLCJvbiIsInByb3h5IiwiZSIsImlucHV0IiwidGFyZ2V0IiwicmVtb3ZlQ2xhc3MiLCJkYXRhIiwidmFsIiwiZWwiLCJ0b0xvd2VyQ2FzZSIsImFwcGVuZCIsInRleHQiLCJsYWJlbCIsImluaXRSZWRhY3RvciIsInJlZGFjdG9yIiwibWF4SGVpZ2h0IiwibWluSGVpZ2h0IiwibWF4V2lkdGgiLCJidXR0b25zIiwicGx1Z2lucyIsImNhbmNlbCIsImVkaXRpbmciLCIkZWRpdCIsIiRyZXN1bHRDb250YWluZXIiLCJodG1sIiwiJHRvZ2dsZSIsImRpc2FibGVPcHRpb24iLCJjbG9zZU1vZGFsIiwiJGVuYWJsZUNoZWNrYm94IiwicHJvcCIsImhpZGUiLCJldiIsImRpc2FibGUiLCJzdG9wUHJvcGFnYXRpb24iLCJ2ZWxvY2l0eSIsImR1cmF0aW9uIiwiRlhfRFVSQVRJT04iLCIkc2hhZGUiLCJjb21wbGV0ZSIsInNldHRpbmdzIiwiaGlkZU9uU2hhZGVDbGljayIsInJlbW92ZUxpc3RlbmVyIiwiJHdpbiIsInZpc2libGUiLCJ2aXNpYmxlTW9kYWwiLCJoaWRlT25Fc2MiLCJlc2NNYW5hZ2VyIiwidW5yZWdpc3RlciIsInRyaWdnZXIiLCJvbkhpZGUiLCJydW5WYWxpZGF0aW9uIiwicHJldmVudERlZmF1bHQiLCJpbnB1dENsYXNzIiwibWF0Y2giLCJwYXNzZWQiLCJjcCIsImRpc3BsYXlOb3RpY2UiLCJlcnJvck1lc3NhZ2UiLCJzYXZlIiwiY2hlY2tFcnJvcnMiLCJsZW5ndGgiLCJwYXJlbnQiLCJzaGFrZSIsInVwZGF0ZU9wdGlvbiIsImlzIiwidXBkYXRlSHRtbEZyb21Nb2RhbCIsInJlc2V0Iiwic3VjY2Vzc01lc3NhZ2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7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MEI7QUFDdEJuRCx5QkFBS0wsTUFBTCxDQUFZbUIsQ0FBWixJQUFpQkMsSUFBakI7QUFDQWYseUJBQUtKLFdBQUwsSUFBb0IsQ0FBcEI7QUFDSDtBQUNKO0FBQ0osU0FQRDtBQVFILEtBalFxQzs7QUFtUXRDK0csa0JBQWMsd0JBQVc7QUFDckIsYUFBS3RILE1BQUwsQ0FBWXdILG1CQUFaO0FBQ0EsYUFBS3RDLFVBQUw7QUFDQSxhQUFLakYsS0FBTCxDQUFXLENBQVgsRUFBY3dILEtBQWQ7O0FBRUFyRyxjQUFNMEYsRUFBTixDQUFTQyxhQUFULENBQXVCLEtBQUsvRyxNQUFMLENBQVlpQixLQUFaLENBQWtCeUcsY0FBekM7QUFDSDtBQXpRcUMsQ0FBckIsQ0FBckIsQyIsImZpbGUiOiIvVXNlcnMvZ29uY2hhdi9TaXRlcy9jcmFmdC9jcmFmdDNwbHVnaW5zL2NyYWZ0M3BsdWdpbnMvZm9ybWJ1aWxkZXIvcmVsZWFzZS9zcmMvYXNzZXRzL2pzL21vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU4YjE0ZjUxMGYzZjc1ZWZhYjRkIiwidmFyIE9wdGlvbk1vZGFsO1xuXG53aW5kb3cuT3B0aW9uTW9kYWwgPSBHYXJuaXNoLk1vZGFsLmV4dGVuZCh7XG4gICAgb3B0aW9uOiBudWxsLFxuICAgICRmb3JtOiBudWxsLFxuICAgICRtb2RhbElucHV0czogbnVsbCxcbiAgICAkcmVkYWN0b3I6IG51bGwsXG4gICAgJHZhbGlkYXRpb25JdGVtczogW10sXG4gICAgJHRvZ2dsZXJJbnB1dDogbnVsbCxcbiAgICBlcnJvcnM6IFtdLFxuICAgIGVycm9yTGVuZ3RoOiAwLFxuICAgIGluaXQ6IGZ1bmN0aW9uKG9wdGlvbikge1xuICAgICAgICB2YXIgYm9keSwgZmllbGRzLCBzZWxmO1xuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5vcHRpb24gPSBvcHRpb247XG4gICAgICAgIHRoaXMuYmFzZSgpO1xuICAgICAgICB0aGlzLiRmb3JtID0gJCgnPGZvcm0gY2xhc3M9XCJtb2RhbCBmaXR0ZWQgZm9ybWJ1aWxkZXItbW9kYWxcIj4nKS5hcHBlbmRUbyhHYXJuaXNoLiRib2QpO1xuICAgICAgICB0aGlzLnNldENvbnRhaW5lcih0aGlzLiRmb3JtKTtcbiAgICAgICAgXG4gICAgICAgIGJvZHkgPSAkKFsnPGhlYWRlcj4nLCAnPHNwYW4gY2xhc3M9XCJtb2RhbC10aXRsZVwiPicsIG9wdGlvbi4kZGF0YS50aXRsZSwgJzwvc3Bhbj4nLCAnPGRpdiBjbGFzcz1cImluc3RydWN0aW9uc1wiPicsIG9wdGlvbi4kZGF0YS5pbnN0cnVjdGlvbnMsICc8L2Rpdj4nLCAnPC9oZWFkZXI+JywgJzxkaXYgY2xhc3M9XCJib2R5XCI+PC9kaXY+JywgJzxmb290ZXIgY2xhc3M9XCJmb290ZXJcIj4nLCAnPGRpdiBjbGFzcz1cImJ1dHRvbnNcIj4nLCAnPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIGNhbmNlbFwiIHZhbHVlPVwiJyArIENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdDYW5jZWwnKSArICdcIj4nLCAnPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIHN1Ym1pdFwiIHZhbHVlPVwiJyArIENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdTYXZlJykgKyAnXCI+JywgJzwvZGl2PicsICc8L2Zvb3Rlcj4nXS5qb2luKCcnKSkuYXBwZW5kVG8odGhpcy4kZm9ybSk7XG4gICAgICAgIFxuICAgICAgICAkLmVhY2gob3B0aW9uLiRpbnB1dHMsIGZ1bmN0aW9uKGksIGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciAkaW5wdXQsIGNhbWVsQ2xhc3NOYW1lLCBjbGFzc05hbWUsIHJlcXVpcmVkLCB2YWxpZGF0aW9uO1xuICAgICAgICAgICAgcmVxdWlyZWQgPSBpdGVtLnJlcXVpcmVkID8gJ2RhdGEtcmVxdWlyZWQnIDogJ2RhdGEtbm90LXJlcXVpcmVkJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGl0ZW0udG9nZ2xlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuJHRvZ2dsZXJJbnB1dCA9IGl0ZW07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgIT09ICdjaGVja2JveCcgJiYgIWl0ZW0udG9nZ2xlcikge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IGl0ZW0ubmFtZS5yZXBsYWNlKC9bX1xcV10rL2csIFwiLVwiKS5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FtZWxDbGFzc05hbWUgPSBjbGFzc05hbWUucmVwbGFjZSgvLShbYS16XSkvZywgZnVuY3Rpb24oZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ1sxXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0udmFsaWRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uID0gaXRlbS52YWxpZGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uWydwYXNzZWQnXSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uWydpbnB1dENsYXNzJ10gPSBjbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJHZhbGlkYXRpb25JdGVtc1tpXSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ3RleHRhcmVhJykge1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXQgPSBcIjx0ZXh0YXJlYSBjbGFzcz0nXCIgKyBjbGFzc05hbWUgKyBcIiBcIiArIHJlcXVpcmVkICsgXCInIHZhbHVlPSdcIiArIGl0ZW0udmFsdWUgKyBcIicgZGF0YS1oaW50PSdcIiArIGl0ZW0uaGludCArIFwiJyBkYXRhLW5hbWU9J1wiICsgaXRlbS5uYW1lICsgXCInIFwiICsgcmVxdWlyZWQgKyBcIiAvPlwiICsgaXRlbS52YWx1ZSArIFwiPC90ZXh0YXJlYT5cIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0ID0gJC5wYXJzZUpTT04oaXRlbS5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXQgPSBcIjxpbnB1dCB0eXBlPSdcIiArIGl0ZW0udHlwZSArIFwiJyBjbGFzcz0nXCIgKyBjbGFzc05hbWUgKyBcIiBcIiArIHJlcXVpcmVkICsgXCInIHZhbHVlPSdcIiArIGl0ZW0udmFsdWUgKyBcIicgZGF0YS1oaW50PSdcIiArIGl0ZW0uaGludCArIFwiJyBkYXRhLW5hbWU9J1wiICsgaXRlbS5uYW1lICsgXCInIFwiICsgcmVxdWlyZWQgKyBcIiAvPlwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLnJlbmRlcklucHV0cyhyZXF1aXJlZCwgJGlucHV0LCBpdGVtLnZhbHVlLCBpdGVtLnR5cGUsIGl0ZW0ubmFtZSwgaXRlbS5oaW50LCBjbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb24uJGNvbnRhaW5lci5oYXNDbGFzcygnaGFzLWZpZWxkcycpKSB7XG4gICAgICAgICAgICBmaWVsZHMgPSBuZXcgRmllbGRzKHRoaXMub3B0aW9uLCB0aGlzLiRmb3JtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJG1vZGFsSW5wdXRzID0gdGhpcy4kZm9ybS5maW5kKCcuYm9keScpLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0Jyk7XG5cbiAgICAgICAgaWYgKHRoaXMuJHRvZ2dsZXJJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUZpZWxkVG9nZ2xlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgdGhpcy4kc2F2ZUJ0biA9IGJvZHkuZmluZCgnLnN1Ym1pdCcpO1xuICAgICAgICB0aGlzLiRjYW5jZWxCdG4gPSBib2R5LmZpbmQoJy5jYW5jZWwnKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRjYW5jZWxCdG4sICdjbGljaycsICdjYW5jZWwnKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRmb3JtLCAnc3VibWl0JywgJ3NhdmUnKTtcbiAgICB9LFxuXG4gICAgYWN0aXZhdGVGaWVsZFRvZ2dsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkdG9nZ2xlciwgaXRlbTtcbiAgICAgICAgJHRvZ2dsZXIgPSB0aGlzLiRmb3JtLmZpbmQoJy5pbnB1dC1oaW50Jyk7XG5cbiAgICAgICAgaWYgKHRoaXMuJHRvZ2dsZXJJbnB1dC52YWx1ZSkge1xuICAgICAgICAgICAgaXRlbSA9IHRoaXMuJGZvcm0uZmluZCgnW2RhdGEtc2VsZWN0aW9uLXRhcmdldD1cIicgKyB0aGlzLiR0b2dnbGVySW5wdXQudmFsdWUgKyAnXCJdJyk7XG4gICAgICAgICAgICBpdGVtLmFkZENsYXNzKCdhY3RpdmUtZmllbGQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgICR0b2dnbGVyLm9uKCdjbGljaycsICQucHJveHkoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCwgdGFyZ2V0O1xuICAgICAgICAgICAgJHRvZ2dsZXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZS1maWVsZCcpO1xuICAgICAgICAgICAgJChlLnRhcmdldCkuYWRkQ2xhc3MoJ2FjdGl2ZS1maWVsZCcpO1xuICAgICAgICAgICAgdGFyZ2V0ID0gJChlLnRhcmdldCkuZGF0YSgnc2VsZWN0aW9uLXRhcmdldCcpO1xuICAgICAgICAgICAgaW5wdXQgPSAkKCdpbnB1dFtuYW1lPVwiJyArIHRoaXMuJHRvZ2dsZXJJbnB1dC5uYW1lICsgJ1wiXScpO1xuXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQudmFsKHRhcmdldCk7XG4gICAgICAgIH0pLCB0aGlzKSk7XG5cbiAgICB9LFxuXG4gICAgcmVuZGVySW5wdXRzOiBmdW5jdGlvbihyZXF1aXJlZCwgZWwsIHZhbHVlLCB0eXBlLCBuYW1lLCBoaW50LCBjbGFzc05hbWUpIHtcbiAgICAgICAgdmFyICRpbnB1dDtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgICAgICAkaW5wdXQgPSAkKCc8ZGl2IGNsYXNzPVwiZmItZmllbGRcIj4nICsgJzxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCIgZGF0YS1zZWxlY3Rpb24tdGFyZ2V0PVwiJyArIGhpbnQudG9Mb3dlckNhc2UoKSArICdcIj4nICsgaGludCArICc8L2Rpdj4nICsgJzxkaXYgY2xhc3M9XCJzZWxlY3QgaW5wdXRcIj48c2VsZWN0IGNsYXNzPVwiJyArIGNsYXNzTmFtZSArICcgJyArIHJlcXVpcmVkICsgJ1wiIGRhdGEtaGludD1cIicgKyBoaW50ICsgJ1wiIGRhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiIC8+PC9kaXY+JyArICc8L2Rpdj4nKTtcbiAgICAgICAgICAgICQuZWFjaChlbCwgZnVuY3Rpb24oaSwgaXRlbSkge1xuICAgICAgICAgICAgICAgICRpbnB1dC5maW5kKCdzZWxlY3QnKS5hcHBlbmQoJCgnPG9wdGlvbj4nLCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBpdGVtLmxhYmVsXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaW5wdXQuZmluZCgnc2VsZWN0JykudmFsKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRpbnB1dCA9ICQoJzxkaXYgY2xhc3M9XCJmYi1maWVsZFwiPicgKyAnPGRpdiBjbGFzcz1cImlucHV0LWhpbnRcIiBkYXRhLXNlbGVjdGlvbi10YXJnZXQ9XCInICsgaGludC50b0xvd2VyQ2FzZSgpICsgJ1wiPicgKyBoaW50ICsgJzwvZGl2PicgKyAnPGRpdiBjbGFzcz1cImlucHV0XCI+JyArIGVsICsgJzwvZGl2PicgKyAnPC9kaXY+Jyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRmb3JtLmZpbmQoJy5ib2R5JykuYXBwZW5kKCRpbnB1dCk7XG5cbiAgICAgICAgLy8gaWYgKHR5cGUgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLmluaXRSZWRhY3RvcihlbCk7XG4gICAgICAgIC8vIH1cbiAgICB9LFxuXG4gICAgaW5pdFJlZGFjdG9yOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUsIGVsO1xuICAgICAgICBjbGFzc05hbWUgPSAkKGl0ZW0pWzBdLmNsYXNzTmFtZTtcbiAgICAgICAgZWwgPSB0aGlzLiRmb3JtLmZpbmQoXCIuXCIgKyBjbGFzc05hbWUpO1xuICAgICAgICBlbC5yZWRhY3Rvcih7XG4gICAgICAgICAgICBtYXhIZWlnaHQ6IDE2MCxcbiAgICAgICAgICAgIG1pbkhlaWdodDogMTUwLFxuICAgICAgICAgICAgbWF4V2lkdGg6ICc0MDBweCcsXG4gICAgICAgICAgICBidXR0b25zOiBbJ2JvbGQnLCAnaXRhbGljJywgJ2xpbmsnLCAnaG9yaXpvbnRhbHJ1bGUnXSxcbiAgICAgICAgICAgIHBsdWdpbnM6IFsnZm9udGZhbWlseScsICdmb250c2l6ZScsICdhbGlnbm1lbnQnLCAnZm9udGNvbG9yJ11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlZGFjdG9yID0gZWwucmVkYWN0b3IoJ2NvcmUub2JqZWN0Jyk7XG4gICAgfSxcblxuICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb24uZWRpdGluZykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb24uJGVkaXQuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb24uJGNvbnRhaW5lci5yZW1vdmVDbGFzcygnb3B0aW9uLWVuYWJsZWQnKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uLiRyZXN1bHRDb250YWluZXIuaHRtbCgnJyk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbi4kdG9nZ2xlLmh0bWwoJ0VOQUJMRScpO1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlT3B0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGlzYWJsZU9wdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbi4kZW5hYmxlQ2hlY2tib3gpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbi4kZW5hYmxlQ2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoaWRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuY2VsKCk7XG4gICAgfSxcblxuICAgIGNsb3NlTW9kYWw6IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuXG4gICAgICAgIGlmIChldikge1xuICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kY29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoJ2ZhZGVPdXQnLCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IEdhcm5pc2guRlhfRFVSQVRJT05cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRzaGFkZS52ZWxvY2l0eSgnZmFkZU91dCcsIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogR2FybmlzaC5GWF9EVVJBVElPTixcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogJC5wcm94eSh0aGlzLCAnb25GYWRlT3V0JylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5oaWRlT25TaGFkZUNsaWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0aGlzLiRzaGFkZSwgJ2NsaWNrJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoR2FybmlzaC4kd2luLCAncmVzaXplJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgR2FybmlzaC5Nb2RhbC52aXNpYmxlTW9kYWwgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaGlkZU9uRXNjKSB7XG4gICAgICAgICAgICBHYXJuaXNoLmVzY01hbmFnZXIudW5yZWdpc3Rlcih0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcignaGlkZScpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLm9uSGlkZSgpO1xuICAgIH0sXG5cbiAgICBydW5WYWxpZGF0aW9uOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBzZWxmO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0aGlzLiR2YWxpZGF0aW9uSXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiAkLmVhY2godGhpcy4kdmFsaWRhdGlvbkl0ZW1zLCBmdW5jdGlvbihpLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0O1xuICAgICAgICAgICAgICAgIGlucHV0ID0gc2VsZi4kZm9ybS5maW5kKFwiLlwiICsgaXRlbS52YWxpZGF0aW9uLmlucHV0Q2xhc3MpO1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWwoKS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udmFsaWRhdGlvbi5wYXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsaWRhdGlvbi5wYXNzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoaXRlbS52YWxpZGF0aW9uLmVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zYXZlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2F2ZTogZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgc2VsZjtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAodGhpcy5vcHRpb24uJGNvbnRhaW5lci5oYXNDbGFzcygndGFncycpKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrRXJyb3JzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5lcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICQuZWFjaChzZWxmLmVycm9ycywgZnVuY3Rpb24oaSwgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAkKGl0ZW0pLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgR2FybmlzaC5zaGFrZSh0aGlzLiRjb250YWluZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy51cGRhdGVPcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tFcnJvcnMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmVycm9yTGVuZ3RoID09PSB0aGlzLiRtb2RhbElucHV0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkLmVhY2goc2VsZi5lcnJvcnMsIGZ1bmN0aW9uKGksIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoaXRlbSkuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKGl0ZW0pLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChpdGVtKS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgR2FybmlzaC5zaGFrZSh0aGlzLiRjb250YWluZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrRXJyb3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGY7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xuICAgICAgICB0aGlzLmVycm9yTGVuZ3RoID0gMDtcblxuICAgICAgICAkLmVhY2godGhpcy4kbW9kYWxJbnB1dHMsIGZ1bmN0aW9uKGksIGl0ZW0pIHtcbiAgICAgICAgICAgIGlmICgkKGl0ZW0pLmhhc0NsYXNzKCdkYXRhLXJlcXVpcmVkJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoJChpdGVtKS52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lcnJvcnNbaV0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVycm9yTGVuZ3RoICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlT3B0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5vcHRpb24udXBkYXRlSHRtbEZyb21Nb2RhbCgpO1xuICAgICAgICB0aGlzLmNsb3NlTW9kYWwoKTtcbiAgICAgICAgdGhpcy4kZm9ybVswXS5yZXNldCgpO1xuXG4gICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UodGhpcy5vcHRpb24uJGRhdGEuc3VjY2Vzc01lc3NhZ2UpO1xuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9tb2RhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=