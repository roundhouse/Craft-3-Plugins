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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),

/***/ 16:
/***/ (function(module, exports) {

var FormBuilderSection = void 0;

FormBuilderSection = Garnish.Base.extend({
    $container: null,
    $titlebar: null,
    $fieldsContainer: null,
    $optionsContainer: null,
    $previewContainer: null,
    $actionMenu: null,
    $collapserBtn: null,
    $optionBtn: null,
    $sectionToggleInput: null,
    $menuBtn: null,
    $status: null,
    modal: null,
    collapsed: false,
    optionCollapsed: true,

    init: function init(el) {
        var menuBtn = void 0;
        this.$container = $(el);
        this.$menuBtn = this.$container.find('.actions > .settings');
        this.$collapserBtn = this.$container.find('.actions > .bodytoggle');
        this.$optionBtn = this.$container.find('.actions > .optionstoggle');
        this.$sectionToggleInput = this.$container.find('.section-toggle');
        this.$titlebar = this.$container.find('.titlebar');
        this.$fieldsContainer = this.$container.find('.body');
        this.$optionsContainer = this.$container.find('.body-options');
        this.$previewContainer = this.$container.find('.preview');
        this.$status = this.$container.find('.actions > .status');
        menuBtn = new Garnish.MenuBtn(this.$menuBtn);
        this.$actionMenu = menuBtn.menu.$container;
        menuBtn.menu.settings.onOptionSelect = $.proxy(this, 'onMenuOptionSelect');
        if (Garnish.hasAttr(this.$container, 'data-collapsed')) {
            this.collapse();
        }
        this._handleTitleBarClick = function (ev) {
            ev.preventDefault();
            return this.toggle();
        };
        this.addListener(this.$collapserBtn, 'click', this.toggle);
        this.addListener(this.$optionBtn, 'click', this.toggleOptions);
        this.addListener(this.$titlebar, 'doubletap', this._handleTitleBarClick);
    },
    toggle: function toggle() {
        if (this.collapsed) {
            return this.expand();
        } else {
            this.$sectionToggleInput.prop('checked', true);
            return this.collapse(true);
        }
    },
    toggleOptions: function toggleOptions() {
        if (this.optionCollapsed) {
            return this.expandOption();
        } else {
            return this.collapseOption(true);
        }
    },
    expandOption: function expandOption() {
        var collapsedContainerHeight = void 0;
        var expandedContainerHeight = void 0;
        if (!this.optionCollapsed) {
            return;
        }
        this.collapse(true);
        this.$container.removeClass('optionscollapsed');
        this.$optionsContainer.velocity('stop');
        this.$container.velocity('stop');
        collapsedContainerHeight = this.$container.height();
        this.$container.height('auto');
        this.$optionsContainer.show();
        expandedContainerHeight = this.$container.height();
        this.$container.height(collapsedContainerHeight);
        this.$optionsContainer.hide().velocity('fadeIn', {
            duration: 'fast'
        });
        this.$container.velocity({
            height: expandedContainerHeight
        }, 'fast', $.proxy(function () {
            return this.$container.height('auto');
        }, this));

        return this.optionCollapsed = false;
    },
    collapse: function collapse(animate) {
        var $customTemplates = void 0;
        var $fields = void 0;
        var previewHtml = void 0;
        var title = void 0;
        this.$sectionToggleInput.prop('checked', true);
        if (this.collapsed) {
            return;
        }

        this.$container.addClass('bodycollapsed');
        previewHtml = '';
        title = this.$titlebar.find('.tout-title').text();
        if (title === 'Fields') {
            $fields = this.$fieldsContainer.find('.fld-field:not(.unused)').length;
            $customTemplates = this.$fieldsContainer.find('.custom-email:not(.unused)').length;

            if ($fields > 0) {
                previewHtml += '| ' + $fields + ' Total Fields';
            }

            if ($customTemplates > 0) {
                previewHtml += ' | ' + $customTemplates + ' Custom Templates';
            }
        }

        this.$previewContainer.html(previewHtml);
        this.$fieldsContainer.velocity('stop');
        this.$container.velocity('stop');

        if (animate) {
            this.$fieldsContainer.velocity('fadeOut', {
                duration: 'fast'
            });

            this.$container.velocity({
                height: '100%'
            }, 'fast');
        } else {
            this.$previewContainer.show();
            this.$fieldsContainer.hide();
            this.$container.css({
                height: '100%'
            });
        }

        setTimeout($.proxy(function () {
            this.$actionMenu.find('a[data-action=collapse]:first').parent().addClass('hidden');
            return this.$actionMenu.find('a[data-action=expand]:first').parent().removeClass('hidden');
        }, this), 200);

        return this.collapsed = true;
    },
    collapseOption: function collapseOption(animate) {
        if (this.optionCollapsed) {
            return;
        }
        this.$container.addClass('optionscollapsed');
        this.$optionsContainer.velocity('stop');
        this.$container.velocity('stop');
        if (animate) {
            this.$optionsContainer.velocity('fadeOut', {
                duration: 'fast'
            });
            this.$container.velocity({
                height: '100%'
            }, 'fast');
        } else {
            this.$optionsContainer.hide();
            this.$container.css({
                height: '100%'
            });
        }

        return this.optionCollapsed = true;
    },
    expand: function expand() {
        var collapsedContainerHeight = void 0;
        var expandedContainerHeight = void 0;
        this.$sectionToggleInput.prop('checked', false);
        if (!this.collapsed) {
            return;
        }
        this.collapseOption(true);
        this.$container.removeClass('bodycollapsed');
        this.$fieldsContainer.velocity('stop');
        this.$container.velocity('stop');
        collapsedContainerHeight = this.$container.height();
        this.$container.height('auto');
        this.$fieldsContainer.show();
        expandedContainerHeight = this.$container.height();
        this.$container.height(collapsedContainerHeight);

        this.$fieldsContainer.hide().velocity('fadeIn', {
            duration: 'fast'
        });

        this.$container.velocity({
            height: expandedContainerHeight
        }, 'fast', $.proxy(function () {
            return this.$container.height('auto');
        }, this));

        setTimeout($.proxy(function () {
            this.$actionMenu.find('a[data-action=collapse]:first').parent().removeClass('hidden');
            return this.$actionMenu.find('a[data-action=expand]:first').parent().addClass('hidden');
        }, this), 200);

        return this.collapsed = false;
    },
    disable: function disable() {
        this.$fieldsContainer.find('.enable-notification-section').prop('checked', false);
        this.$status.removeClass('on');
        this.$status.addClass('off');
        setTimeout($.proxy(function () {
            this.$actionMenu.find('a[data-action=disable]:first').parent().addClass('hidden');
            return this.$actionMenu.find('a[data-action=enable]:first').parent().removeClass('hidden');
        }, this), 200);

        return this.collapse(true);
    },
    enable: function enable() {
        this.$fieldsContainer.find('.enable-notification-section').prop('checked', true);
        this.$status.removeClass('off');
        this.$status.addClass('on');
        return setTimeout($.proxy(function () {
            this.$actionMenu.find('a[data-action=disable]:first').parent().removeClass('hidden');
            return this.$actionMenu.find('a[data-action=enable]:first').parent().addClass('hidden');
        }, this), 200);
    },
    "delete": function _delete() {
        return this.$container.remove();
    },
    settings: function settings() {
        if (!this.modal) {
            return this.modal = new SettingsModal(this);
        } else {
            return this.modal.show();
        }
    },
    updateSectionSettings: function updateSectionSettings() {
        return $.each(this.modal.$modalInputs, $.proxy(function (i, input) {
            var value = void 0;
            value = $(input).val();
            if (value !== '') {
                return this.$container.prepend($(input).addClass('hidden'));
            }
        }, this));
    },
    onMenuOptionSelect: function onMenuOptionSelect(option) {
        var $option = void 0;
        $option = $(option);

        switch ($option.data('action')) {
            case 'collapse':
                return this.collapse(true);
            case 'expand':
                return this.expand();
            case 'disable':
                return this.disable();
            case 'enable':
                this.enable();
                return this.expand();
            case 'delete':
                return this["delete"]();
            case 'settings':
                return this.settings();
        }
    }
});

Garnish.$doc.ready(function () {
    $('.section-collapsible').each(function (i, el) {
        new FormBuilderSection(el);
    });

    if (Craft.elementIndex) {
        Craft.elementIndex.on('selectSource', function (e) {
            var groupId = void 0;
            groupId = e.target.$source.data('id');

            if (groupId) {
                $('#new-form-btn').attr("href", Craft.getCpUrl() + ("/form-builder/forms/new?groupId=" + groupId));
            } else {
                $('#new-form-btn').attr('href', Craft.getCpUrl() + '/form-builder/forms/new?groupId=1');
            }
        });
    }

    if ($('.fb-forms').length > 0) {
        new Clipboard('.copy-handle', {
            target: function target(trigger) {
                var handle;
                handle = $(trigger).data('handle');
                Craft.cp.displayNotice(Craft.t("form-builder", "Form handle `" + handle + "` copied"));
            }
        });

        new Clipboard('.twig-snippet', {
            text: function text(trigger) {
                var handle, snippet;
                handle = $(trigger).data('handle');
                snippet = '{{ craft.formBuilder.form("' + handle + '") }}';
                Craft.cp.displayNotice(snippet + Craft.t('form-builder', ' copied'));
                return snippet;
            }
        });
    }

    $('.delete-form').on('click', function (e) {
        var data = void 0;
        e.preventDefault();
        data = {
            id: $(this).data('id')
        };

        if (confirm(Craft.t('form-builder', "Are you sure you want to delete this form and all its entries?"))) {
            Craft.postActionRequest('form-builder/forms/delete', data, $.proxy(function (response, textStatus) {
                if (textStatus === 'success') {
                    Craft.cp.displayNotice(Craft.t('Form deleted'));
                    window.location.href = window.FormBuilder.adminUrl + '/forms';
                }
            }, this));
        }
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNThiMTRmNTEwZjNmNzVlZmFiNGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Zvcm1zLmpzIl0sIm5hbWVzIjpbIkZvcm1CdWlsZGVyU2VjdGlvbiIsIkdhcm5pc2giLCJCYXNlIiwiZXh0ZW5kIiwiJGNvbnRhaW5lciIsIiR0aXRsZWJhciIsIiRmaWVsZHNDb250YWluZXIiLCIkb3B0aW9uc0NvbnRhaW5lciIsIiRwcmV2aWV3Q29udGFpbmVyIiwiJGFjdGlvbk1lbnUiLCIkY29sbGFwc2VyQnRuIiwiJG9wdGlvbkJ0biIsIiRzZWN0aW9uVG9nZ2xlSW5wdXQiLCIkbWVudUJ0biIsIiRzdGF0dXMiLCJtb2RhbCIsImNvbGxhcHNlZCIsIm9wdGlvbkNvbGxhcHNlZCIsImluaXQiLCJlbCIsIm1lbnVCdG4iLCIkIiwiZmluZCIsIk1lbnVCdG4iLCJtZW51Iiwic2V0dGluZ3MiLCJvbk9wdGlvblNlbGVjdCIsInByb3h5IiwiaGFzQXR0ciIsImNvbGxhcHNlIiwiX2hhbmRsZVRpdGxlQmFyQ2xpY2siLCJldiIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlIiwiYWRkTGlzdGVuZXIiLCJ0b2dnbGVPcHRpb25zIiwiZXhwYW5kIiwicHJvcCIsImV4cGFuZE9wdGlvbiIsImNvbGxhcHNlT3B0aW9uIiwiY29sbGFwc2VkQ29udGFpbmVySGVpZ2h0IiwiZXhwYW5kZWRDb250YWluZXJIZWlnaHQiLCJyZW1vdmVDbGFzcyIsInZlbG9jaXR5IiwiaGVpZ2h0Iiwic2hvdyIsImhpZGUiLCJkdXJhdGlvbiIsImFuaW1hdGUiLCIkY3VzdG9tVGVtcGxhdGVzIiwiJGZpZWxkcyIsInByZXZpZXdIdG1sIiwidGl0bGUiLCJhZGRDbGFzcyIsInRleHQiLCJsZW5ndGgiLCJodG1sIiwiY3NzIiwic2V0VGltZW91dCIsInBhcmVudCIsImRpc2FibGUiLCJlbmFibGUiLCJyZW1vdmUiLCJTZXR0aW5nc01vZGFsIiwidXBkYXRlU2VjdGlvblNldHRpbmdzIiwiZWFjaCIsIiRtb2RhbElucHV0cyIsImkiLCJpbnB1dCIsInZhbHVlIiwidmFsIiwicHJlcGVuZCIsIm9uTWVudU9wdGlvblNlbGVjdCIsIm9wdGlvbiIsIiRvcHRpb24iLCJkYXRhIiwiJGRvYyIsInJlYWR5IiwiQ3JhZnQiLCJlbGVtZW50SW5kZXgiLCJvbiIsImUiLCJncm91cElkIiwidGFyZ2V0IiwiJHNvdXJjZSIsImF0dHIiLCJnZXRDcFVybCIsIkNsaXBib2FyZCIsInRyaWdnZXIiLCJoYW5kbGUiLCJjcCIsImRpc3BsYXlOb3RpY2UiLCJ0Iiwic25pcHBldCIsImlkIiwiY29uZmlybSIsInBvc3RBY3Rpb25SZXF1ZXN0IiwicmVzcG9uc2UiLCJ0ZXh0U3RhdHVzIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiRm9ybUJ1aWxkZXIiLCJhZG1pblVybCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBLElBQUlBLDJCQUFKOztBQUVBQSxxQkFBcUJDLFFBQVFDLElBQVIsQ0FBYUMsTUFBYixDQUFvQjtBQUNyQ0MsZ0JBQVksSUFEeUI7QUFFckNDLGVBQVcsSUFGMEI7QUFHckNDLHNCQUFrQixJQUhtQjtBQUlyQ0MsdUJBQW1CLElBSmtCO0FBS3JDQyx1QkFBbUIsSUFMa0I7QUFNckNDLGlCQUFh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LDJCQUF4QixFQUFxRHJCLElBQXJELEVBQTJEdEQsRUFBRU0sS0FBRixDQUFTLFVBQUNzRSxRQUFELEVBQVdDLFVBQVgsRUFBMEI7QUFDMUYsb0JBQUlBLGVBQWUsU0FBbkIsRUFBOEI7QUFDMUJwQiwwQkFBTVksRUFBTixDQUFTQyxhQUFULENBQXVCYixNQUFNYyxDQUFOLENBQVEsY0FBUixDQUF2QjtBQUNBTywyQkFBT0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBMEJGLE9BQU9HLFdBQVAsQ0FBbUJDLFFBQTdDO0FBQ0g7QUFDSixhQUwwRCxFQUt2RCxJQUx1RCxDQUEzRDtBQU1IO0FBQ0osS0FmRDtBQWdCSCxDQXRERCxFIiwiZmlsZSI6Ii9Vc2Vycy9nb25jaGF2L1NpdGVzL2NyYWZ0L2NyYWZ0M3BsdWdpbnMvY3JhZnQzcGx1Z2lucy9mb3JtYnVpbGRlci9yZWxlYXNlL3NyYy9hc3NldHMvanMvZm9ybXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNThiMTRmNTEwZjNmNzVlZmFiNGQiLCJsZXQgRm9ybUJ1aWxkZXJTZWN0aW9uO1xuXG5Gb3JtQnVpbGRlclNlY3Rpb24gPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkY29udGFpbmVyOiBudWxsLFxuICAgICR0aXRsZWJhcjogbnVsbCxcbiAgICAkZmllbGRzQ29udGFpbmVyOiBudWxsLFxuICAgICRvcHRpb25zQ29udGFpbmVyOiBudWxsLFxuICAgICRwcmV2aWV3Q29udGFpbmVyOiBudWxsLFxuICAgICRhY3Rpb25NZW51OiBudWxsLFxuICAgICRjb2xsYXBzZXJCdG46IG51bGwsXG4gICAgJG9wdGlvbkJ0bjogbnVsbCxcbiAgICAkc2VjdGlvblRvZ2dsZUlucHV0OiBudWxsLFxuICAgICRtZW51QnRuOiBudWxsLFxuICAgICRzdGF0dXM6IG51bGwsXG4gICAgbW9kYWw6IG51bGwsXG4gICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICBvcHRpb25Db2xsYXBzZWQ6IHRydWUsXG5cbiAgICBpbml0KGVsKSB7XG4gICAgICAgIGxldCBtZW51QnRuO1xuICAgICAgICB0aGlzLiRjb250YWluZXIgPSAkKGVsKTtcbiAgICAgICAgdGhpcy4kbWVudUJ0biA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuYWN0aW9ucyA+IC5zZXR0aW5ncycpO1xuICAgICAgICB0aGlzLiRjb2xsYXBzZXJCdG4gPSB0aGlzLiRjb250YWluZXIuZmluZCgnLmFjdGlvbnMgPiAuYm9keXRvZ2dsZScpO1xuICAgICAgICB0aGlzLiRvcHRpb25CdG4gPSB0aGlzLiRjb250YWluZXIuZmluZCgnLmFjdGlvbnMgPiAub3B0aW9uc3RvZ2dsZScpO1xuICAgICAgICB0aGlzLiRzZWN0aW9uVG9nZ2xlSW5wdXQgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLnNlY3Rpb24tdG9nZ2xlJyk7XG4gICAgICAgIHRoaXMuJHRpdGxlYmFyID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy50aXRsZWJhcicpO1xuICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLmJvZHknKTtcbiAgICAgICAgdGhpcy4kb3B0aW9uc0NvbnRhaW5lciA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuYm9keS1vcHRpb25zJyk7XG4gICAgICAgIHRoaXMuJHByZXZpZXdDb250YWluZXIgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLnByZXZpZXcnKTtcbiAgICAgICAgdGhpcy4kc3RhdHVzID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5hY3Rpb25zID4gLnN0YXR1cycpO1xuICAgICAgICBtZW51QnRuID0gbmV3IEdhcm5pc2guTWVudUJ0bih0aGlzLiRtZW51QnRuKTtcbiAgICAgICAgdGhpcy4kYWN0aW9uTWVudSA9IG1lbnVCdG4ubWVudS4kY29udGFpbmVyO1xuICAgICAgICBtZW51QnRuLm1lbnUuc2V0dGluZ3Mub25PcHRpb25TZWxlY3QgPSAkLnByb3h5KHRoaXMsICdvbk1lbnVPcHRpb25TZWxlY3QnKTtcbiAgICAgICAgaWYgKEdhcm5pc2guaGFzQXR0cih0aGlzLiRjb250YWluZXIsICdkYXRhLWNvbGxhcHNlZCcpKSB7XG4gICAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hhbmRsZVRpdGxlQmFyQ2xpY2sgPSBmdW5jdGlvbihldikge1xuICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kY29sbGFwc2VyQnRuLCAnY2xpY2snLCB0aGlzLnRvZ2dsZSk7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kb3B0aW9uQnRuLCAnY2xpY2snLCB0aGlzLnRvZ2dsZU9wdGlvbnMpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJHRpdGxlYmFyLCAnZG91YmxldGFwJywgdGhpcy5faGFuZGxlVGl0bGVCYXJDbGljayk7XG4gICAgfSxcblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGFwc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbmQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNlY3Rpb25Ub2dnbGVJbnB1dC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgdG9nZ2xlT3B0aW9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbmRPcHRpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlT3B0aW9uKHRydWUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGV4cGFuZE9wdGlvbigpIHtcbiAgICAgICAgbGV0IGNvbGxhcHNlZENvbnRhaW5lckhlaWdodDtcbiAgICAgICAgbGV0IGV4cGFuZGVkQ29udGFpbmVySGVpZ2h0O1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnJlbW92ZUNsYXNzKCdvcHRpb25zY29sbGFwc2VkJyk7XG4gICAgICAgIHRoaXMuJG9wdGlvbnNDb250YWluZXIudmVsb2NpdHkoJ3N0b3AnKTtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KCdzdG9wJyk7XG4gICAgICAgIGNvbGxhcHNlZENvbnRhaW5lckhlaWdodCA9IHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoKTtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLmhlaWdodCgnYXV0bycpO1xuICAgICAgICB0aGlzLiRvcHRpb25zQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgZXhwYW5kZWRDb250YWluZXJIZWlnaHQgPSB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoY29sbGFwc2VkQ29udGFpbmVySGVpZ2h0KTtcbiAgICAgICAgdGhpcy4kb3B0aW9uc0NvbnRhaW5lci5oaWRlKCkudmVsb2NpdHkoJ2ZhZGVJbicsIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiAnZmFzdCdcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci52ZWxvY2l0eSh7XG4gICAgICAgICAgICBoZWlnaHQ6IGV4cGFuZGVkQ29udGFpbmVySGVpZ2h0XG4gICAgICAgIH0sICdmYXN0JywgJC5wcm94eSgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kY29udGFpbmVyLmhlaWdodCgnYXV0bycpO1xuICAgICAgICB9KSwgdGhpcykpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbkNvbGxhcHNlZCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBjb2xsYXBzZShhbmltYXRlKSB7XG4gICAgICAgIGxldCAkY3VzdG9tVGVtcGxhdGVzO1xuICAgICAgICBsZXQgJGZpZWxkcztcbiAgICAgICAgbGV0IHByZXZpZXdIdG1sO1xuICAgICAgICBsZXQgdGl0bGU7XG4gICAgICAgIHRoaXMuJHNlY3Rpb25Ub2dnbGVJbnB1dC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kY29udGFpbmVyLmFkZENsYXNzKCdib2R5Y29sbGFwc2VkJyk7XG4gICAgICAgIHByZXZpZXdIdG1sID0gJyc7XG4gICAgICAgIHRpdGxlID0gdGhpcy4kdGl0bGViYXIuZmluZCgnLnRvdXQtdGl0bGUnKS50ZXh0KCk7XG4gICAgICAgIGlmICh0aXRsZSA9PT0gJ0ZpZWxkcycpIHtcbiAgICAgICAgICAgICRmaWVsZHMgPSB0aGlzLiRmaWVsZHNDb250YWluZXIuZmluZCgnLmZsZC1maWVsZDpub3QoLnVudXNlZCknKS5sZW5ndGg7XG4gICAgICAgICAgICAkY3VzdG9tVGVtcGxhdGVzID0gdGhpcy4kZmllbGRzQ29udGFpbmVyLmZpbmQoJy5jdXN0b20tZW1haWw6bm90KC51bnVzZWQpJykubGVuZ3RoO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmICgkZmllbGRzID4gMCkge1xuICAgICAgICAgICAgICBwcmV2aWV3SHRtbCArPSBgfCAkeyRmaWVsZHN9IFRvdGFsIEZpZWxkc2A7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkY3VzdG9tVGVtcGxhdGVzID4gMCkge1xuICAgICAgICAgICAgICBwcmV2aWV3SHRtbCArPSBgIHwgJHskY3VzdG9tVGVtcGxhdGVzfSBDdXN0b20gVGVtcGxhdGVzYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJHByZXZpZXdDb250YWluZXIuaHRtbChwcmV2aWV3SHRtbCk7XG4gICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci52ZWxvY2l0eSgnc3RvcCcpO1xuICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoJ3N0b3AnKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChhbmltYXRlKSB7XG4gICAgICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIudmVsb2NpdHkoJ2ZhZGVPdXQnLCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246ICdmYXN0J1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci52ZWxvY2l0eSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgICAgIH0sICdmYXN0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRwcmV2aWV3Q29udGFpbmVyLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIuY3NzKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCQucHJveHkoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWNvbGxhcHNlXTpmaXJzdCcpLnBhcmVudCgpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhY3Rpb25NZW51LmZpbmQoJ2FbZGF0YS1hY3Rpb249ZXhwYW5kXTpmaXJzdCcpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfSksIHRoaXMpLCAyMDApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlZCA9IHRydWU7XG4gICAgfSxcblxuICAgIGNvbGxhcHNlT3B0aW9uKGFuaW1hdGUpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kY29udGFpbmVyLmFkZENsYXNzKCdvcHRpb25zY29sbGFwc2VkJyk7XG4gICAgICAgIHRoaXMuJG9wdGlvbnNDb250YWluZXIudmVsb2NpdHkoJ3N0b3AnKTtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KCdzdG9wJyk7XG4gICAgICAgIGlmIChhbmltYXRlKSB7XG4gICAgICAgICAgICB0aGlzLiRvcHRpb25zQ29udGFpbmVyLnZlbG9jaXR5KCdmYWRlT3V0Jywge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAnZmFzdCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJ1xuICAgICAgICAgICAgfSwgJ2Zhc3QnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJG9wdGlvbnNDb250YWluZXIuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLmNzcyh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uQ29sbGFwc2VkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgZXhwYW5kKCkge1xuICAgICAgICBsZXQgY29sbGFwc2VkQ29udGFpbmVySGVpZ2h0O1xuICAgICAgICBsZXQgZXhwYW5kZWRDb250YWluZXJIZWlnaHQ7XG4gICAgICAgIHRoaXMuJHNlY3Rpb25Ub2dnbGVJbnB1dC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICBpZiAoIXRoaXMuY29sbGFwc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb2xsYXBzZU9wdGlvbih0cnVlKTtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnJlbW92ZUNsYXNzKCdib2R5Y29sbGFwc2VkJyk7XG4gICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci52ZWxvY2l0eSgnc3RvcCcpO1xuICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoJ3N0b3AnKTtcbiAgICAgICAgY29sbGFwc2VkQ29udGFpbmVySGVpZ2h0ID0gdGhpcy4kY29udGFpbmVyLmhlaWdodCgpO1xuICAgICAgICB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci5zaG93KCk7XG4gICAgICAgIGV4cGFuZGVkQ29udGFpbmVySGVpZ2h0ID0gdGhpcy4kY29udGFpbmVyLmhlaWdodCgpO1xuICAgICAgICB0aGlzLiRjb250YWluZXIuaGVpZ2h0KGNvbGxhcHNlZENvbnRhaW5lckhlaWdodCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIuaGlkZSgpLnZlbG9jaXR5KCdmYWRlSW4nLCB7XG4gICAgICAgICAgICBkdXJhdGlvbjogJ2Zhc3QnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci52ZWxvY2l0eSh7XG4gICAgICAgICAgICBoZWlnaHQ6IGV4cGFuZGVkQ29udGFpbmVySGVpZ2h0XG4gICAgICAgIH0sICdmYXN0JywgJC5wcm94eSgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kY29udGFpbmVyLmhlaWdodCgnYXV0bycpO1xuICAgICAgICB9KSwgdGhpcykpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoJC5wcm94eSgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLiRhY3Rpb25NZW51LmZpbmQoJ2FbZGF0YS1hY3Rpb249Y29sbGFwc2VdOmZpcnN0JykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1leHBhbmRdOmZpcnN0JykucGFyZW50KCkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9KSwgdGhpcyksIDIwMCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGFwc2VkID0gZmFsc2U7XG4gICAgfSxcbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIuZmluZCgnLmVuYWJsZS1ub3RpZmljYXRpb24tc2VjdGlvbicpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuJHN0YXR1cy5yZW1vdmVDbGFzcygnb24nKTtcbiAgICAgICAgdGhpcy4kc3RhdHVzLmFkZENsYXNzKCdvZmYnKTtcbiAgICAgICAgc2V0VGltZW91dCgkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1kaXNhYmxlXTpmaXJzdCcpLnBhcmVudCgpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhY3Rpb25NZW51LmZpbmQoJ2FbZGF0YS1hY3Rpb249ZW5hYmxlXTpmaXJzdCcpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfSksIHRoaXMpLCAyMDApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlKHRydWUpO1xuICAgIH0sXG5cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci5maW5kKCcuZW5hYmxlLW5vdGlmaWNhdGlvbi1zZWN0aW9uJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICB0aGlzLiRzdGF0dXMucmVtb3ZlQ2xhc3MoJ29mZicpO1xuICAgICAgICB0aGlzLiRzdGF0dXMuYWRkQ2xhc3MoJ29uJyk7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KCQucHJveHkoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWRpc2FibGVdOmZpcnN0JykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1lbmFibGVdOmZpcnN0JykucGFyZW50KCkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9KSwgdGhpcyksIDIwMCk7XG4gICAgfSxcblxuICAgIFwiZGVsZXRlXCIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjb250YWluZXIucmVtb3ZlKCk7XG4gICAgfSxcblxuICAgIHNldHRpbmdzKCkge1xuICAgICAgICBpZiAoIXRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGFsID0gbmV3IFNldHRpbmdzTW9kYWwodGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlU2VjdGlvblNldHRpbmdzKCkge1xuICAgICAgICByZXR1cm4gJC5lYWNoKHRoaXMubW9kYWwuJG1vZGFsSW5wdXRzLCAkLnByb3h5KChmdW5jdGlvbihpLCBpbnB1dCkge1xuICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgdmFsdWUgPSAkKGlucHV0KS52YWwoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kY29udGFpbmVyLnByZXBlbmQoJChpbnB1dCkuYWRkQ2xhc3MoJ2hpZGRlbicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIHRoaXMpKTtcbiAgICB9LFxuXG4gICAgb25NZW51T3B0aW9uU2VsZWN0KG9wdGlvbikge1xuICAgICAgICBsZXQgJG9wdGlvbjtcbiAgICAgICAgJG9wdGlvbiA9ICQob3B0aW9uKTtcblxuICAgICAgICBzd2l0Y2ggKCRvcHRpb24uZGF0YSgnYWN0aW9uJykpIHtcbiAgICAgICAgICAgIGNhc2UgJ2NvbGxhcHNlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgICAgIGNhc2UgJ2V4cGFuZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwYW5kKCk7XG4gICAgICAgICAgICBjYXNlICdkaXNhYmxlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlKCk7XG4gICAgICAgICAgICBjYXNlICdlbmFibGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwYW5kKCk7XG4gICAgICAgICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW1wiZGVsZXRlXCJdKCk7XG4gICAgICAgICAgICBjYXNlICdzZXR0aW5ncyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5HYXJuaXNoLiRkb2MucmVhZHkoKCkgPT4ge1xuICAgICQoJy5zZWN0aW9uLWNvbGxhcHNpYmxlJykuZWFjaChmdW5jdGlvbihpLGVsKXtcbiAgICAgICAgbmV3IEZvcm1CdWlsZGVyU2VjdGlvbihlbCk7XG4gICAgfSk7XG5cbiAgICBpZiAoQ3JhZnQuZWxlbWVudEluZGV4KSB7XG4gICAgICAgIENyYWZ0LmVsZW1lbnRJbmRleC5vbignc2VsZWN0U291cmNlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgbGV0IGdyb3VwSWQ7XG4gICAgICAgICAgICBncm91cElkID0gZS50YXJnZXQuJHNvdXJjZS5kYXRhKCdpZCcpO1xuXG4gICAgICAgICAgICBpZiAoZ3JvdXBJZCkge1xuICAgICAgICAgICAgICAgICQoJyNuZXctZm9ybS1idG4nKS5hdHRyKFwiaHJlZlwiLCBDcmFmdC5nZXRDcFVybCgpICsgKFwiL2Zvcm0tYnVpbGRlci9mb3Jtcy9uZXc/Z3JvdXBJZD1cIiArIGdyb3VwSWQpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnI25ldy1mb3JtLWJ0bicpLmF0dHIoJ2hyZWYnLCBDcmFmdC5nZXRDcFVybCgpICsgJy9mb3JtLWJ1aWxkZXIvZm9ybXMvbmV3P2dyb3VwSWQ9MScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoJCgnLmZiLWZvcm1zJykubGVuZ3RoID4gMCkge1xuICAgICAgICBuZXcgQ2xpcGJvYXJkKCcuY29weS1oYW5kbGUnLCB7XG4gICAgICAgICAgICB0YXJnZXQ6IGZ1bmN0aW9uKHRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFuZGxlO1xuICAgICAgICAgICAgICAgIGhhbmRsZSA9ICQodHJpZ2dlcikuZGF0YSgnaGFuZGxlJyk7XG4gICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShDcmFmdC50KFwiZm9ybS1idWlsZGVyXCIsIFwiRm9ybSBoYW5kbGUgYFwiICsgaGFuZGxlICsgXCJgIGNvcGllZFwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBDbGlwYm9hcmQoJy50d2lnLXNuaXBwZXQnLCB7XG4gICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZSwgc25pcHBldDtcbiAgICAgICAgICAgICAgICBoYW5kbGUgPSAkKHRyaWdnZXIpLmRhdGEoJ2hhbmRsZScpO1xuICAgICAgICAgICAgICAgIHNuaXBwZXQgPSAne3sgY3JhZnQuZm9ybUJ1aWxkZXIuZm9ybShcIicgKyBoYW5kbGUgKyAnXCIpIH19JztcbiAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKHNuaXBwZXQgKyBDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnIGNvcGllZCcpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc25pcHBldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJCgnLmRlbGV0ZS1mb3JtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgaWQ6ICQodGhpcykuZGF0YSgnaWQnKVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjb25maXJtKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGZvcm0gYW5kIGFsbCBpdHMgZW50cmllcz9cIikpKSB7XG4gICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2Zvcm1zL2RlbGV0ZScsIGRhdGEsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShDcmFmdC50KCdGb3JtIGRlbGV0ZWQnKSk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7d2luZG93LkZvcm1CdWlsZGVyLmFkbWluVXJsfS9mb3Jtc2A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksIHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2Zvcm1zLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==