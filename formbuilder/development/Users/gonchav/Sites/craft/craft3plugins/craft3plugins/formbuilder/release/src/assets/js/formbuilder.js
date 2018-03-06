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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var UtilityItem = void 0;

UtilityItem = Garnish.Base.extend({
    $container: null,
    $btn: null,
    $loader: null,
    $badgeContainer: null,
    $countContainer: null,
    $menuContainer: null,

    type: null,
    count: 0,

    init: function init(el) {
        this.$container = $(el);
        this.type = this.$container.data('type');
        this.$btn = this.$container.find('.icon');
        this.$loader = this.$container.find('.loader');
        this.$badgeContainer = this.$container.find('.fb-badge');
        this.$countContainer = this.$badgeContainer.find('.count');
        this.$menuContainer = this.$container.find('.utility-menu');

        if (this.type == 'unread') {
            this.getUnreadCount();
        }

        if (this.type == 'notifications') {
            this.getNotifications();
        }

        this.addListener(this.$btn, 'click', this.toggleMenu);
    },
    getUnreadCount: function getUnreadCount() {
        var _this = this;

        Craft.postActionRequest('form-builder/entries/get-unread-entries', $.proxy(function (response, textStatus) {
            if (textStatus === 'success') {
                if (response.totalCount > 0) {
                    _this.$badgeContainer.addClass('show');
                    _this.$countContainer.html(response.totalCount);
                    _this.$menuContainer.find('.body').html(response.template);
                } else {
                    _this.$menuContainer.find('.body').html('<p class="no-content">' + Craft.t('form-builder', 'No unread submissions.') + '</p>');
                }
            }
        }, this));
    },
    getNotifications: function getNotifications() {
        this.$menuContainer.find('.body').html('<p class="no-content">' + Craft.t('form-builder', 'No new notifications.') + '</p>');
    },
    toggleMenu: function toggleMenu() {
        if (this.$container.hasClass('active')) {
            $('.fb-utility-btn').removeClass('active');
            $('.utility-menu').removeClass('active');
            this.$btn.parent().removeClass('active');
            this.$menuContainer.removeClass('active');
        } else {
            $('.fb-utility-btn').removeClass('active');
            $('.utility-menu').removeClass('active');
            this.$btn.parent().addClass('active');
            this.$menuContainer.addClass('active');
        }
    }
});

Garnish.$doc.ready(function () {
    var _this2 = this;

    $.each($('.fb-utility-btn'), function (i, el) {
        new UtilityItem(el);
    });

    $('.fb-mobile-nav').on('click', function (e) {
        $(_this2).toggleClass('active');
        $('body').toggleClass('show-fb-menu');
    });

    $('body').on('click', function (e) {
        target = $(e.target).closest('.utility-menu');
        btn = $(e.target).closest('.fb-utility-btn');

        if (target.length == 0 && btn.length == 0) {
            $('.fb-utility-btn').removeClass('active');
            $('.utility-menu').removeClass('active');
        }
    });

    //     Craft.initUiElements();

    //     window.pluginStoreApp = new Vue({
    //         el: '#content'
    //     });
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNThiMTRmNTEwZjNmNzVlZmFiNGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2Zvcm1idWlsZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3NzL2Zvcm1idWlsZGVyLnNjc3M/Zjc5MSJdLCJuYW1lcyI6WyJVdGlsaXR5SXRlbSIsIkdhcm5pc2giLCJCYXNlIiwiZXh0ZW5kIiwiJGNvbnRhaW5lciIsIiRidG4iLCIkbG9hZGVyIiwiJGJhZGdlQ29udGFpbmVyIiwiJGNvdW50Q29udGFpbmVyIiwiJG1lbnVDb250YWluZXIiLCJ0eXBlIiwiY291bnQiLCJpbml0IiwiZWwiLCIkIiwiZGF0YSIsImZpbmQiLCJnZXRVbnJlYWRDb3VudCIsImdldE5vdGlmaWNhdGlvbnMiLCJhZGRMaXN0ZW5lciIsInRvZ2dsZU1lbnUiLCJDcmFmdCIsInBvc3RBY3Rpb25SZXF1ZXN0IiwicHJveHkiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJ0b3RhbENvdW50IiwiYWRkQ2xhc3MiLCJodG1sIiwidGVtcGxhdGUiLCJ0IiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInBhcmVudCIsIiRkb2MiLCJyZWFkeSIsImVhY2giLCJpIiwib24iLCJ0b2dnbGVDbGFzcyIsInRhcmdldCIsImUiLCJjbG9zZXN0IiwiYnRuIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7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LENBQWlDLFFBQWpDO0FBQ0FsQixjQUFFLGVBQUYsRUFBbUJrQixXQUFuQixDQUErQixRQUEvQjtBQUNIO0FBQ0osS0FSRDs7QUFVSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQyxDQTFCRCxFOzs7Ozs7QUNyRUEseUMiLCJmaWxlIjoiL1VzZXJzL2dvbmNoYXYvU2l0ZXMvY3JhZnQvY3JhZnQzcGx1Z2lucy9jcmFmdDNwbHVnaW5zL2Zvcm1idWlsZGVyL3JlbGVhc2Uvc3JjL2Fzc2V0cy9qcy9mb3JtYnVpbGRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU4YjE0ZjUxMGYzZjc1ZWZhYjRkIiwibGV0IFV0aWxpdHlJdGVtXG5cblV0aWxpdHlJdGVtID0gR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgJGNvbnRhaW5lcjogbnVsbCxcbiAgICAkYnRuOiBudWxsLFxuICAgICRsb2FkZXI6IG51bGwsXG4gICAgJGJhZGdlQ29udGFpbmVyOiBudWxsLFxuICAgICRjb3VudENvbnRhaW5lcjogbnVsbCxcbiAgICAkbWVudUNvbnRhaW5lcjogbnVsbCxcblxuICAgIHR5cGU6IG51bGwsXG4gICAgY291bnQ6IDAsXG5cbiAgICBpbml0KGVsKSB7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lciA9ICQoZWwpO1xuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLiRjb250YWluZXIuZGF0YSgndHlwZScpXG4gICAgICAgIHRoaXMuJGJ0biA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuaWNvbicpXG4gICAgICAgIHRoaXMuJGxvYWRlciA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcubG9hZGVyJylcbiAgICAgICAgdGhpcy4kYmFkZ2VDb250YWluZXIgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLmZiLWJhZGdlJylcbiAgICAgICAgdGhpcy4kY291bnRDb250YWluZXIgPSB0aGlzLiRiYWRnZUNvbnRhaW5lci5maW5kKCcuY291bnQnKVxuICAgICAgICB0aGlzLiRtZW51Q29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy51dGlsaXR5LW1lbnUnKVxuXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ3VucmVhZCcpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0VW5yZWFkQ291bnQoKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnbm90aWZpY2F0aW9ucycpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Tm90aWZpY2F0aW9ucygpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGJ0biwgJ2NsaWNrJywgdGhpcy50b2dnbGVNZW51KVxuICAgIH0sXG5cbiAgICBnZXRVbnJlYWRDb3VudCgpIHtcbiAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9lbnRyaWVzL2dldC11bnJlYWQtZW50cmllcycsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgaWYgKHRleHRTdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS50b3RhbENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRiYWRnZUNvbnRhaW5lci5hZGRDbGFzcygnc2hvdycpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGNvdW50Q29udGFpbmVyLmh0bWwocmVzcG9uc2UudG90YWxDb3VudClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kbWVudUNvbnRhaW5lci5maW5kKCcuYm9keScpLmh0bWwocmVzcG9uc2UudGVtcGxhdGUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kbWVudUNvbnRhaW5lci5maW5kKCcuYm9keScpLmh0bWwoJzxwIGNsYXNzPVwibm8tY29udGVudFwiPicrQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ05vIHVucmVhZCBzdWJtaXNzaW9ucy4nKSsnPC9wPicpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgdGhpcykpXG4gICAgfSxcblxuICAgIGdldE5vdGlmaWNhdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuJG1lbnVDb250YWluZXIuZmluZCgnLmJvZHknKS5odG1sKCc8cCBjbGFzcz1cIm5vLWNvbnRlbnRcIj4nK0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdObyBuZXcgbm90aWZpY2F0aW9ucy4nKSsnPC9wPicpXG4gICAgfSxcblxuICAgIHRvZ2dsZU1lbnUoKSB7XG4gICAgICAgIGlmICh0aGlzLiRjb250YWluZXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAkKCcuZmItdXRpbGl0eS1idG4nKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgICQoJy51dGlsaXR5LW1lbnUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgIHRoaXMuJGJ0bi5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgIHRoaXMuJG1lbnVDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuZmItdXRpbGl0eS1idG4nKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgICQoJy51dGlsaXR5LW1lbnUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgIHRoaXMuJGJ0bi5wYXJlbnQoKS5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgIHRoaXMuJG1lbnVDb250YWluZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIH1cbiAgICB9LFxufSlcblxuXG5cblxuR2FybmlzaC4kZG9jLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIFxuICAgICQuZWFjaCgkKCcuZmItdXRpbGl0eS1idG4nKSwgKGksIGVsKSA9PiB7XG4gICAgICAgICBuZXcgVXRpbGl0eUl0ZW0oZWwpXG4gICAgfSlcblxuICAgICQoJy5mYi1tb2JpbGUtbmF2Jykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnc2hvdy1mYi1tZW51JylcbiAgICB9KVxuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgICB0YXJnZXQgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcudXRpbGl0eS1tZW51JylcbiAgICAgICAgYnRuID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmZiLXV0aWxpdHktYnRuJylcblxuICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCA9PSAwICYmIGJ0bi5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgJCgnLmZiLXV0aWxpdHktYnRuJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICAkKCcudXRpbGl0eS1tZW51JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIH1cbiAgICB9KVxuXG4vLyAgICAgQ3JhZnQuaW5pdFVpRWxlbWVudHMoKTtcblxuLy8gICAgIHdpbmRvdy5wbHVnaW5TdG9yZUFwcCA9IG5ldyBWdWUoe1xuLy8gICAgICAgICBlbDogJyNjb250ZW50J1xuLy8gICAgIH0pO1xufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvZm9ybWJ1aWxkZXIuanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Njc3MvZm9ybWJ1aWxkZXIuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9