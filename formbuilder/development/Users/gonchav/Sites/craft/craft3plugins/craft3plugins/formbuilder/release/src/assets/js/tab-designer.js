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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

var LD_Tabs = void 0;

LD_Tabs = {
    setup: function setup() {}
};

LD_Tabs = new (Garnish.Base.extend({
    tabs: null,
    options: null,

    init: function init() {
        this.tabs = {};
        this.options = {};
    },
    setup: function setup() {
        var self = void 0;
        var FLD = void 0;
        var FLD_tab = void 0;
        var FLD_addTab = void 0;
        var FLD_tabOptions = void 0;
        self = this;

        if (Craft.FieldLayoutDesigner) {
            FLD = Craft.FieldLayoutDesigner;
            FLD_init = FLD.prototype.init;
            FLD_tab = FLD.prototype.initTab;
            FLD_addTab = FLD.prototype.addTab;
            FLD_tabOptions = FLD.prototype.onFieldOptionSelect;

            FLD.prototype.init = function () {
                FLD_init.apply(this, arguments);
                this.tabEditor = new TabEditor(this);
            };

            FLD.prototype.initTab = function ($tab) {
                var $tabEl = void 0;
                var $preview = void 0;
                var $editBtn = void 0;
                var $html = void 0;
                var $menu = void 0;
                var $ul = void 0;
                var tabId = void 0;
                var menu = void 0;
                var menuBtn = void 0;

                FLD_tab.apply(this, arguments);

                tabId = $tab.find('.tab').data('id');

                if (tabId) {
                    $editBtn = $tab.find('.tabs .settings');
                    menuBtn = $editBtn.data('menubtn');
                    menu = menuBtn.menu;
                    $menu = menu.$container;
                    $ul = $menu.children('ul');
                    $html = $('<li><a data-action="taboptions">' + Craft.t('form-builder', 'Options') + '</a></li>').appendTo($ul);
                    console.log();

                    $preview = $(['<div class="field-options-preview">', '</div>'].join('')).appendTo($tab.find('.tabs'));

                    return menu.addOptions($html.children('a'));
                }
            }, FLD.prototype.onTabOptionSelect = function (option) {
                var $tab = void 0;
                var $option = void 0;
                var tabId = void 0;
                var action = void 0;

                FLD_tabOptions.apply(this, arguments);

                $option = $(option);
                $tab = $option.data('menu').$anchor.parent().parent().parent();
                action = $option.data('action');
                tabId = $tab.find('.tab').data('id');

                switch (action) {
                    case 'rename':
                        {
                            this.renameTab($tab);
                            this.trigger('tabRenamed', {
                                tabId: tabId
                            });
                            break;
                        }
                    case 'delete':
                        {
                            this.deleteTab($tab);
                            break;
                        }
                    case 'taboptions':
                        this.trigger('tabOptionsSelected', {
                            target: $option[0],
                            $target: $option,
                            $tab: $tab,
                            fld: this,
                            tabId: tabId
                        });
                        break;
                }
            };

            FLD.prototype.addTab = function () {
                return self.addTab(this);
            };
        }
    },
    addTab: function addTab(e) {
        if (!e.settings.customizableTabs) {
            return;
        }

        var $tab = $('<div class="fld-tab">' + '<div class="tabs">' + '<div class="tab sel draggable">' + '<span>Fieldset</span>' + '<a class="settings icon" title="' + Craft.t('app', 'Rename') + '"></a>' + '</div>' + '</div>' + '<div class="fld-tabcontent"></div>' + '</div>').appendTo(e.$tabContainer);

        e.tabGrid.addItems($tab);
        e.tabDrag.addItems($tab);

        e.initTab($tab);
    },
    getOptions: function getOptions(layoutId) {
        var options = void 0;
        options = {};

        $.each(this.options, function (key, item) {
            if (parseInt(item.layoutId) == layoutId) {
                options[item.tabId] = item.options;
            }
        });

        return options;
    }
}))();

TabEditor = Garnish.Base.extend({
    fld: null,
    options: null,
    layoutId: null,
    namespace: 'form-builder',

    init: function init(fld) {
        this.fld = fld;
        this.layoutId = LD.getLayoutId();
        this.options = LD_Tabs.getOptions(this.layoutId);

        this.fld.on('tabOptionsSelected', $.proxy(this.openOptionsModal, this));
        this.fld.on('tabRenamed', $.proxy(this.onTabRenamed, this));

        if (this.layoutId !== false) {
            this.applyOptions(this.layoutId);
        }
    },
    applyOptions: function applyOptions(layoutId) {
        var _this = this;

        var results = void 0;

        if (this.options) {
            results = [];

            $.each(this.options, function (key, value) {
                if (_this.options.hasOwnProperty(key)) {
                    options = JSON.parse(_this.options[key]);
                    results.push(_this.setFormData(key, JSON.parse(value)));
                } else {
                    results.push(void 0);
                }
            });

            return results;
        }
    },
    onTabRenamed: function onTabRenamed(e) {
        $tab = $('.tab-id-' + e.tabId);
        $input = $tab.parent().find('.tab-name-field');
        $labelSpan = $tab.find('span');
        tabName = $labelSpan.text();

        $input.val(tabName);
    },
    openOptionsModal: function openOptionsModal(e) {
        var self = void 0;
        self = this;
        var modal = void 0;
        var tabId = void 0;
        var $tab = e.$tab;
        var $labelSpan = void 0;

        $labelSpan = $tab.find('.tabs .tab span');
        tabName = $labelSpan.text();
        tabId = e.tabId;

        modal = new TabOptionsModal($tab);
        modal.on('setOptions', function (e) {
            return self.setFormData(tabId, e.options, tabName);
        });
        modal.show(this.options);
    },
    setFormData: function setFormData(tabId, options, tabName) {
        var self = void 0;
        var $container = void 0;
        var name = void 0;
        self = this;

        $container = $('[data-id="' + tabId + '"]').parent();
        name = this.namespace + '[tab][' + tabId + '][options]';

        $.each(options, function (key, item) {
            if ($container.children('input[name="' + name + '[' + key + ']"]').length > 0) {
                if (item) {
                    $container.children('input[name="' + name + '[' + key + ']"]').val(item);
                    self.updatePreview(tabId, $container, key, item);
                } else {
                    $container.children('input[name="' + name + '[' + key + ']"]').remove();
                    self.removePreview(tabId, $container, key, item);
                }
            } else {
                if (item) {
                    self.updatePreview(tabId, $container, key, item);
                    $('<input type="hidden" name="' + name + '[' + key + ']">').val(item).appendTo($container);
                }
            }
        });

        $container.find('.tab-name-field').val(tabName);
    },
    updatePreview: function updatePreview(tabId, tab, type, value) {
        target = $('[data-id="' + tabId + '"]').parent();
        body = target.find('.field-options-preview');
        markup = $('<div class="field-' + type + '-preview"><span class="preview-type">' + type + '</span> ' + value + '</div>');
        oldMarkup = body.find('.field-' + type + '-preview');

        if (oldMarkup) {
            oldMarkup.remove();
        }

        markup.appendTo(body);
    },
    removePreview: function removePreview(tabId, tab, type, value) {
        target = $('[data-id="' + tabId + '"]').parent();
        target.find('.field-' + type + '-preview').remove();
    }
});

TabOptionsModal = Garnish.Modal.extend({
    tab: null,
    form: null,
    $formContainer: null,

    init: function init(tab) {
        var body = void 0;
        this.tab = tab;
        this.base();
        this.$formContainer = $('<form class="modal fitted formbuilder-modal">').appendTo(Garnish.$bod);
        this.setContainer(this.$formContainer);
        body = $(['<header>', '<span class="modal-title">', 'Attributes', '</span>', '<div class="instructions">', 'Custom tab attributes', '</div>', '</header>', '<div class="body">', '<div class="fb-field">', '<div class="input-hint">', 'CLASS', '</div>', '<input type="text" class="text fullwidth input-class">', '</div>', '<div class="fb-field">', '<div class="input-hint">', 'ID', '</div>', '<input type="text" class="text fullwidth input-id">', '</div>', '</div>', '<footer class="footer">', '<div class="buttons">', '<input type="button" class="btns btn-modal cancel" value="' + Craft.t('form-builder', 'Cancel') + '">', '<input type="submit" class="btns btn-modal submit" value="' + Craft.t('form-builder', 'Save') + '">', '</div>', '</footer>'].join('')).appendTo(this.$formContainer);

        this.$inputClass = body.find('.input-class');
        this.$inputId = body.find('.input-id');

        this.$cancelBtn = body.find('.cancel');

        this.loadModalValues();

        this.addListener(this.$cancelBtn, 'click', 'hide');
        this.addListener(this.$formContainer, 'submit', 'onFormSubmit');
    },
    loadModalValues: function loadModalValues() {
        tabId = this.tab.find('.tab').data('id');
        $classInput = $('input[name="form-builder[tab][' + tabId + '][options][class]"]').val();
        $idInput = $('input[name="form-builder[tab][' + tabId + '][options][id]"]').val();

        if ($classInput) {
            this.$formContainer.find('.input-class').val($classInput);
        }

        if ($idInput) {
            this.$formContainer.find('.input-id').val($idInput);
        }
    },
    onFormSubmit: function onFormSubmit(e) {
        e.preventDefault();

        if (!this.visible) {
            return;
        }

        this.trigger('setOptions', {
            options: {
                "class": this.$inputClass.val(),
                id: this.$inputId.val()
            }
        });

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
        var self = void 0;
        var values = void 0;

        if (options.length > 0) {
            values = JSON.parse(options[this.tab.name]);
        }

        $.each(values, function (key, value) {
            if (key === 'class' && value) {
                self.$inputClass.val(value);
            }

            if (key === 'id' && value) {
                self.$inputId.val(value);
            }
        });

        if (!Garnish.isMobileBrowser()) {
            setTimeout($.proxy(function () {
                this.$inputClass.focus();
            }, this), 100);
        }

        this.base();
    }
});

window.LD_Tabs = LD_Tabs;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNThiMTRmNTEwZjNmNzVlZmFiNGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RhYi1kZXNpZ25lci5qcyJdLCJuYW1lcyI6WyJMRF9UYWJzIiwic2V0dXAiLCJHYXJuaXNoIiwiQmFzZSIsImV4dGVuZCIsInRhYnMiLCJvcHRpb25zIiwiaW5pdCIsInNlbGYiLCJGTEQiLCJGTERfdGFiIiwiRkxEX2FkZFRhYiIsIkZMRF90YWJPcHRpb25zIiwiQ3JhZnQiLCJGaWVsZExheW91dERlc2lnbmVyIiwiRkxEX2luaXQiLCJwcm90b3R5cGUiLCJpbml0VGFiIiwiYWRkVGFiIiwib25GaWVsZE9wdGlvblNlbGVjdCIsImFwcGx5IiwiYXJndW1lbnRzIiwidGFiRWRpdG9yIiwiVGFiRWRpdG9yIiwiJHRhYiIsIiR0YWJFbCIsIiRwcmV2aWV3IiwiJGVkaXRCdG4iLCIkaHRtbCIsIiRtZW51IiwiJHVsIiwidGFiSWQiLCJtZW51IiwibWVudUJ0biIsImZpbmQiLCJkYXRhIiwiJGNvbnRhaW5lciIsImNoaWxkcmVuIiwiJCIsInQiLCJhcHBlbmRUbyIsImNvbnNvbGUiLCJsb2ciLCJqb2luIiwiYWRkT3B0aW9ucyIsIm9uVGFiT3B0aW9uU2VsZWN0Iiwib3B0aW9uIiwiJG9wdGlvbiIsImFjdGlvbiIsIiRhbmNob3IiLCJwYXJlbnQiLCJyZW5hbWVUYWIiLCJ0cmlnZ2VyIiwiZGVsZXRlVGFiIiwidGFyZ2V0IiwiJHRhcmdldCIsImZsZCIsImUiLCJzZXR0aW5ncyIsImN1c3RvbWl6YWJsZVRhYnMiLCIkdGFiQ29udGFpbmVyIiwidGFiR3JpZCIsImFkZEl0ZW1zIiwidGFiRHJhZyIsImdldE9wdGlvbnMiLCJsYXlvdXRJZCIsImVhY2giLCJrZXkiLCJpdGVtIiwicGFyc2VJbnQiLCJuYW1lc3BhY2UiLCJMRCIsImdldExheW91dElkIiwib24iLCJwcm94eSIsIm9wZW5PcHRpb25zTW9kYWwiLCJvblRhYlJlbmFtZWQiLCJhcHBseU9wdGlvbnMiLCJyZXN1bHRzIiwidmFsdWUiLCJoYXNPd25Qcm9wZXJ0eSIsIkpTT04iLCJwYXJzZSIsInB1c2giLCJzZXRGb3JtRGF0YSIsIiRpbnB1dCIsIiRsYWJlbFNwYW4iLCJ0YWJOYW1lIiwidGV4dCIsInZhbCIsIm1vZGFsIiwiVGFiT3B0aW9uc01vZGFsIiwic2hvdyIsIm5hbWUiLCJsZW5ndGgiLCJ1cGRhdGVQcmV2aWV3IiwicmVtb3ZlIiwicmVtb3ZlUHJldmlldyIsInRhYiIsInR5cGUiLCJib2R5IiwibWFya3VwIiwib2xkTWFya3VwIiwiTW9kYWwiLCJmb3JtIiwiJGZvcm1Db250YWluZXIiLCJiYXNlIiwiJGJvZCIsInNldENvbnRhaW5lciIsIiRpbnB1dENsYXNzIiwiJGlucHV0SWQiLCIkY2FuY2VsQnRuIiwibG9hZE1vZGFsVmFsdWVzIiwiYWRkTGlzdGVuZXIiLCIkY2xhc3NJbnB1dCIsIiRpZElucHV0Iiwib25Gb3JtU3VibWl0IiwicHJldmVudERlZmF1bHQiLCJ2aXNpYmxlIiwiaWQiLCJoaWRlIiwib25GYWRlT3V0IiwiZGVzdHJveSIsIiRzaGFkZSIsInZhbHVlcyIsImlzTW9iaWxlQnJvd3NlciIsInNldFRpbWVvdXQiLCJmb2N1cyIsIndpbmRvdyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7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QUFwQixFQUEyQjtBQUN2QnZFLHFCQUFLc0csUUFBTCxDQUFjckIsR0FBZCxDQUFrQlYsS0FBbEI7QUFDSDtBQUNMLFNBUkQ7O0FBVUMsWUFBSSxDQUFDN0UsUUFBUTJILGVBQVIsRUFBTCxFQUFnQztBQUM1QkMsdUJBQVd4RixFQUFFb0MsS0FBRixDQUFTLFlBQVc7QUFDM0IscUJBQUttQyxXQUFMLENBQWlCa0IsS0FBakI7QUFDSCxhQUZVLEVBRVAsSUFGTyxDQUFYLEVBRVcsR0FGWDtBQUdIOztBQUVELGFBQUtyQixJQUFMO0FBQ0o7QUFwSG1DLENBQXJCLENBQWxCOztBQTBIQXNCLE9BQU9oSSxPQUFQLEdBQWlCQSxPQUFqQixDIiwiZmlsZSI6Ii9Vc2Vycy9nb25jaGF2L1NpdGVzL2NyYWZ0L2NyYWZ0M3BsdWdpbnMvY3JhZnQzcGx1Z2lucy9mb3JtYnVpbGRlci9yZWxlYXNlL3NyYy9hc3NldHMvanMvdGFiLWRlc2lnbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU4YjE0ZjUxMGYzZjc1ZWZhYjRkIiwibGV0IExEX1RhYnNcblxuTERfVGFicyA9IHtcbiAgICBzZXR1cCgpIHt9XG59XG5cbkxEX1RhYnMgPSBuZXcgKEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgIHRhYnM6IG51bGwsXG4gICAgb3B0aW9uczogbnVsbCxcblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMudGFicyA9IHt9XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHt9XG4gICAgfSxcblxuICAgIHNldHVwKCkge1xuICAgICAgICBsZXQgc2VsZlxuICAgICAgICBsZXQgRkxEXG4gICAgICAgIGxldCBGTERfdGFiXG4gICAgICAgIGxldCBGTERfYWRkVGFiXG4gICAgICAgIGxldCBGTERfdGFiT3B0aW9uc1xuICAgICAgICBzZWxmID0gdGhpc1xuXG4gICAgICAgIGlmIChDcmFmdC5GaWVsZExheW91dERlc2lnbmVyKSB7XG4gICAgICAgICAgICBGTEQgPSBDcmFmdC5GaWVsZExheW91dERlc2lnbmVyXG4gICAgICAgICAgICBGTERfaW5pdCA9IEZMRC5wcm90b3R5cGUuaW5pdFxuICAgICAgICAgICAgRkxEX3RhYiA9IEZMRC5wcm90b3R5cGUuaW5pdFRhYlxuICAgICAgICAgICAgRkxEX2FkZFRhYiA9IEZMRC5wcm90b3R5cGUuYWRkVGFiXG4gICAgICAgICAgICBGTERfdGFiT3B0aW9ucyA9IEZMRC5wcm90b3R5cGUub25GaWVsZE9wdGlvblNlbGVjdFxuXG4gICAgICAgICAgICBGTEQucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBGTERfaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgICAgICAgICAgdGhpcy50YWJFZGl0b3IgPSBuZXcgVGFiRWRpdG9yKHRoaXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEZMRC5wcm90b3R5cGUuaW5pdFRhYiA9IGZ1bmN0aW9uKCR0YWIpIHtcbiAgICAgICAgICAgICAgICBsZXQgJHRhYkVsXG4gICAgICAgICAgICAgICAgbGV0ICRwcmV2aWV3XG4gICAgICAgICAgICAgICAgbGV0ICRlZGl0QnRuXG4gICAgICAgICAgICAgICAgbGV0ICRodG1sXG4gICAgICAgICAgICAgICAgbGV0ICRtZW51XG4gICAgICAgICAgICAgICAgbGV0ICR1bFxuICAgICAgICAgICAgICAgIGxldCB0YWJJZFxuICAgICAgICAgICAgICAgIGxldCBtZW51XG4gICAgICAgICAgICAgICAgbGV0IG1lbnVCdG5cblxuICAgICAgICAgICAgICAgIEZMRF90YWIuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuXG4gICAgICAgICAgICAgICAgdGFiSWQgPSAkdGFiLmZpbmQoJy50YWInKS5kYXRhKCdpZCcpXG5cbiAgICAgICAgICAgICAgICBpZiAodGFiSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVkaXRCdG4gPSAkdGFiLmZpbmQoJy50YWJzIC5zZXR0aW5ncycpXG4gICAgICAgICAgICAgICAgICAgIG1lbnVCdG4gPSAkZWRpdEJ0bi5kYXRhKCdtZW51YnRuJylcbiAgICAgICAgICAgICAgICAgICAgbWVudSA9IG1lbnVCdG4ubWVudVxuICAgICAgICAgICAgICAgICAgICAkbWVudSA9IG1lbnUuJGNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICAkdWwgPSAkbWVudS5jaGlsZHJlbigndWwnKVxuICAgICAgICAgICAgICAgICAgICAkaHRtbCA9ICQoJzxsaT48YSBkYXRhLWFjdGlvbj1cInRhYm9wdGlvbnNcIj4nICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ09wdGlvbnMnKSArICc8L2E+PC9saT4nKS5hcHBlbmRUbygkdWwpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKClcblxuICAgICAgICAgICAgICAgICAgICAkcHJldmlldyA9ICQoW1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmaWVsZC1vcHRpb25zLXByZXZpZXdcIj4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PidcbiAgICAgICAgICAgICAgICAgICAgXS5qb2luKCcnKSkuYXBwZW5kVG8oJHRhYi5maW5kKCcudGFicycpKVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtZW51LmFkZE9wdGlvbnMoJGh0bWwuY2hpbGRyZW4oJ2EnKSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIEZMRC5wcm90b3R5cGUub25UYWJPcHRpb25TZWxlY3QgPSBmdW5jdGlvbihvcHRpb24pIHtcbiAgICAgICAgICAgICAgICBsZXQgJHRhYlxuICAgICAgICAgICAgICAgIGxldCAkb3B0aW9uXG4gICAgICAgICAgICAgICAgbGV0IHRhYklkXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvblxuXG4gICAgICAgICAgICAgICAgRkxEX3RhYk9wdGlvbnMuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICRvcHRpb24gPSAkKG9wdGlvbilcbiAgICAgICAgICAgICAgICAkdGFiID0gJG9wdGlvbi5kYXRhKCdtZW51JykuJGFuY2hvci5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKVxuICAgICAgICAgICAgICAgIGFjdGlvbiA9ICRvcHRpb24uZGF0YSgnYWN0aW9uJylcbiAgICAgICAgICAgICAgICB0YWJJZCA9ICR0YWIuZmluZCgnLnRhYicpLmRhdGEoJ2lkJylcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbmFtZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuYW1lVGFiKCR0YWIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd0YWJSZW5hbWVkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYklkOiB0YWJJZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlVGFiKCR0YWIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndGFib3B0aW9ucyc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3RhYk9wdGlvbnNTZWxlY3RlZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6ICRvcHRpb25bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRhcmdldDogJG9wdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGFiOiAkdGFiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJZDogdGFiSWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgRkxELnByb3RvdHlwZS5hZGRUYWIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5hZGRUYWIodGhpcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGFkZFRhYihlKSB7XG4gICAgICAgIGlmICghZS5zZXR0aW5ncy5jdXN0b21pemFibGVUYWJzKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkdGFiID0gJCgnPGRpdiBjbGFzcz1cImZsZC10YWJcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGFic1wiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWIgc2VsIGRyYWdnYWJsZVwiPicgK1xuICAgICAgICAgICAgJzxzcGFuPkZpZWxkc2V0PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxhIGNsYXNzPVwic2V0dGluZ3MgaWNvblwiIHRpdGxlPVwiJyArIENyYWZ0LnQoJ2FwcCcsICdSZW5hbWUnKSArICdcIj48L2E+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZsZC10YWJjb250ZW50XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JykuYXBwZW5kVG8oZS4kdGFiQ29udGFpbmVyKVxuXG4gICAgICAgIGUudGFiR3JpZC5hZGRJdGVtcygkdGFiKVxuICAgICAgICBlLnRhYkRyYWcuYWRkSXRlbXMoJHRhYilcblxuICAgICAgICBlLmluaXRUYWIoJHRhYilcbiAgICB9LFxuXG4gICAgZ2V0T3B0aW9ucyhsYXlvdXRJZCkge1xuICAgICAgICBsZXQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zID0ge31cblxuICAgICAgICAkLmVhY2godGhpcy5vcHRpb25zLCAoa2V5LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQoaXRlbS5sYXlvdXRJZCkgPT0gbGF5b3V0SWQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zW2l0ZW0udGFiSWRdID0gaXRlbS5vcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnNcbiAgICB9XG59KSlcblxuVGFiRWRpdG9yID0gR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgZmxkOiBudWxsLFxuICAgIG9wdGlvbnM6IG51bGwsXG4gICAgbGF5b3V0SWQ6IG51bGwsXG4gICAgbmFtZXNwYWNlOiAnZm9ybS1idWlsZGVyJyxcblxuICAgIGluaXQoZmxkKSB7XG4gICAgICAgIHRoaXMuZmxkID0gZmxkXG4gICAgICAgIHRoaXMubGF5b3V0SWQgPSBMRC5nZXRMYXlvdXRJZCgpXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IExEX1RhYnMuZ2V0T3B0aW9ucyh0aGlzLmxheW91dElkKVxuXG4gICAgICAgIHRoaXMuZmxkLm9uKCd0YWJPcHRpb25zU2VsZWN0ZWQnLCAkLnByb3h5KHRoaXMub3Blbk9wdGlvbnNNb2RhbCwgdGhpcykpXG4gICAgICAgIHRoaXMuZmxkLm9uKCd0YWJSZW5hbWVkJywgJC5wcm94eSh0aGlzLm9uVGFiUmVuYW1lZCwgdGhpcykpXG5cbiAgICAgICAgaWYgKHRoaXMubGF5b3V0SWQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5T3B0aW9ucyh0aGlzLmxheW91dElkKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFwcGx5T3B0aW9ucyhsYXlvdXRJZCkge1xuICAgICAgICBsZXQgcmVzdWx0c1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuXG4gICAgICAgICAgICAkLmVhY2godGhpcy5vcHRpb25zLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gSlNPTi5wYXJzZSh0aGlzLm9wdGlvbnNba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuc2V0Rm9ybURhdGEoa2V5LCBKU09OLnBhcnNlKHZhbHVlKSkpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHZvaWQgMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0c1xuXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25UYWJSZW5hbWVkKGUpIHtcbiAgICAgICAgJHRhYiA9ICQoJy50YWItaWQtJytlLnRhYklkKVxuICAgICAgICAkaW5wdXQgPSAkdGFiLnBhcmVudCgpLmZpbmQoJy50YWItbmFtZS1maWVsZCcpXG4gICAgICAgICRsYWJlbFNwYW4gPSAkdGFiLmZpbmQoJ3NwYW4nKVxuICAgICAgICB0YWJOYW1lID0gJGxhYmVsU3Bhbi50ZXh0KClcblxuICAgICAgICAkaW5wdXQudmFsKHRhYk5hbWUpXG4gICAgfSxcblxuICAgIG9wZW5PcHRpb25zTW9kYWwoZSkge1xuICAgICAgICBsZXQgc2VsZlxuICAgICAgICBzZWxmID0gdGhpc1xuICAgICAgICBsZXQgbW9kYWxcbiAgICAgICAgbGV0IHRhYklkXG4gICAgICAgIGxldCAkdGFiID0gZS4kdGFiXG4gICAgICAgIGxldCAkbGFiZWxTcGFuXG5cbiAgICAgICAgJGxhYmVsU3BhbiA9ICR0YWIuZmluZCgnLnRhYnMgLnRhYiBzcGFuJylcbiAgICAgICAgdGFiTmFtZSA9ICRsYWJlbFNwYW4udGV4dCgpXG4gICAgICAgIHRhYklkID0gZS50YWJJZFxuXG4gICAgICAgIG1vZGFsID0gbmV3IFRhYk9wdGlvbnNNb2RhbCgkdGFiKVxuICAgICAgICBtb2RhbC5vbignc2V0T3B0aW9ucycsIGUgPT4gc2VsZi5zZXRGb3JtRGF0YSh0YWJJZCwgZS5vcHRpb25zLCB0YWJOYW1lKSlcbiAgICAgICAgbW9kYWwuc2hvdyh0aGlzLm9wdGlvbnMpXG4gICAgfSxcblxuICAgIHNldEZvcm1EYXRhKHRhYklkLCBvcHRpb25zLCB0YWJOYW1lKSB7XG4gICAgICAgIGxldCBzZWxmXG4gICAgICAgIGxldCAkY29udGFpbmVyXG4gICAgICAgIGxldCBuYW1lXG4gICAgICAgIHNlbGYgPSB0aGlzXG5cbiAgICAgICAgJGNvbnRhaW5lciA9ICQoJ1tkYXRhLWlkPVwiJyt0YWJJZCsnXCJdJykucGFyZW50KClcbiAgICAgICAgbmFtZSA9IHRoaXMubmFtZXNwYWNlICsgJ1t0YWJdWycgKyB0YWJJZCArICddW29wdGlvbnNdJ1xuXG4gICAgICAgICQuZWFjaChvcHRpb25zLCAoa2V5LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoJGNvbnRhaW5lci5jaGlsZHJlbihgaW5wdXRbbmFtZT1cIiR7bmFtZX1bJHtrZXl9XVwiXWApLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAkY29udGFpbmVyLmNoaWxkcmVuKGBpbnB1dFtuYW1lPVwiJHtuYW1lfVske2tleX1dXCJdYCkudmFsKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUHJldmlldyh0YWJJZCwgJGNvbnRhaW5lciwga2V5LCBpdGVtKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRjb250YWluZXIuY2hpbGRyZW4oYGlucHV0W25hbWU9XCIke25hbWV9WyR7a2V5fV1cIl1gKS5yZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZVByZXZpZXcodGFiSWQsICRjb250YWluZXIsIGtleSwgaXRlbSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUHJldmlldyh0YWJJZCwgJGNvbnRhaW5lciwga2V5LCBpdGVtKVxuICAgICAgICAgICAgICAgICAgICAkKGA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCIke25hbWV9WyR7a2V5fV1cIj5gKS52YWwoaXRlbSkuYXBwZW5kVG8oJGNvbnRhaW5lcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgJGNvbnRhaW5lci5maW5kKCcudGFiLW5hbWUtZmllbGQnKS52YWwodGFiTmFtZSlcbiAgICB9LFxuXG4gICAgdXBkYXRlUHJldmlldyh0YWJJZCwgdGFiLCB0eXBlLCB2YWx1ZSkge1xuICAgICAgICB0YXJnZXQgPSAkKCdbZGF0YS1pZD1cIicrdGFiSWQrJ1wiXScpLnBhcmVudCgpXG4gICAgICAgIGJvZHkgPSB0YXJnZXQuZmluZCgnLmZpZWxkLW9wdGlvbnMtcHJldmlldycpXG4gICAgICAgIG1hcmt1cCA9ICQoJzxkaXYgY2xhc3M9XCJmaWVsZC0nKyB0eXBlICsnLXByZXZpZXdcIj48c3BhbiBjbGFzcz1cInByZXZpZXctdHlwZVwiPicrIHR5cGUgKyc8L3NwYW4+ICcrdmFsdWUrJzwvZGl2PicpXG4gICAgICAgIG9sZE1hcmt1cCA9IGJvZHkuZmluZCgnLmZpZWxkLScrIHR5cGUgKyctcHJldmlldycpXG5cbiAgICAgICAgaWYgKG9sZE1hcmt1cCkge1xuICAgICAgICAgICAgb2xkTWFya3VwLnJlbW92ZSgpXG4gICAgICAgIH1cblxuICAgICAgICBtYXJrdXAuYXBwZW5kVG8oYm9keSlcbiAgICB9LFxuXG4gICAgcmVtb3ZlUHJldmlldyh0YWJJZCwgdGFiLCB0eXBlLCB2YWx1ZSkge1xuICAgICAgICB0YXJnZXQgPSAkKCdbZGF0YS1pZD1cIicrdGFiSWQrJ1wiXScpLnBhcmVudCgpXG4gICAgICAgIHRhcmdldC5maW5kKCcuZmllbGQtJyt0eXBlKyctcHJldmlldycpLnJlbW92ZSgpXG4gICAgfVxuXG59KVxuXG5UYWJPcHRpb25zTW9kYWwgPSBHYXJuaXNoLk1vZGFsLmV4dGVuZCh7XG4gICAgdGFiOiBudWxsLFxuICAgIGZvcm06IG51bGwsXG4gICAgJGZvcm1Db250YWluZXI6IG51bGwsXG5cbiAgICBpbml0KHRhYikge1xuICAgICAgICBsZXQgYm9keVxuICAgICAgICB0aGlzLnRhYiA9IHRhYlxuICAgICAgICB0aGlzLmJhc2UoKVxuICAgICAgICB0aGlzLiRmb3JtQ29udGFpbmVyID0gJCgnPGZvcm0gY2xhc3M9XCJtb2RhbCBmaXR0ZWQgZm9ybWJ1aWxkZXItbW9kYWxcIj4nKS5hcHBlbmRUbyhHYXJuaXNoLiRib2QpXG4gICAgICAgIHRoaXMuc2V0Q29udGFpbmVyKHRoaXMuJGZvcm1Db250YWluZXIpXG4gICAgICAgIGJvZHkgPSAkKFtcbiAgICAgICAgICAgICc8aGVhZGVyPicsIFxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+JywgJ0F0dHJpYnV0ZXMnLCAnPC9zcGFuPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5zdHJ1Y3Rpb25zXCI+JywgJ0N1c3RvbSB0YWIgYXR0cmlidXRlcycsICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICc8L2hlYWRlcj4nLCBcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYm9keVwiPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmItZmllbGRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnQ0xBU1MnLCBcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0ZXh0IGZ1bGx3aWR0aCBpbnB1dC1jbGFzc1wiPicsIFxuICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZiLWZpZWxkXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtaGludFwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0lEJywgXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dCBmdWxsd2lkdGggaW5wdXQtaWRcIj4nLCBcbiAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAnPGZvb3RlciBjbGFzcz1cImZvb3RlclwiPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPicsIFxuICAgICAgICAgICAgICAgICAgICBgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIGNhbmNlbFwiIHZhbHVlPVwiJHtDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnQ2FuY2VsJyl9XCI+YCwgXG4gICAgICAgICAgICAgICAgICAgIGA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRucyBidG4tbW9kYWwgc3VibWl0XCIgdmFsdWU9XCIke0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdTYXZlJyl9XCI+YCwgXG4gICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgJzwvZm9vdGVyPidcbiAgICAgICAgXS5qb2luKCcnKSkuYXBwZW5kVG8odGhpcy4kZm9ybUNvbnRhaW5lcik7XG5cbiAgICAgICAgdGhpcy4kaW5wdXRDbGFzcyA9IGJvZHkuZmluZCgnLmlucHV0LWNsYXNzJylcbiAgICAgICAgdGhpcy4kaW5wdXRJZCA9IGJvZHkuZmluZCgnLmlucHV0LWlkJylcblxuICAgICAgICB0aGlzLiRjYW5jZWxCdG4gPSBib2R5LmZpbmQoJy5jYW5jZWwnKVxuXG4gICAgICAgIHRoaXMubG9hZE1vZGFsVmFsdWVzKClcblxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGNhbmNlbEJ0biwgJ2NsaWNrJywgJ2hpZGUnKVxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGZvcm1Db250YWluZXIsICdzdWJtaXQnLCAnb25Gb3JtU3VibWl0JylcbiAgICB9LFxuXG4gICAgbG9hZE1vZGFsVmFsdWVzKCkge1xuICAgICAgICB0YWJJZCA9IHRoaXMudGFiLmZpbmQoJy50YWInKS5kYXRhKCdpZCcpXG4gICAgICAgICRjbGFzc0lucHV0ID0gJCgnaW5wdXRbbmFtZT1cImZvcm0tYnVpbGRlclt0YWJdWycrIHRhYklkICsnXVtvcHRpb25zXVtjbGFzc11cIl0nKS52YWwoKVxuICAgICAgICAkaWRJbnB1dCA9ICQoJ2lucHV0W25hbWU9XCJmb3JtLWJ1aWxkZXJbdGFiXVsnKyB0YWJJZCArJ11bb3B0aW9uc11baWRdXCJdJykudmFsKClcblxuICAgICAgICBpZiAoJGNsYXNzSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuJGZvcm1Db250YWluZXIuZmluZCgnLmlucHV0LWNsYXNzJykudmFsKCRjbGFzc0lucHV0KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRpZElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLiRmb3JtQ29udGFpbmVyLmZpbmQoJy5pbnB1dC1pZCcpLnZhbCgkaWRJbnB1dClcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkZvcm1TdWJtaXQoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ3NldE9wdGlvbnMnLCB7XG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgXCJjbGFzc1wiOiB0aGlzLiRpbnB1dENsYXNzLnZhbCgpLFxuICAgICAgICAgICAgICAgIGlkOiB0aGlzLiRpbnB1dElkLnZhbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5oaWRlKClcbiAgICB9LFxuXG4gICAgb25GYWRlT3V0KCkge1xuICAgICAgICB0aGlzLmJhc2UoKVxuICAgICAgICB0aGlzLmRlc3Ryb3koKVxuICAgIH0sXG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmJhc2UoKVxuICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlKClcbiAgICAgICAgdGhpcy4kc2hhZGUucmVtb3ZlKClcbiAgICB9LFxuXG4gICAgc2hvdyhvcHRpb25zKSB7XG4gICAgICAgIGxldCBzZWxmXG4gICAgICAgIGxldCB2YWx1ZXNcblxuICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSBKU09OLnBhcnNlKG9wdGlvbnNbdGhpcy50YWIubmFtZV0pXG4gICAgICAgIH1cblxuICAgICAgICQuZWFjaCh2YWx1ZXMsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnY2xhc3MnICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kaW5wdXRDbGFzcy52YWwodmFsdWUpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdpZCcgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRpbnB1dElkLnZhbCh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICB9KVxuXG4gICAgICAgIGlmICghR2FybmlzaC5pc01vYmlsZUJyb3dzZXIoKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dENsYXNzLmZvY3VzKCk7XG4gICAgICAgICAgICB9KSwgdGhpcyksIDEwMClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYmFzZSgpXG4gICB9XG4gICBcblxufSlcblxuXG53aW5kb3cuTERfVGFicyA9IExEX1RhYnNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdGFiLWRlc2lnbmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==