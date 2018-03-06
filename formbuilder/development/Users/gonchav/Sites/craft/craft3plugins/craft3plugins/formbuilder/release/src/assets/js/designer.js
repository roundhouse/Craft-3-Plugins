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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports) {

var LD = void 0;

LD = {
    setup: function setup() {}
};

LD = new (Garnish.Base.extend({
    layoutId: null,
    formId: null,
    $settingsBtn: null,

    init: function init() {
        this.layoutId = null;
        this.layoutId = null;
        this.$settingsBtn = $('.fields-settings');

        this.addListener(this.$settingsBtn, 'click', 'showFieldsSettings');
    },
    setup: function setup() {},
    showFieldsSettings: function showFieldsSettings() {
        var self = void 0;
        self = this;

        modal = new FieldSettingsModal();
        modal.on('setFieldsSettings', function (e) {
            return self.setFormData(e);
        });
        modal.show();
    },
    setFormData: function setFormData(data) {
        var self = void 0;
        var $container = void 0;
        var $field = void 0;
        var name = void 0;
        self = this;

        $container = $('#fieldlayoutsettings');
        name = 'settings[fields][global]';

        $container.html('');

        if (Object.keys(data.options).length === 0) {
            $('.fields-settings').removeClass('has-values');
        } else {
            $('.fields-settings').addClass('has-values');

            $.each(data.options, function (key, item) {
                if ($container.find('input[name="' + name + '[' + key + ']"]').length > 0) {
                    if (item) {
                        $container.find('input[name="' + name + '[' + key + ']"]').val(item);
                    } else {
                        $container.find('input[name="' + name + '[' + key + ']"]').remove();
                    }
                } else {
                    if (item) {
                        $('<input type="hidden" name="' + name + '[' + key + ']">').val(item).appendTo($container);
                    }
                }
            });
        }
    },
    getLayoutId: function getLayoutId() {
        return this.layoutId;
    },
    getFormId: function getFormId() {
        return this.formId;
    }
}))();

FieldSettingsModal = Garnish.Modal.extend({
    $formClass: null,
    $formId: null,
    $inputClass: null,
    $inputTemplate: null,
    $formContainer: null,

    timeout: null,

    init: function init() {
        var body = void 0;
        this.base();

        this.$formContainer = $('<form class="modal fitted formbuilder-modal has-sidebar">').appendTo(Garnish.$bod);
        this.setContainer(this.$formContainer);

        body = $(['<section class="modal-container">', '<div class="modal-sidebar">', '<nav>', '<a href="#" class="modal-nav active" data-target="modal-content-styles"><i class="far fa-clipboard-list"></i> <span class="link-text">Styles</span></a>', '<a href="#" class="modal-nav" data-target="modal-content-settings"><i class="far fa-window-alt"></i> <span class="link-text">Settings</span></a>', '</nav>', '</div>', '<div class="modal-content-container">', '<div class="modal-content modal-content-styles active">', '<header>', '<span class="modal-title">', 'Form Attributes', '</span>', '<div class="instructions">', 'Global form attributes', '</div>', '</header>', '<div class="body">', '<div class="fb-field">', '<div class="input-hint">', 'CLASS', '</div>', '<input type="text" class="text fullwidth global-form-class">', '</div>', '<div class="fb-field">', '<div class="input-hint">', 'ID', '</div>', '<input type="text" class="text fullwidth global-form-id">', '</div>', '</div>', '</div>', '<div class="modal-content modal-content-settings">', '<header>', '<span class="modal-title">', 'Input Settings', '</span>', '<div class="instructions">', 'Global input settings', '</div>', '</header>', '<div class="body">', '<div class="fb-field">', '<div class="input-hint">', 'CLASS', '</div>', '<input type="text" class="text fullwidth global-input-class">', '</div>', '<div class="fb-field has-spinner">', '<div class="spinner hidden"></div>', '<div class="input-hint">', 'TEMPLATES', '</div>', '<input type="text" class="text fullwidth global-input-template">', '</div>', '</div>', '</div>', '</div>', '</section>', '<footer class="footer">', '<div class="buttons">', '<input type="button" class="btns btn-modal cancel" value="' + Craft.t('form-builder', 'Cancel') + '">', '<input type="submit" class="btns btn-modal submit" value="' + Craft.t('form-builder', 'Save') + '">', '</div>', '</footer>'].join('')).appendTo(this.$formContainer);

        this.$formClass = body.find('.global-form-class');
        this.$formId = body.find('.global-form-id');
        this.$inputClass = body.find('.global-input-class');
        this.$inputTemplate = body.find('.global-input-template');

        this.$navLink = body.find('.modal-nav');
        this.$cancelBtn = body.find('.cancel');

        this.loadModalValues();

        this.addListener(this.$cancelBtn, 'click', 'hide');
        this.addListener(this.$navLink, 'click', 'toggleModalContent');
        this.addListener(this.$inputTemplate, 'keyup', 'checkTemplatePath');
        this.addListener(this.$formContainer, 'submit', 'onFormSubmit');
    },
    checkTemplatePath: function checkTemplatePath() {
        var _this = this;

        var $container = void 0;
        var $hint = void 0;

        $container = this.$inputTemplate.parent();
        $spinner = $container.find('.spinner');
        $hint = $container.find('.input-hint');

        data = {
            path: this.$inputTemplate.val()
        };

        $spinner.removeClass('hidden');

        clearTimeout(this.timeout);

        this.timeout = setTimeout(function () {
            $spinner.addClass('hidden');

            Craft.postActionRequest('form-builder/forms/check-input-template-path', data, $.proxy(function (response, textStatus) {
                if (response.valid) {
                    $hint.removeClass('error');
                    $hint.addClass('success');
                } else {
                    $hint.removeClass('success');
                    $hint.addClass('error');
                }
            }, _this));
        }, 1000);
    },
    loadModalValues: function loadModalValues() {
        $formClass = $('input[name="settings[fields][global][formClass]"]').val();
        $formId = $('input[name="settings[fields][global][formId]"]').val();
        $inputClass = $('input[name="settings[fields][global][inputClass]"]').val();
        $inputTemplate = $('input[name="settings[fields][global][inputTemplate]"]').val();

        if ($formClass) {
            this.$formContainer.find('.global-form-class').val($formClass);
        }

        if ($formId) {
            this.$formContainer.find('.global-form-id').val($formId);
        }

        if ($inputClass) {
            this.$formContainer.find('.global-input-class').val($inputClass);
        }

        if ($inputTemplate) {
            this.$formContainer.find('.global-input-template').val($inputTemplate);
        }
    },
    toggleModalContent: function toggleModalContent(e) {
        var _this2 = this;

        e.preventDefault();
        var target = void 0;
        var link = void 0;
        var height = void 0;

        link = $(e.currentTarget);
        target = link.data('target');
        height = $('.' + target).height() + 53;

        $('.modal-nav').removeClass('active');
        $('.modal-content').removeClass('active');

        link.addClass('active');
        $('.' + target).addClass('active');

        this.$container.velocity('stop');
        this.$container.velocity({ height: height }, 'fast', function () {
            _this2.$container.css({
                height: height,
                minHeight: 'auto'
            });
        });
    },
    onFormSubmit: function onFormSubmit(e) {
        var options = void 0;
        options = {};

        e.preventDefault();

        if (!this.visible) {
            return;
        }

        if (this.$formClass.val()) {
            options.formClass = this.$formClass.val();
        }

        if (this.$formId.val()) {
            options.formId = this.$formId.val();
        }

        if (this.$inputClass.val()) {
            options.inputClass = this.$inputClass.val();
        }

        if (this.$inputTemplate.val()) {
            options.inputTemplate = this.$inputTemplate.val();
        }

        this.trigger('setFieldsSettings', { options: options });
        this.hide();
    },
    onFadeOut: function onFadeOut() {
        this.base();
        this.destroy();
    },
    destroy: function destroy() {
        this.base();
        this.$container.remove();
        this.$shade.remove();
    },
    show: function show(options) {
        // let self
        // let values
        // self = this

        // if (options.length > 0) {
        //     values = JSON.parse(options[this.field.id])

        //     $.each(values, (key, value) => {
        //         if (key == 'class' && value) {
        //             self.$classInput.val(value)
        //         }

        //         if (key == 'id' && value) {
        //             self.$idInput.val(value)
        //         }
        //     })

        //     if (!Garnish.isMobileBrowser()) {
        //         setTimeout($.proxy((function() {
        //             this.$classInput.focus()
        //         })))
        //     }
        // }

        this.base();
    }
});

window.LD = LD;

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNThiMTRmNTEwZjNmNzVlZmFiNGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Rlc2lnbmVyLmpzIl0sIm5hbWVzIjpbIkxEIiwic2V0dXAiLCJHYXJuaXNoIiwiQmFzZSIsImV4dGVuZCIsImxheW91dElkIiwiZm9ybUlkIiwiJHNldHRpbmdzQnRuIiwiaW5pdCIsIiQiLCJhZGRMaXN0ZW5lciIsInNob3dGaWVsZHNTZXR0aW5ncyIsInNlbGYiLCJtb2RhbCIsIkZpZWxkU2V0dGluZ3NNb2RhbCIsIm9uIiwic2V0Rm9ybURhdGEiLCJlIiwic2hvdyIsImRhdGEiLCIkY29udGFpbmVyIiwiJGZpZWxkIiwibmFtZSIsImh0bWwiLCJPYmplY3QiLCJrZXlzIiwib3B0aW9ucyIsImxlbmd0aCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJlYWNoIiwia2V5IiwiaXRlbSIsImZpbmQiLCJ2YWwiLCJyZW1vdmUiLCJhcHBlbmRUbyIsImdldExheW91dElkIiwiZ2V0Rm9ybUlkIiwiTW9kYWwiLCIkZm9ybUNsYXNzIiwiJGZvcm1JZCIsIiRpbnB1dENsYXNzIiwiJGlucHV0VGVtcGxhdGUiLCIkZm9ybUNvbnRhaW5lciIsInRpbWVvdXQiLCJib2R5IiwiYmFzZSIsIiRib2QiLCJzZXRDb250YWluZXIiLCJDcmFmdCIsInQiLCJqb2luIiwiJG5hdkxpbmsiLCIkY2FuY2VsQnRuIiwibG9hZE1vZGFsVmFsdWVzIiwiY2hlY2tUZW1wbGF0ZVBhdGgiLCIkaGludCIsInBhcmVudCIsIiRzcGlubmVyIiwicGF0aCIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJwb3N0QWN0aW9uUmVxdWVzdCIsInByb3h5IiwicmVzcG9uc2UiLCJ0ZXh0U3RhdHVzIiwidmFsaWQiLCJ0b2dnbGVNb2RhbENvbnRlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImxpbmsiLCJoZWlnaHQiLCJjdXJyZW50VGFyZ2V0IiwidmVsb2NpdHkiLCJjc3MiLCJtaW5IZWlnaHQiLCJvbkZvcm1TdWJtaXQiLCJ2aXNpYmxlIiwiZm9ybUNsYXNzIiwiaW5wdXRDbGFzcyIsImlucHV0VGVtcGxhdGUiLCJ0cmlnZ2VyIiwiaGlkZSIsIm9uRmFkZU91dCIsImRlc3Ryb3kiLCIkc2hhZGUiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3REEsSUFBSUEsV0FBSjs7QUFFQUEsS0FBSztBQUNEQyxTQURDLG1CQUNPLENBQUU7QUFEVCxDQUFMOztBQUlBRCxLQUFLLEtBQUtFLFFBQVFDLElBQVIsQ0FBYUMsTUFBYixDQUFvQjtBQUMxQkMsY0FBVSxJQURnQjtBQUUxQkMsWUFBUSxJQUZrQjtBQUcxQkMsa0JBQWMsSUFIWTs7QUFLMUJDLFFBTDBCLGtCQUtuQjtBQUNILGFBQUtILFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxhQUFLQSxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBS0UsWUFBTCxHQUFvQkUsRUFBRSxrQkFBRixDQUFwQjs7QUFFQSxhQUFLQyxXQUFMLENBQWlCLEtBQUtILFlBQXRCLEVBQW9DLE9BQXBDLEVBQTZDLG9CQUE3QztBQUNILEtBWHlCO0FBYTFCTixTQWIwQixtQkFhbEIsQ0FDUCxDQWR5QjtBQWdCMUJVLHNCQWhCMEIsZ0NBZ0JMO0FBQ2pCLFlBQUlDLGFBQUo7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QUFMLENBQWlCUixHQUFqQixFQUFyQjtBQUNIOztBQUVELFlBQUksS0FBS1MsY0FBTCxDQUFvQlQsR0FBcEIsRUFBSixFQUErQjtBQUMzQlIsb0JBQVF1RCxhQUFSLEdBQXdCLEtBQUt0QyxjQUFMLENBQW9CVCxHQUFwQixFQUF4QjtBQUNIOztBQUVELGFBQUtnRCxPQUFMLENBQWEsbUJBQWIsRUFBa0MsRUFBRXhELFNBQVNBLE9BQVgsRUFBbEM7QUFDQSxhQUFLeUQsSUFBTDtBQUNILEtBeE1xQztBQTBNdENDLGFBMU1zQyx1QkEwTTFCO0FBQ1IsYUFBS3JDLElBQUw7QUFDQSxhQUFLc0MsT0FBTDtBQUNILEtBN01xQztBQStNdENBLFdBL01zQyxxQkErTTVCO0FBQ04sYUFBS3RDLElBQUw7QUFDQSxhQUFLM0IsVUFBTCxDQUFnQmUsTUFBaEI7QUFDQSxhQUFLbUQsTUFBTCxDQUFZbkQsTUFBWjtBQUNILEtBbk5xQztBQXFOdENqQixRQXJOc0MsZ0JBcU5qQ1EsT0FyTmlDLEVBcU54QjtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFLcUIsSUFBTDtBQUNIO0FBL09xQyxDQUFyQixDQUFyQjs7QUFtUEF3QyxPQUFPdkYsRUFBUCxHQUFZQSxFQUFaLEMiLCJmaWxlIjoiL1VzZXJzL2dvbmNoYXYvU2l0ZXMvY3JhZnQvY3JhZnQzcGx1Z2lucy9jcmFmdDNwbHVnaW5zL2Zvcm1idWlsZGVyL3JlbGVhc2Uvc3JjL2Fzc2V0cy9qcy9kZXNpZ25lci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU4YjE0ZjUxMGYzZjc1ZWZhYjRkIiwibGV0IExEXG5cbkxEID0ge1xuICAgIHNldHVwKCkge31cbn1cblxuTEQgPSBuZXcgKEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgIGxheW91dElkOiBudWxsLFxuICAgIGZvcm1JZDogbnVsbCxcbiAgICAkc2V0dGluZ3NCdG46IG51bGwsXG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmxheW91dElkID0gbnVsbFxuICAgICAgICB0aGlzLmxheW91dElkID0gbnVsbFxuICAgICAgICB0aGlzLiRzZXR0aW5nc0J0biA9ICQoJy5maWVsZHMtc2V0dGluZ3MnKVxuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kc2V0dGluZ3NCdG4sICdjbGljaycsICdzaG93RmllbGRzU2V0dGluZ3MnKVxuICAgIH0sXG5cbiAgICBzZXR1cCgpIHtcbiAgICB9LFxuXG4gICAgc2hvd0ZpZWxkc1NldHRpbmdzKCkge1xuICAgICAgICBsZXQgc2VsZlxuICAgICAgICBzZWxmID0gdGhpc1xuXG4gICAgICAgIG1vZGFsID0gbmV3IEZpZWxkU2V0dGluZ3NNb2RhbCgpXG4gICAgICAgIG1vZGFsLm9uKCdzZXRGaWVsZHNTZXR0aW5ncycsIGUgPT4gc2VsZi5zZXRGb3JtRGF0YShlKSlcbiAgICAgICAgbW9kYWwuc2hvdygpXG4gICAgfSxcblxuICAgIHNldEZvcm1EYXRhKGRhdGEpIHtcbiAgICAgICAgbGV0IHNlbGZcbiAgICAgICAgbGV0ICRjb250YWluZXJcbiAgICAgICAgbGV0ICRmaWVsZFxuICAgICAgICBsZXQgbmFtZVxuICAgICAgICBzZWxmID0gdGhpc1xuXG4gICAgICAgICRjb250YWluZXIgPSAkKCcjZmllbGRsYXlvdXRzZXR0aW5ncycpXG4gICAgICAgIG5hbWUgPSAnc2V0dGluZ3NbZmllbGRzXVtnbG9iYWxdJ1xuXG4gICAgICAgICRjb250YWluZXIuaHRtbCgnJylcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZGF0YS5vcHRpb25zKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICQoJy5maWVsZHMtc2V0dGluZ3MnKS5yZW1vdmVDbGFzcygnaGFzLXZhbHVlcycpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuZmllbGRzLXNldHRpbmdzJykuYWRkQ2xhc3MoJ2hhcy12YWx1ZXMnKVxuXG4gICAgICAgICAgICAkLmVhY2goZGF0YS5vcHRpb25zLCAoa2V5LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCRjb250YWluZXIuZmluZChgaW5wdXRbbmFtZT1cIiR7bmFtZX1bJHtrZXl9XVwiXWApLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb250YWluZXIuZmluZChgaW5wdXRbbmFtZT1cIiR7bmFtZX1bJHtrZXl9XVwiXWApLnZhbChpdGVtKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNvbnRhaW5lci5maW5kKGBpbnB1dFtuYW1lPVwiJHtuYW1lfVske2tleX1dXCJdYCkucmVtb3ZlKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKGA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCIke25hbWV9WyR7a2V5fV1cIj5gKS52YWwoaXRlbSkuYXBwZW5kVG8oJGNvbnRhaW5lcilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0TGF5b3V0SWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxheW91dElkXG4gICAgfSxcblxuICAgIGdldEZvcm1JZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybUlkXG4gICAgfVxufSkpXG5cbkZpZWxkU2V0dGluZ3NNb2RhbCA9IEdhcm5pc2guTW9kYWwuZXh0ZW5kKHtcbiAgICAkZm9ybUNsYXNzOiBudWxsLFxuICAgICRmb3JtSWQ6IG51bGwsXG4gICAgJGlucHV0Q2xhc3M6IG51bGwsXG4gICAgJGlucHV0VGVtcGxhdGU6IG51bGwsXG4gICAgJGZvcm1Db250YWluZXI6IG51bGwsXG5cbiAgICB0aW1lb3V0OiBudWxsLFxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgbGV0IGJvZHlcbiAgICAgICAgdGhpcy5iYXNlKClcblxuICAgICAgICB0aGlzLiRmb3JtQ29udGFpbmVyID0gJCgnPGZvcm0gY2xhc3M9XCJtb2RhbCBmaXR0ZWQgZm9ybWJ1aWxkZXItbW9kYWwgaGFzLXNpZGViYXJcIj4nKS5hcHBlbmRUbyhHYXJuaXNoLiRib2QpXG4gICAgICAgIHRoaXMuc2V0Q29udGFpbmVyKHRoaXMuJGZvcm1Db250YWluZXIpXG5cbiAgICAgICAgYm9keSA9ICQoW1xuICAgICAgICAgICAgJzxzZWN0aW9uIGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCI+JyxcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLXNpZGViYXJcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzxuYXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm1vZGFsLW5hdiBhY3RpdmVcIiBkYXRhLXRhcmdldD1cIm1vZGFsLWNvbnRlbnQtc3R5bGVzXCI+PGkgY2xhc3M9XCJmYXIgZmEtY2xpcGJvYXJkLWxpc3RcIj48L2k+IDxzcGFuIGNsYXNzPVwibGluay10ZXh0XCI+U3R5bGVzPC9zcGFuPjwvYT4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YSBocmVmPVwiI1wiIGNsYXNzPVwibW9kYWwtbmF2XCIgZGF0YS10YXJnZXQ9XCJtb2RhbC1jb250ZW50LXNldHRpbmdzXCI+PGkgY2xhc3M9XCJmYXIgZmEtd2luZG93LWFsdFwiPjwvaT4gPHNwYW4gY2xhc3M9XCJsaW5rLXRleHRcIj5TZXR0aW5nczwvc3Bhbj48L2E+JywgXG4gICAgICAgICAgICAgICAgICAgICc8L25hdj4nLCBcbiAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50LWNvbnRhaW5lclwiPicsIFxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnQgbW9kYWwtY29udGVudC1zdHlsZXMgYWN0aXZlXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGhlYWRlcj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtb2RhbC10aXRsZVwiPicsICdGb3JtIEF0dHJpYnV0ZXMnLCAnPC9zcGFuPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5zdHJ1Y3Rpb25zXCI+JywgJ0dsb2JhbCBmb3JtIGF0dHJpYnV0ZXMnLCAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9oZWFkZXI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJvZHlcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZiLWZpZWxkXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtaGludFwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NMQVNTJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dCBmdWxsd2lkdGggZ2xvYmFsLWZvcm0tY2xhc3NcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmYi1maWVsZFwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImlucHV0LWhpbnRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdJRCcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInRleHQgZnVsbHdpZHRoIGdsb2JhbC1mb3JtLWlkXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50IG1vZGFsLWNvbnRlbnQtc2V0dGluZ3NcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8aGVhZGVyPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+JywgJ0lucHV0IFNldHRpbmdzJywgJzwvc3Bhbj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImluc3RydWN0aW9uc1wiPicsICdHbG9iYWwgaW5wdXQgc2V0dGluZ3MnLCAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9oZWFkZXI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJvZHlcIj4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmItZmllbGRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQ0xBU1MnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0ZXh0IGZ1bGx3aWR0aCBnbG9iYWwtaW5wdXQtY2xhc3NcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmYi1maWVsZCBoYXMtc3Bpbm5lclwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNwaW5uZXIgaGlkZGVuXCI+PC9kaXY+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVEVNUExBVEVTJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dCBmdWxsd2lkdGggZ2xvYmFsLWlucHV0LXRlbXBsYXRlXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgICAgICc8L3NlY3Rpb24+JyxcbiAgICAgICAgICAgICc8Zm9vdGVyIGNsYXNzPVwiZm9vdGVyXCI+JywgXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJidXR0b25zXCI+JywgXG4gICAgICAgICAgICAgICAgICAgIGA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRucyBidG4tbW9kYWwgY2FuY2VsXCIgdmFsdWU9XCIke0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdDYW5jZWwnKX1cIj5gLCBcbiAgICAgICAgICAgICAgICAgICAgYDxpbnB1dCB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG5zIGJ0bi1tb2RhbCBzdWJtaXRcIiB2YWx1ZT1cIiR7Q3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ1NhdmUnKX1cIj5gLCBcbiAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAnPC9mb290ZXI+J1xuICAgICAgICBdLmpvaW4oJycpKS5hcHBlbmRUbyh0aGlzLiRmb3JtQ29udGFpbmVyKTtcblxuXG4gICAgICAgIHRoaXMuJGZvcm1DbGFzcyA9IGJvZHkuZmluZCgnLmdsb2JhbC1mb3JtLWNsYXNzJylcbiAgICAgICAgdGhpcy4kZm9ybUlkID0gYm9keS5maW5kKCcuZ2xvYmFsLWZvcm0taWQnKVxuICAgICAgICB0aGlzLiRpbnB1dENsYXNzID0gYm9keS5maW5kKCcuZ2xvYmFsLWlucHV0LWNsYXNzJylcbiAgICAgICAgdGhpcy4kaW5wdXRUZW1wbGF0ZSA9IGJvZHkuZmluZCgnLmdsb2JhbC1pbnB1dC10ZW1wbGF0ZScpXG5cbiAgICAgICAgdGhpcy4kbmF2TGluayA9IGJvZHkuZmluZCgnLm1vZGFsLW5hdicpXG4gICAgICAgIHRoaXMuJGNhbmNlbEJ0biA9IGJvZHkuZmluZCgnLmNhbmNlbCcpXG5cbiAgICAgICAgdGhpcy5sb2FkTW9kYWxWYWx1ZXMoKVxuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kY2FuY2VsQnRuLCAnY2xpY2snLCAnaGlkZScpXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kbmF2TGluaywgJ2NsaWNrJywgJ3RvZ2dsZU1vZGFsQ29udGVudCcpXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kaW5wdXRUZW1wbGF0ZSwgJ2tleXVwJywgJ2NoZWNrVGVtcGxhdGVQYXRoJylcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRmb3JtQ29udGFpbmVyLCAnc3VibWl0JywgJ29uRm9ybVN1Ym1pdCcpXG4gICAgfSxcblxuICAgIGNoZWNrVGVtcGxhdGVQYXRoKCkge1xuICAgICAgICBsZXQgJGNvbnRhaW5lclxuICAgICAgICBsZXQgJGhpbnRcblxuICAgICAgICAkY29udGFpbmVyID0gdGhpcy4kaW5wdXRUZW1wbGF0ZS5wYXJlbnQoKVxuICAgICAgICAkc3Bpbm5lciA9ICRjb250YWluZXIuZmluZCgnLnNwaW5uZXInKVxuICAgICAgICAkaGludCA9ICRjb250YWluZXIuZmluZCgnLmlucHV0LWhpbnQnKVxuXG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBwYXRoOiB0aGlzLiRpbnB1dFRlbXBsYXRlLnZhbCgpXG4gICAgICAgIH1cblxuICAgICAgICAkc3Bpbm5lci5yZW1vdmVDbGFzcygnaGlkZGVuJylcblxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KVxuXG4gICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJHNwaW5uZXIuYWRkQ2xhc3MoJ2hpZGRlbicpXG5cbiAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZm9ybXMvY2hlY2staW5wdXQtdGVtcGxhdGUtcGF0aCcsIGRhdGEsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS52YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAkaGludC5yZW1vdmVDbGFzcygnZXJyb3InKVxuICAgICAgICAgICAgICAgICAgICAkaGludC5hZGRDbGFzcygnc3VjY2VzcycpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGhpbnQucmVtb3ZlQ2xhc3MoJ3N1Y2Nlc3MnKVxuICAgICAgICAgICAgICAgICAgICAkaGludC5hZGRDbGFzcygnZXJyb3InKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLCB0aGlzKSlcbiAgICAgICAgfSwgMTAwMClcbiAgICB9LFxuXG4gICAgbG9hZE1vZGFsVmFsdWVzKCkge1xuICAgICAgICAkZm9ybUNsYXNzID0gJCgnaW5wdXRbbmFtZT1cInNldHRpbmdzW2ZpZWxkc11bZ2xvYmFsXVtmb3JtQ2xhc3NdXCJdJykudmFsKClcbiAgICAgICAgJGZvcm1JZCA9ICQoJ2lucHV0W25hbWU9XCJzZXR0aW5nc1tmaWVsZHNdW2dsb2JhbF1bZm9ybUlkXVwiXScpLnZhbCgpXG4gICAgICAgICRpbnB1dENsYXNzID0gJCgnaW5wdXRbbmFtZT1cInNldHRpbmdzW2ZpZWxkc11bZ2xvYmFsXVtpbnB1dENsYXNzXVwiXScpLnZhbCgpXG4gICAgICAgICRpbnB1dFRlbXBsYXRlID0gJCgnaW5wdXRbbmFtZT1cInNldHRpbmdzW2ZpZWxkc11bZ2xvYmFsXVtpbnB1dFRlbXBsYXRlXVwiXScpLnZhbCgpXG5cbiAgICAgICAgaWYgKCRmb3JtQ2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMuJGZvcm1Db250YWluZXIuZmluZCgnLmdsb2JhbC1mb3JtLWNsYXNzJykudmFsKCRmb3JtQ2xhc3MpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJGZvcm1JZCkge1xuICAgICAgICAgICAgdGhpcy4kZm9ybUNvbnRhaW5lci5maW5kKCcuZ2xvYmFsLWZvcm0taWQnKS52YWwoJGZvcm1JZClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkaW5wdXRDbGFzcykge1xuICAgICAgICAgICAgdGhpcy4kZm9ybUNvbnRhaW5lci5maW5kKCcuZ2xvYmFsLWlucHV0LWNsYXNzJykudmFsKCRpbnB1dENsYXNzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRpbnB1dFRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0aGlzLiRmb3JtQ29udGFpbmVyLmZpbmQoJy5nbG9iYWwtaW5wdXQtdGVtcGxhdGUnKS52YWwoJGlucHV0VGVtcGxhdGUpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9nZ2xlTW9kYWxDb250ZW50KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGxldCB0YXJnZXRcbiAgICAgICAgbGV0IGxpbmtcbiAgICAgICAgbGV0IGhlaWdodFxuXG4gICAgICAgIGxpbmsgPSAkKGUuY3VycmVudFRhcmdldClcbiAgICAgICAgdGFyZ2V0ID0gbGluay5kYXRhKCd0YXJnZXQnKVxuICAgICAgICBoZWlnaHQgPSAkKCcuJyt0YXJnZXQpLmhlaWdodCgpICsgNTNcblxuICAgICAgICAkKCcubW9kYWwtbmF2JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICQoJy5tb2RhbC1jb250ZW50JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAgICAgbGluay5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgJCgnLicrdGFyZ2V0KS5hZGRDbGFzcygnYWN0aXZlJylcblxuICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoJ3N0b3AnKVxuICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoe2hlaWdodDogaGVpZ2h0fSwgJ2Zhc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIuY3NzKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6ICdhdXRvJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgb25Gb3JtU3VibWl0KGUpIHtcbiAgICAgICAgbGV0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9ucyA9IHt9XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuJGZvcm1DbGFzcy52YWwoKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5mb3JtQ2xhc3MgPSB0aGlzLiRmb3JtQ2xhc3MudmFsKClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLiRmb3JtSWQudmFsKCkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuZm9ybUlkID0gdGhpcy4kZm9ybUlkLnZhbCgpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kaW5wdXRDbGFzcy52YWwoKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5pbnB1dENsYXNzID0gdGhpcy4kaW5wdXRDbGFzcy52YWwoKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuJGlucHV0VGVtcGxhdGUudmFsKCkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuaW5wdXRUZW1wbGF0ZSA9IHRoaXMuJGlucHV0VGVtcGxhdGUudmFsKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcignc2V0RmllbGRzU2V0dGluZ3MnLCB7IG9wdGlvbnM6IG9wdGlvbnMgfSlcbiAgICAgICAgdGhpcy5oaWRlKClcbiAgICB9LFxuXG4gICAgb25GYWRlT3V0KCkge1xuICAgICAgICB0aGlzLmJhc2UoKVxuICAgICAgICB0aGlzLmRlc3Ryb3koKVxuICAgIH0sXG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmJhc2UoKVxuICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlKClcbiAgICAgICAgdGhpcy4kc2hhZGUucmVtb3ZlKClcbiAgICB9LFxuXG4gICAgc2hvdyhvcHRpb25zKSB7XG4gICAgICAgIC8vIGxldCBzZWxmXG4gICAgICAgIC8vIGxldCB2YWx1ZXNcbiAgICAgICAgLy8gc2VsZiA9IHRoaXNcblxuICAgICAgICAvLyBpZiAob3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vICAgICB2YWx1ZXMgPSBKU09OLnBhcnNlKG9wdGlvbnNbdGhpcy5maWVsZC5pZF0pXG5cbiAgICAgICAgLy8gICAgICQuZWFjaCh2YWx1ZXMsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKGtleSA9PSAnY2xhc3MnICYmIHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHNlbGYuJGNsYXNzSW5wdXQudmFsKHZhbHVlKVxuICAgICAgICAvLyAgICAgICAgIH1cblxuICAgICAgICAvLyAgICAgICAgIGlmIChrZXkgPT0gJ2lkJyAmJiB2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgICAgICBzZWxmLiRpZElucHV0LnZhbCh2YWx1ZSlcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9KVxuXG4gICAgICAgIC8vICAgICBpZiAoIUdhcm5pc2guaXNNb2JpbGVCcm93c2VyKCkpIHtcbiAgICAgICAgLy8gICAgICAgICBzZXRUaW1lb3V0KCQucHJveHkoKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLiRjbGFzc0lucHV0LmZvY3VzKClcbiAgICAgICAgLy8gICAgICAgICB9KSkpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYmFzZSgpXG4gICAgfVxuXG59KVxuXG53aW5kb3cuTEQgPSBMRFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9kZXNpZ25lci5qcyJdLCJzb3VyY2VSb290IjoiIn0=