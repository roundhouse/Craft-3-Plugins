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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),

/***/ 18:
/***/ (function(module, exports) {

var Option = void 0;

Option = Garnish.Base.extend({
    $container: null,
    $resultWrapper: null,
    $resultContainer: null,
    $toggle: null,
    $edit: null,
    $data: null,
    $inputs: null,
    enabled: false,
    editing: false,
    hasModal: false,
    hasTags: false,
    isTemplate: false,
    $enableCheckbox: null,
    $fields: null,

    init: function init(container) {
        var self = void 0;
        self = this;

        this.$container = $(container);
        this.$resultWrapper = this.$container.find('.option-wrapper');
        this.$resultContainer = this.$container.find('.option-result');
        this.$toggle = this.$container.find('.option-toggle');
        this.$edit = this.$container.find('.option-edit');

        if (this.$container.hasClass('tags')) {
            this.hasTags = true;
        }

        if (this.$container.hasClass('is-template')) {
            this.isTemplate = true;
        }

        this.$inputs = this.$container.data('inputs');
        this.$data = this.$container.data('modal');

        if (this.$data) {
            this.$fields = this.$data.fields;
            this.hasModal = true;
        }

        if (this.$inputs) {
            $.each(this.$inputs, function (i, item) {
                var name = void 0;
                if (item.type === 'checkbox') {
                    self.enabled = item.checked;
                    name = item.name;
                    self.$enableCheckbox = $('[name=\'' + name + '\']');
                } else {
                    self.enabled = true;
                }
            });
        }

        this.addListener(this.$toggle, 'click', 'toggle');
        this.addListener(this.$edit, 'click', 'edit');

        if (this.enabled) {
            this.editing = true;

            if (this.$data) {
                this.$edit.removeClass('hidden');
            }
        }
    },
    toggle: function toggle(e) {
        e.preventDefault();
        this.editing = false;

        if (this.$container.hasClass('option-enabled')) {
            this.$edit.addClass('hidden');
            this.$container.removeClass('option-enabled');
            this.$resultWrapper.addClass('hidden');
            this.$resultContainer.html('');
            this.$toggle.html('ENABLE');
            this.disableOption();
        } else {
            this.$edit.removeClass('hidden');
            this.$container.addClass('option-enabled');
            this.$toggle.html('DISABLE');
            this.enableOption();

            if (this.hasModal) {
                if (!this.modal) {
                    this.modal = new OptionModal(this);
                } else {
                    this.modal.$form.find('.fb-field').removeClass('error');
                    this.modal.$form[0].reset();
                    this.modal.show();
                }
            }
        }
    },
    edit: function edit(e) {
        e.preventDefault();
        var self = void 0;
        self = this;
        this.editing = true;

        if (this.editing) {
            if (!this.modal) {
                this.modal = new OptionModal(this);
            } else {
                this.modal.$form.find('.fb-field').removeClass('error');
                $.each(this.$inputs, function (i, item) {
                    var className = void 0;
                    var currentValue = void 0;

                    if (item.type !== 'checkbox') {
                        currentValue = $('[name=\'' + item.name + '\']').val();
                        className = item.name.replace(/[_\W]+/g, "-").slice(0, -1);

                        $.each(self.modal.$modalInputs, function (i, item) {
                            var input = void 0;
                            input = $(item);

                            if (input.hasClass(className)) {
                                input.val(currentValue);
                            }
                        });
                    }
                });

                this.modal.show();
            }
        }
    },
    disableOption: function disableOption() {
        this.$enableCheckbox.prop('checked', false);
    },
    enableOption: function enableOption() {
        if (this.$enableCheckbox) {
            this.$enableCheckbox.prop('checked', true);
        }
    },
    updateHtmlFromModal: function updateHtmlFromModal() {
        var self = void 0;
        self = this;
        var $resultHtml = void 0;
        var body = void 0;
        var index = void 0;
        var key = void 0;
        var name = void 0;
        var totalResults = void 0;
        var value = void 0;

        if (this.hasTags) {
            totalResults = this.$resultContainer.find('.result-item').length;

            if (totalResults) {
                index = totalResults;
            } else {
                index = 0;
            }

            $resultHtml = $('<div class="result-item" data-result-index="' + index + '">').appendTo(Garnish.$bod);
            name = $(this.modal.$modalInputs[0]).data('name');
            key = $(this.modal.$modalInputs[0]).val();
            value = $(this.modal.$modalInputs[1]).val();
            body = $(['<div class="option-result-actions">', '<a href="#" class="option-result-delete" title="' + Craft.t('form-builder', 'Delete') + '"><svg width="19" height="19" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg"><path d="M9.521064 18.5182504c-4.973493 0-9.019897-4.0510671-9.019897-9.030471 0-4.98018924 4.046404-9.0312563 9.019897-9.0312563s9.019897 4.05106706 9.019897 9.0312563c0 4.9794039-4.046404 9.030471-9.019897 9.030471zm0-16.05425785c-3.868359 0-7.015127 3.15021907-7.015127 7.02378685 0 3.8727824 3.146768 7.0237869 7.015127 7.0237869 3.86836 0 7.015127-3.1510045 7.015127-7.0237869 0-3.87356778-3.146767-7.02378685-7.015127-7.02378685zm3.167945 10.02870785c-.196085.1955634-.452564.2937378-.708258.2937378-.256479 0-.512958-.0981744-.709042-.2937378L9.521064 10.739699 7.77042 12.4927004c-.196085.1955634-.452564.2937378-.709043.2937378-.256478 0-.512957-.0981744-.708258-.2937378-.391385-.391912-.391385-1.0272965 0-1.4192086l1.750645-1.7530015-1.750645-1.7530015c-.391385-.391912-.391385-1.02729655 0-1.41920862.391385-.39191207 1.025131-.39191207 1.417301 0L9.521064 7.9012817l1.750645-1.75300152c.391385-.39191207 1.025915-.39191207 1.4173 0 .391385.39191207.391385 1.02729662 0 1.41920862l-1.750644 1.7530015 1.750644 1.7530015c.391385.3919121.391385 1.0272966 0 1.4192086z" fill="#8094A1" fill-rule="evenodd"/></svg></a>', '</div>', '<code><span class="option-key input-hint">' + key + '</span> ' + value + '</code>', '<input type="hidden" name="' + name + '[' + index + '][key]" value="' + key + '" />', '<input type="hidden" name="' + name + '[' + index + '][value]" value="' + value + '" />'].join('')).appendTo($resultHtml);
            this.$resultContainer.append($resultHtml);

            new Tag($resultHtml, this.modal);
        } else {
            if (this.isTemplate) {
                updateTemplateHtml(this.modal, this.$container);
            }

            this.$resultContainer.html('');

            $.each(this.modal.$modalInputs, function (i, item) {
                var hint = void 0;
                value = $(item).val();

                if (value) {
                    name = $(item).data('name');
                    hint = $(item).data('hint');
                    $('[name=\'' + name + '\']').val(value);
                    self.$resultContainer.append($('<code><span class=\'input-hint\'>' + hint + ':</span> ' + value + '</code>'));
                } else {
                    name = $(item).data('name');
                    hint = $(item).data('hint');
                    ('[name=\'' + name + '\']').val('');
                }
            });
        }

        this.$resultWrapper.removeClass('hidden');
    }
});

Garnish.$doc.ready(function () {
    return $('.option-item').each(function (i, el) {
        return new Option(el);
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNThiMTRmNTEwZjNmNzVlZmFiNGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL29wdGlvbi5qcyJdLCJuYW1lcyI6WyJPcHRpb24iLCJHYXJuaXNoIiwiQmFzZSIsImV4dGVuZCIsIiRjb250YWluZXIiLCIkcmVzdWx0V3JhcHBlciIsIiRyZXN1bHRDb250YWluZXIiLCIkdG9nZ2xlIiwiJGVkaXQiLCIkZGF0YSIsIiRpbnB1dHMiLCJlbmFibGVkIiwiZWRpdGluZyIsImhhc01vZGFsIiwiaGFzVGFncyIsImlzVGVtcGxhdGUiLCIkZW5hYmxlQ2hlY2tib3giLCIkZmllbGRzIiwiaW5pdCIsImNvbnRhaW5lciIsInNlbGYiLCIkIiwiZmluZCIsImhhc0NsYXNzIiwiZGF0YSIsImZpZWxkcyIsImVhY2giLCJpIiwiaXRlbSIsIm5hbWUiLCJ0eXBlIiwiY2hlY2tlZCIsImFkZExpc3RlbmVyIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGUiLCJlIiwicHJldmVudERlZmF1bHQiLCJhZGRDbGFzcyIsImh0bWwiLCJkaXNhYmxlT3B0aW9uIiwiZW5hYmxlT3B0aW9uIiwibW9kYWwiLCJPcHRpb25Nb2RhbCIsIiRmb3JtIiwicmVzZXQiLCJzaG93IiwiZWRpdCIsImNsYXNzTmFtZSIsImN1cnJlbnRWYWx1ZSIsInZhbCIsInJlcGxhY2UiLCJzbGljZSIsIiRtb2RhbElucHV0cyIsImlucHV0IiwicHJvcCIsInVwZGF0ZUh0bWxGcm9tTW9kYWwiLCIkcmVzdWx0SHRtbCIsImJvZHkiLCJpbmRleCIsImtleSIsInRvdGFsUmVzdWx0cyIsInZhbHVlIiwibGVuZ3RoIiwiYXBwZW5kVG8iLCIkYm9kIiwiQ3JhZnQiLCJ0Iiwiam9pbiIsImFwcGVuZCIsIlRhZyIsInVwZGF0ZVRlbXBsYXRlSHRtbCIsImhpbnQiLCIkZG9jIiwicmVhZHkiLCJlbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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QywyQkFBT2xELEVBQUVPLElBQUYsRUFBUUosSUFBUixDQUFhLE1BQWIsQ0FBUDtBQUNBSCxtQ0FBWVEsSUFBWixVQUFzQm9CLEdBQXRCLENBQTBCWSxLQUExQjtBQUNBekMseUJBQUtkLGdCQUFMLENBQXNCOEQsTUFBdEIsQ0FBNkIvQyx3Q0FBb0NrRCxJQUFwQyxpQkFBb0RWLEtBQXBELGFBQTdCO0FBQ0gsaUJBTEQsTUFLTztBQUNIaEMsMkJBQU9SLEVBQUVPLElBQUYsRUFBUUosSUFBUixDQUFhLE1BQWIsQ0FBUDtBQUNBK0MsMkJBQU9sRCxFQUFFTyxJQUFGLEVBQVFKLElBQVIsQ0FBYSxNQUFiLENBQVA7QUFDQSxrQ0FBV0ssSUFBWCxVQUFxQm9CLEdBQXJCLENBQXlCLEVBQXpCO0FBQ0g7QUFDSixhQWREO0FBZUg7O0FBRUQsYUFBSzVDLGNBQUwsQ0FBb0I0QixXQUFwQixDQUFnQyxRQUFoQztBQUNIO0FBbk13QixDQUFwQixDQUFUOztBQXNNQWhDLFFBQVF1RSxJQUFSLENBQWFDLEtBQWIsQ0FBbUI7QUFBQSxXQUFNcEQsRUFBRSxjQUFGLEVBQWtCSyxJQUFsQixDQUF1QixVQUFDQyxDQUFELEVBQUkrQyxFQUFKO0FBQUEsZUFBVyxJQUFJMUUsTUFBSixDQUFXMEUsRUFBWCxDQUFYO0FBQUEsS0FBdkIsQ0FBTjtBQUFBLENBQW5CLEUiLCJmaWxlIjoiL1VzZXJzL2dvbmNoYXYvU2l0ZXMvY3JhZnQvY3JhZnQzcGx1Z2lucy9jcmFmdDNwbHVnaW5zL2Zvcm1idWlsZGVyL3JlbGVhc2Uvc3JjL2Fzc2V0cy9qcy9vcHRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNThiMTRmNTEwZjNmNzVlZmFiNGQiLCJsZXQgT3B0aW9uO1xuXG5PcHRpb24gPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkY29udGFpbmVyOiBudWxsLFxuICAgICRyZXN1bHRXcmFwcGVyOiBudWxsLFxuICAgICRyZXN1bHRDb250YWluZXI6IG51bGwsXG4gICAgJHRvZ2dsZTogbnVsbCxcbiAgICAkZWRpdDogbnVsbCxcbiAgICAkZGF0YTogbnVsbCxcbiAgICAkaW5wdXRzOiBudWxsLFxuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIGVkaXRpbmc6IGZhbHNlLFxuICAgIGhhc01vZGFsOiBmYWxzZSxcbiAgICBoYXNUYWdzOiBmYWxzZSxcbiAgICBpc1RlbXBsYXRlOiBmYWxzZSxcbiAgICAkZW5hYmxlQ2hlY2tib3g6IG51bGwsXG4gICAgJGZpZWxkczogbnVsbCxcblxuICAgIGluaXQoY29udGFpbmVyKSB7XG4gICAgICAgIGxldCBzZWxmO1xuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLiRjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuJHJlc3VsdFdyYXBwZXIgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLm9wdGlvbi13cmFwcGVyJyk7XG4gICAgICAgIHRoaXMuJHJlc3VsdENvbnRhaW5lciA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcub3B0aW9uLXJlc3VsdCcpO1xuICAgICAgICB0aGlzLiR0b2dnbGUgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLm9wdGlvbi10b2dnbGUnKTtcbiAgICAgICAgdGhpcy4kZWRpdCA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcub3B0aW9uLWVkaXQnKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLiRjb250YWluZXIuaGFzQ2xhc3MoJ3RhZ3MnKSkge1xuICAgICAgICAgICAgdGhpcy5oYXNUYWdzID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLiRjb250YWluZXIuaGFzQ2xhc3MoJ2lzLXRlbXBsYXRlJykpIHtcbiAgICAgICAgICAgIHRoaXMuaXNUZW1wbGF0ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRpbnB1dHMgPSB0aGlzLiRjb250YWluZXIuZGF0YSgnaW5wdXRzJyk7XG4gICAgICAgIHRoaXMuJGRhdGEgPSB0aGlzLiRjb250YWluZXIuZGF0YSgnbW9kYWwnKTtcblxuICAgICAgICBpZiAodGhpcy4kZGF0YSkge1xuICAgICAgICAgICAgdGhpcy4kZmllbGRzID0gdGhpcy4kZGF0YS5maWVsZHM7XG4gICAgICAgICAgICB0aGlzLmhhc01vZGFsID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLiRpbnB1dHMpIHtcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLiRpbnB1dHMsIChpLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWU7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVuYWJsZWQgPSBpdGVtLmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBpdGVtLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVuYWJsZUNoZWNrYm94ID0gJChgW25hbWU9JyR7bmFtZX0nXWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJHRvZ2dsZSwgJ2NsaWNrJywgJ3RvZ2dsZScpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGVkaXQsICdjbGljaycsICdlZGl0Jyk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuJGRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlZGl0LnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICB9LFxuXG4gICAgdG9nZ2xlKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy4kY29udGFpbmVyLmhhc0NsYXNzKCdvcHRpb24tZW5hYmxlZCcpKSB7XG4gICAgICAgICAgICB0aGlzLiRlZGl0LmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5yZW1vdmVDbGFzcygnb3B0aW9uLWVuYWJsZWQnKTtcbiAgICAgICAgICAgIHRoaXMuJHJlc3VsdFdyYXBwZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy4kcmVzdWx0Q29udGFpbmVyLmh0bWwoJycpO1xuICAgICAgICAgICAgdGhpcy4kdG9nZ2xlLmh0bWwoJ0VOQUJMRScpO1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlT3B0aW9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRlZGl0LnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5hZGRDbGFzcygnb3B0aW9uLWVuYWJsZWQnKTtcbiAgICAgICAgICAgIHRoaXMuJHRvZ2dsZS5odG1sKCdESVNBQkxFJyk7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZU9wdGlvbigpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNNb2RhbCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGFsID0gbmV3IE9wdGlvbk1vZGFsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuJGZvcm0uZmluZCgnLmZiLWZpZWxkJykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuJGZvcm1bMF0ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGVkaXQoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBzZWxmO1xuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5lZGl0aW5nKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsID0gbmV3IE9wdGlvbk1vZGFsKHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsLiRmb3JtLmZpbmQoJy5mYi1maWVsZCcpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICQuZWFjaCh0aGlzLiRpbnB1dHMsIChpLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSAhPT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFZhbHVlID0gJChgW25hbWU9JyR7aXRlbS5uYW1lfSddYCkudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBpdGVtLm5hbWUucmVwbGFjZSgvW19cXFddKy9nLCBcIi1cIikuc2xpY2UoMCwgLTEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goc2VsZi5tb2RhbC4kbW9kYWxJbnB1dHMsIChpLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0ID0gJChpdGVtKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5oYXNDbGFzcyhjbGFzc05hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbChjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkaXNhYmxlT3B0aW9uKCkge1xuICAgICAgICB0aGlzLiRlbmFibGVDaGVja2JveC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgIH0sXG5cbiAgICBlbmFibGVPcHRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLiRlbmFibGVDaGVja2JveCkge1xuICAgICAgICAgICAgdGhpcy4kZW5hYmxlQ2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZUh0bWxGcm9tTW9kYWwoKSB7XG4gICAgICAgIGxldCBzZWxmO1xuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0ICRyZXN1bHRIdG1sO1xuICAgICAgICBsZXQgYm9keTtcbiAgICAgICAgbGV0IGluZGV4O1xuICAgICAgICBsZXQga2V5O1xuICAgICAgICBsZXQgbmFtZTtcbiAgICAgICAgbGV0IHRvdGFsUmVzdWx0cztcbiAgICAgICAgbGV0IHZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLmhhc1RhZ3MpIHtcbiAgICAgICAgICAgIHRvdGFsUmVzdWx0cyA9IHRoaXMuJHJlc3VsdENvbnRhaW5lci5maW5kKCcucmVzdWx0LWl0ZW0nKS5sZW5ndGg7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0b3RhbFJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IHRvdGFsUmVzdWx0cztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkcmVzdWx0SHRtbCA9ICQoYDxkaXYgY2xhc3M9XCJyZXN1bHQtaXRlbVwiIGRhdGEtcmVzdWx0LWluZGV4PVwiJHtpbmRleH1cIj5gKS5hcHBlbmRUbyhHYXJuaXNoLiRib2QpO1xuICAgICAgICAgICAgbmFtZSA9ICQodGhpcy5tb2RhbC4kbW9kYWxJbnB1dHNbMF0pLmRhdGEoJ25hbWUnKTtcbiAgICAgICAgICAgIGtleSA9ICQodGhpcy5tb2RhbC4kbW9kYWxJbnB1dHNbMF0pLnZhbCgpO1xuICAgICAgICAgICAgdmFsdWUgPSAkKHRoaXMubW9kYWwuJG1vZGFsSW5wdXRzWzFdKS52YWwoKTtcbiAgICAgICAgICAgIGJvZHkgPSAkKFsnPGRpdiBjbGFzcz1cIm9wdGlvbi1yZXN1bHQtYWN0aW9uc1wiPicsIGA8YSBocmVmPVwiI1wiIGNsYXNzPVwib3B0aW9uLXJlc3VsdC1kZWxldGVcIiB0aXRsZT1cIiR7Q3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0RlbGV0ZScpfVwiPjxzdmcgd2lkdGg9XCIxOVwiIGhlaWdodD1cIjE5XCIgdmlld0JveD1cIjAgMCAxOSAxOVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTkuNTIxMDY0IDE4LjUxODI1MDRjLTQuOTczNDkzIDAtOS4wMTk4OTctNC4wNTEwNjcxLTkuMDE5ODk3LTkuMDMwNDcxIDAtNC45ODAxODkyNCA0LjA0NjQwNC05LjAzMTI1NjMgOS4wMTk4OTctOS4wMzEyNTYzczkuMDE5ODk3IDQuMDUxMDY3MDYgOS4wMTk4OTcgOS4wMzEyNTYzYzAgNC45Nzk0MDM5LTQuMDQ2NDA0IDkuMDMwNDcxLTkuMDE5ODk3IDkuMDMwNDcxem0wLTE2LjA1NDI1Nzg1Yy0zLjg2ODM1OSAwLTcuMDE1MTI3IDMuMTUwMjE5MDctNy4wMTUxMjcgNy4wMjM3ODY4NSAwIDMuODcyNzgyNCAzLjE0Njc2OCA3LjAyMzc4NjkgNy4wMTUxMjcgNy4wMjM3ODY5IDMuODY4MzYgMCA3LjAxNTEyNy0zLjE1MTAwNDUgNy4wMTUxMjctNy4wMjM3ODY5IDAtMy44NzM1Njc3OC0zLjE0Njc2Ny03LjAyMzc4Njg1LTcuMDE1MTI3LTcuMDIzNzg2ODV6bTMuMTY3OTQ1IDEwLjAyODcwNzg1Yy0uMTk2MDg1LjE5NTU2MzQtLjQ1MjU2NC4yOTM3Mzc4LS43MDgyNTguMjkzNzM3OC0uMjU2NDc5IDAtLjUxMjk1OC0uMDk4MTc0NC0uNzA5MDQyLS4yOTM3Mzc4TDkuNTIxMDY0IDEwLjczOTY5OSA3Ljc3MDQyIDEyLjQ5MjcwMDRjLS4xOTYwODUuMTk1NTYzNC0uNDUyNTY0LjI5MzczNzgtLjcwOTA0My4yOTM3Mzc4LS4yNTY0NzggMC0uNTEyOTU3LS4wOTgxNzQ0LS43MDgyNTgtLjI5MzczNzgtLjM5MTM4NS0uMzkxOTEyLS4zOTEzODUtMS4wMjcyOTY1IDAtMS40MTkyMDg2bDEuNzUwNjQ1LTEuNzUzMDAxNS0xLjc1MDY0NS0xLjc1MzAwMTVjLS4zOTEzODUtLjM5MTkxMi0uMzkxMzg1LTEuMDI3Mjk2NTUgMC0xLjQxOTIwODYyLjM5MTM4NS0uMzkxOTEyMDcgMS4wMjUxMzEtLjM5MTkxMjA3IDEuNDE3MzAxIDBMOS41MjEwNjQgNy45MDEyODE3bDEuNzUwNjQ1LTEuNzUzMDAxNTJjLjM5MTM4NS0uMzkxOTEyMDcgMS4wMjU5MTUtLjM5MTkxMjA3IDEuNDE3MyAwIC4zOTEzODUuMzkxOTEyMDcuMzkxMzg1IDEuMDI3Mjk2NjIgMCAxLjQxOTIwODYybC0xLjc1MDY0NCAxLjc1MzAwMTUgMS43NTA2NDQgMS43NTMwMDE1Yy4zOTEzODUuMzkxOTEyMS4zOTEzODUgMS4wMjcyOTY2IDAgMS40MTkyMDg2elwiIGZpbGw9XCIjODA5NEExXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiLz48L3N2Zz48L2E+YCwgJzwvZGl2PicsIGA8Y29kZT48c3BhbiBjbGFzcz1cIm9wdGlvbi1rZXkgaW5wdXQtaGludFwiPiR7a2V5fTwvc3Bhbj4gJHt2YWx1ZX08L2NvZGU+YCwgYDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIiR7bmFtZX1bJHtpbmRleH1dW2tleV1cIiB2YWx1ZT1cIiR7a2V5fVwiIC8+YCwgYDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIiR7bmFtZX1bJHtpbmRleH1dW3ZhbHVlXVwiIHZhbHVlPVwiJHt2YWx1ZX1cIiAvPmBdLmpvaW4oJycpKS5hcHBlbmRUbygkcmVzdWx0SHRtbCk7XG4gICAgICAgICAgICB0aGlzLiRyZXN1bHRDb250YWluZXIuYXBwZW5kKCRyZXN1bHRIdG1sKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbmV3IFRhZygkcmVzdWx0SHRtbCwgdGhpcy5tb2RhbCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVUZW1wbGF0ZUh0bWwodGhpcy5tb2RhbCwgdGhpcy4kY29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy4kcmVzdWx0Q29udGFpbmVyLmh0bWwoJycpO1xuXG4gICAgICAgICAgICAkLmVhY2godGhpcy5tb2RhbC4kbW9kYWxJbnB1dHMsIChpLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGhpbnQ7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAkKGl0ZW0pLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSAkKGl0ZW0pLmRhdGEoJ25hbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgaGludCA9ICQoaXRlbSkuZGF0YSgnaGludCcpO1xuICAgICAgICAgICAgICAgICAgICAkKGBbbmFtZT0nJHtuYW1lfSddYCkudmFsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kcmVzdWx0Q29udGFpbmVyLmFwcGVuZCgkKGA8Y29kZT48c3BhbiBjbGFzcz0naW5wdXQtaGludCc+JHtoaW50fTo8L3NwYW4+ICR7dmFsdWV9PC9jb2RlPmApKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuYW1lID0gJChpdGVtKS5kYXRhKCduYW1lJyk7XG4gICAgICAgICAgICAgICAgICAgIGhpbnQgPSAkKGl0ZW0pLmRhdGEoJ2hpbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgKGBbbmFtZT0nJHtuYW1lfSddYCkudmFsKCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy4kcmVzdWx0V3JhcHBlci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxufSk7XG5cbkdhcm5pc2guJGRvYy5yZWFkeSgoKSA9PiAkKCcub3B0aW9uLWl0ZW0nKS5lYWNoKChpLCBlbCkgPT4gbmV3IE9wdGlvbihlbCkpKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvb3B0aW9uLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==