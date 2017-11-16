define(['exports', 'backbone', 'marionette', 'socketio', 'config', 'views/main_view', 'views/submission_list_view', 'views/tag_list_view', 'views/submission_input_view', 'views/submission_view', 'views/admin_view', 'views/tablet_view', 'views/projection_view', 'text!templates/header_tmpl.html', 'text!templates/footer_tmpl.html'], function (exports, _backbone, _marionette, _socketio, _config, _main_view, _submission_list_view, _tag_list_view, _submission_input_view, _submission_view, _admin_view, _tablet_view, _projection_view, _header_tmpl, _footer_tmpl) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutz
 * @Last Modified time: 2016-08-29 20:49:29
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	var _marionette2 = _interopRequireDefault(_marionette);

	var _socketio2 = _interopRequireDefault(_socketio);

	var _config2 = _interopRequireDefault(_config);

	var _main_view2 = _interopRequireDefault(_main_view);

	var _submission_list_view2 = _interopRequireDefault(_submission_list_view);

	var _tag_list_view2 = _interopRequireDefault(_tag_list_view);

	var _submission_input_view2 = _interopRequireDefault(_submission_input_view);

	var _submission_view2 = _interopRequireDefault(_submission_view);

	var _admin_view2 = _interopRequireDefault(_admin_view);

	var _tablet_view2 = _interopRequireDefault(_tablet_view);

	var _projection_view2 = _interopRequireDefault(_projection_view);

	var _header_tmpl2 = _interopRequireDefault(_header_tmpl);

	var _footer_tmpl2 = _interopRequireDefault(_footer_tmpl);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Controller = function (_Marionette$Controlle) {
		_inherits(Controller, _Marionette$Controlle);

		function Controller(app) {
			_classCallCheck(this, Controller);

			var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this));

			_this.app = app;

			app.addRegions({
				containerRegion: "#container",
				modalRegion: "#modal-container"
			});

			//register client events
			/*Backbone.on('dialog:open', this.openDialog, this);
   Backbone.on('dialog:close', this.closeDialog, this);*/
			_backbone2.default.on('error', _this.openErrorDialog, _this);

			//register socket events
			var socket = (0, _socketio2.default)(_config2.default.web_socket_url);
			socket.on('submission:changed', function (data) {
				_backbone2.default.trigger('submission:changed', data);
			});
			socket.on('submission:new', function (data) {
				_backbone2.default.trigger('submission:new', data);
			});
			socket.on('submission:removed', function (data) {
				_backbone2.default.trigger('submission:new', data);
			});
			socket.on('feedback:scanning', function (data) {
				_backbone2.default.trigger('feedback:scanning', data);
			});

			//load mainview
			_this.mainView = new _main_view2.default();
			_this.app.containerRegion.show(_this.mainView);

			return _this;
		}

		/* ROUTES */

		_createClass(Controller, [{
			key: 'showSubmissionList',
			value: function showSubmissionList() {
				var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

				$('body').removeClass();

				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_header_tmpl2.default)
				}));

				//update list view
				this.mainView.contentRegion.show(new _submission_list_view2.default({ tag: tag, dataset: _config2.default.dataset }));

				//set input view
				if (!(this.mainView.topRegion.currentView instanceof _submission_input_view2.default)) this.mainView.topRegion.show(new _submission_input_view2.default());

				//set tagview
				if (this.mainView.tagsRegion.currentView instanceof _tag_list_view2.default) this.mainView.tagsRegion.currentView.setTag(tag);else this.mainView.tagsRegion.show(new _tag_list_view2.default({ tag: tag, dataset: _config2.default.dataset }));

				this.mainView.footerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_footer_tmpl2.default)
				}));
			}
		}, {
			key: 'showSubmission',
			value: function showSubmission(id) {
				$('body').removeClass();

				this.mainView.headerRegion.reset();
				this.mainView.contentRegion.show(new _submission_view2.default({ id: id }));
				this.mainView.tagsRegion.reset();
				this.mainView.topRegion.reset();
				this.mainView.footerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_footer_tmpl2.default)
				}));
			}
		}, {
			key: 'showAdminPage',
			value: function showAdminPage() {
				$('body').removeClass();

				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template('<div class="link-back"><a href="#"><span class="close-button"></span></a></div>')
				}));
				this.mainView.contentRegion.show(new _admin_view2.default({ dataset: _config2.default.dataset }));
				this.mainView.tagsRegion.reset();
				this.mainView.topRegion.reset();
				this.mainView.footerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_footer_tmpl2.default)
				}));
			}
		}, {
			key: 'showTabletView',
			value: function showTabletView() {
				$('body').removeClass();
				$('body').addClass("tablet");

				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template('<div class="logo"><img src="images/logo.png"></div><span class="line-horizontal"></span>')
				}));
				this.mainView.contentRegion.show(new _tablet_view2.default({ dataset: _config2.default.dataset }));
				this.mainView.tagsRegion.reset();
				this.mainView.topRegion.reset();
				this.mainView.footerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_footer_tmpl2.default)
				}));
			}
		}, {
			key: 'showProjection',
			value: function showProjection() {
				$('body').removeClass();
				$('body').addClass("projection");

				this.mainView.headerRegion.reset();
				this.mainView.contentRegion.show(new _projection_view2.default({ dataset: _config2.default.dataset }));
				this.mainView.tagsRegion.reset();
				this.mainView.topRegion.reset();
				this.mainView.footerRegion.reset();
			}
		}, {
			key: 'postSubmission',
			value: function postSubmission() {
				alert('post submission');
			}
		}, {
			key: 'showScanningDialog',
			value: function showScanningDialog() {
				alert("ScanningDialog");
			}
		}, {
			key: 'openErrorDialog',
			value: function openErrorDialog(type, error) {

				var title = (type + '-error').toUpperCase();
				var message = error.message;

				alert(title + ': ' + message);
			}
		}, {
			key: 'closeDialog',
			value: function closeDialog() {}
		}]);

		return Controller;
	}(_marionette2.default.Controller);

	;

	exports.default = Controller;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbIkNvbnRyb2xsZXIiLCJhcHAiLCJhZGRSZWdpb25zIiwiY29udGFpbmVyUmVnaW9uIiwibW9kYWxSZWdpb24iLCJvbiIsIm9wZW5FcnJvckRpYWxvZyIsInNvY2tldCIsIndlYl9zb2NrZXRfdXJsIiwiZGF0YSIsInRyaWdnZXIiLCJtYWluVmlldyIsInNob3ciLCJ0YWciLCIkIiwicmVtb3ZlQ2xhc3MiLCJoZWFkZXJSZWdpb24iLCJJdGVtVmlldyIsInRlbXBsYXRlIiwiXyIsImNvbnRlbnRSZWdpb24iLCJkYXRhc2V0IiwidG9wUmVnaW9uIiwiY3VycmVudFZpZXciLCJ0YWdzUmVnaW9uIiwic2V0VGFnIiwiZm9vdGVyUmVnaW9uIiwiaWQiLCJyZXNldCIsImFkZENsYXNzIiwiYWxlcnQiLCJ0eXBlIiwiZXJyb3IiLCJ0aXRsZSIsInRvVXBwZXJDYXNlIiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F3Qk1BLFU7OztBQUVKLHNCQUFZQyxHQUFaLEVBQWlCO0FBQUE7O0FBQUE7O0FBSWhCLFNBQUtBLEdBQUwsR0FBV0EsR0FBWDs7QUFFQUEsT0FBSUMsVUFBSixDQUFlO0FBQ2RDLHFCQUFpQixZQURIO0FBRWRDLGlCQUFhO0FBRkMsSUFBZjs7QUFLQTtBQUNBOztBQUVBLHNCQUFTQyxFQUFULENBQVksT0FBWixFQUFvQixNQUFLQyxlQUF6Qjs7QUFFQTtBQUNBLE9BQUlDLFNBQVMsd0JBQUksaUJBQU9DLGNBQVgsQ0FBYjtBQUNTRCxVQUFPRixFQUFQLENBQVUsb0JBQVYsRUFBZ0MsVUFBU0ksSUFBVCxFQUFlO0FBQzlDLHVCQUFTQyxPQUFULENBQWlCLG9CQUFqQixFQUFzQ0QsSUFBdEM7QUFDQSxJQUZEO0FB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QUwsQ0FBY2EsVUFBZCxDQUF5QkksS0FBekI7QUFDQSxTQUFLakIsUUFBTCxDQUFjVyxTQUFkLENBQXdCTSxLQUF4QjtBQUNBLFNBQUtqQixRQUFMLENBQWNlLFlBQWQsQ0FBMkJFLEtBQTNCO0FBQ0E7OztvQ0FFZ0I7QUFDaEJFLFVBQU0saUJBQU47QUFDQTs7O3dDQUVvQjtBQUNwQkEsVUFBTSxnQkFBTjtBQUNBOzs7bUNBRWVDLEksRUFBS0MsSyxFQUFPOztBQUUzQixRQUFJQyxRQUFRLENBQUNGLE9BQUssUUFBTixFQUFnQkcsV0FBaEIsRUFBWjtBQUNBLFFBQUlDLFVBQVVILE1BQU1HLE9BQXBCOztBQUVBTCxVQUFNRyxRQUFNLElBQU4sR0FBV0UsT0FBakI7QUFDQTs7O2lDQUVhLENBRWI7Ozs7R0F4SXNCLHFCQUFXbkMsVTs7QUEySW5DOzttQkFFY0EsVSIsImZpbGUiOiJjb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHpcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wOC0yOSAyMDo0OToyOVxuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IFNJTyBmcm9tICdzb2NrZXRpbyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbmltcG9ydCBNYWluVmlldyBmcm9tICd2aWV3cy9tYWluX3ZpZXcnO1xuaW1wb3J0IFN1Ym1pc3Npb25MaXN0VmlldyBmcm9tICd2aWV3cy9zdWJtaXNzaW9uX2xpc3Rfdmlldyc7XG5pbXBvcnQgVGFnTGlzdFZpZXcgZnJvbSAndmlld3MvdGFnX2xpc3Rfdmlldyc7XG5pbXBvcnQgU3VibWlzc2lvbklucHV0VmlldyBmcm9tICd2aWV3cy9zdWJtaXNzaW9uX2lucHV0X3ZpZXcnO1xuaW1wb3J0IFN1Ym1pc3Npb25WaWV3IGZyb20gJ3ZpZXdzL3N1Ym1pc3Npb25fdmlldyc7XG5pbXBvcnQgQWRtaW5WaWV3IGZyb20gJ3ZpZXdzL2FkbWluX3ZpZXcnO1xuaW1wb3J0IFRhYmxldFZpZXcgZnJvbSAndmlld3MvdGFibGV0X3ZpZXcnO1xuaW1wb3J0IFByb2plY3Rpb25WaWV3IGZyb20gJ3ZpZXdzL3Byb2plY3Rpb25fdmlldyc7XG5cbmltcG9ydCBoZWFkZXJUZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9oZWFkZXJfdG1wbC5odG1sJztcbmltcG9ydCBmb290ZXJUZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9mb290ZXJfdG1wbC5odG1sJztcblxuY2xhc3MgQ29udHJvbGxlciBleHRlbmRzIE1hcmlvbmV0dGUuQ29udHJvbGxlciB7XG5cdFx0XG5cdFx0Y29uc3RydWN0b3IoYXBwKSB7XG5cblx0XHRcdHN1cGVyKCk7XG5cblx0XHRcdHRoaXMuYXBwID0gYXBwO1xuXHRcdFx0XG5cdFx0XHRhcHAuYWRkUmVnaW9ucyh7XG5cdFx0XHRcdGNvbnRhaW5lclJlZ2lvbjogXCIjY29udGFpbmVyXCIsXG5cdFx0XHRcdG1vZGFsUmVnaW9uOiBcIiNtb2RhbC1jb250YWluZXJcIlxuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdC8vcmVnaXN0ZXIgY2xpZW50IGV2ZW50c1xuXHRcdFx0LypCYWNrYm9uZS5vbignZGlhbG9nOm9wZW4nLCB0aGlzLm9wZW5EaWFsb2csIHRoaXMpO1xuXHRcdFx0QmFja2JvbmUub24oJ2RpYWxvZzpjbG9zZScsIHRoaXMuY2xvc2VEaWFsb2csIHRoaXMpOyovXG5cdFx0XHRCYWNrYm9uZS5vbignZXJyb3InLHRoaXMub3BlbkVycm9yRGlhbG9nLCB0aGlzKTtcblxuXHRcdFx0Ly9yZWdpc3RlciBzb2NrZXQgZXZlbnRzXG5cdFx0XHR2YXIgc29ja2V0ID0gU0lPKENvbmZpZy53ZWJfc29ja2V0X3VybCk7XG4gICAgICAgICAgICBzb2NrZXQub24oJ3N1Ym1pc3Npb246Y2hhbmdlZCcsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIFx0QmFja2JvbmUudHJpZ2dlcignc3VibWlzc2lvbjpjaGFuZ2VkJyxkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdzdWJtaXNzaW9uOm5ldycsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIFx0QmFja2JvbmUudHJpZ2dlcignc3VibWlzc2lvbjpuZXcnLGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzb2NrZXQub24oJ3N1Ym1pc3Npb246cmVtb3ZlZCcsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIFx0QmFja2JvbmUudHJpZ2dlcignc3VibWlzc2lvbjpuZXcnLGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzb2NrZXQub24oJ2ZlZWRiYWNrOnNjYW5uaW5nJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgXHRCYWNrYm9uZS50cmlnZ2VyKCdmZWVkYmFjazpzY2FubmluZycsZGF0YSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy9sb2FkIG1haW52aWV3XG4gICAgICAgICAgICB0aGlzLm1haW5WaWV3ID0gbmV3IE1haW5WaWV3KCk7XG4gICAgICAgICAgICB0aGlzLmFwcC5jb250YWluZXJSZWdpb24uc2hvdyh0aGlzLm1haW5WaWV3KTtcblx0XHRcdFxuXHRcdH1cblx0XHRcdFxuXHRcdC8qIFJPVVRFUyAqL1xuXG5cdFx0c2hvd1N1Ym1pc3Npb25MaXN0KHRhZz1udWxsKSB7XG5cdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoKTtcblxuXHRcdFx0dGhpcy5tYWluVmlldy5oZWFkZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHRcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKGhlYWRlclRlbXBsYXRlKVxuXHRcdFx0fSkpO1xuXG5cdFx0XHQvL3VwZGF0ZSBsaXN0IHZpZXdcblx0XHRcdHRoaXMubWFpblZpZXcuY29udGVudFJlZ2lvbi5zaG93KG5ldyBTdWJtaXNzaW9uTGlzdFZpZXcoeyB0YWc6IHRhZywgZGF0YXNldDogQ29uZmlnLmRhdGFzZXQgfSkpO1xuXG5cdFx0XHQvL3NldCBpbnB1dCB2aWV3XG5cdFx0XHRpZiAoISh0aGlzLm1haW5WaWV3LnRvcFJlZ2lvbi5jdXJyZW50VmlldyBpbnN0YW5jZW9mIFN1Ym1pc3Npb25JbnB1dFZpZXcpKVxuXHRcdFx0XHR0aGlzLm1haW5WaWV3LnRvcFJlZ2lvbi5zaG93KG5ldyBTdWJtaXNzaW9uSW5wdXRWaWV3KCkpO1xuXG5cdFx0XHQvL3NldCB0YWd2aWV3XG5cdFx0XHRpZiAodGhpcy5tYWluVmlldy50YWdzUmVnaW9uLmN1cnJlbnRWaWV3IGluc3RhbmNlb2YgVGFnTGlzdFZpZXcpXG5cdFx0XHRcdHRoaXMubWFpblZpZXcudGFnc1JlZ2lvbi5jdXJyZW50Vmlldy5zZXRUYWcodGFnKTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5tYWluVmlldy50YWdzUmVnaW9uLnNob3cobmV3IFRhZ0xpc3RWaWV3KHsgdGFnOiB0YWcsIGRhdGFzZXQ6IENvbmZpZy5kYXRhc2V0IH0pKTtcblxuXHRcdFx0dGhpcy5tYWluVmlldy5mb290ZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHRcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKGZvb3RlclRlbXBsYXRlKVxuXHRcdFx0fSkpO1xuXHRcdH1cblxuXHRcdHNob3dTdWJtaXNzaW9uKGlkKSB7XG5cdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoKTtcblxuXHRcdFx0dGhpcy5tYWluVmlldy5oZWFkZXJSZWdpb24ucmVzZXQoKTtcblx0XHRcdHRoaXMubWFpblZpZXcuY29udGVudFJlZ2lvbi5zaG93KG5ldyBTdWJtaXNzaW9uVmlldyh7IGlkOiBpZCB9KSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnRhZ3NSZWdpb24ucmVzZXQoKTtcblx0XHRcdHRoaXMubWFpblZpZXcudG9wUmVnaW9uLnJlc2V0KCk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmZvb3RlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoZm9vdGVyVGVtcGxhdGUpXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cdFx0c2hvd0FkbWluUGFnZSgpIHtcblx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygpO1xuXG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoJzxkaXYgY2xhc3M9XCJsaW5rLWJhY2tcIj48YSBocmVmPVwiI1wiPjxzcGFuIGNsYXNzPVwiY2xvc2UtYnV0dG9uXCI+PC9zcGFuPjwvYT48L2Rpdj4nKVxuXHRcdFx0fSkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IEFkbWluVmlldyh7IGRhdGFzZXQ6IENvbmZpZy5kYXRhc2V0IH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcudGFnc1JlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy50b3BSZWdpb24ucmVzZXQoKTtcblx0XHRcdHRoaXMubWFpblZpZXcuZm9vdGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZShmb290ZXJUZW1wbGF0ZSlcblx0XHRcdH0pKTtcblx0XHR9XG5cblx0XHRzaG93VGFibGV0VmlldygpIHtcblx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygpO1xuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKFwidGFibGV0XCIpO1xuXG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoJzxkaXYgY2xhc3M9XCJsb2dvXCI+PGltZyBzcmM9XCJpbWFnZXMvbG9nby5wbmdcIj48L2Rpdj48c3BhbiBjbGFzcz1cImxpbmUtaG9yaXpvbnRhbFwiPjwvc3Bhbj4nKVxuXHRcdFx0fSkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFRhYmxldFZpZXcoeyBkYXRhc2V0OiBDb25maWcuZGF0YXNldCB9KSApO1xuXHRcdFx0dGhpcy5tYWluVmlldy50YWdzUmVnaW9uLnJlc2V0KCk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnRvcFJlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5mb290ZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHRcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKGZvb3RlclRlbXBsYXRlKVxuXHRcdFx0fSkpO1xuXHRcdH1cblxuXHRcdHNob3dQcm9qZWN0aW9uKCkge1xuXHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCk7XG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoXCJwcm9qZWN0aW9uXCIpO1xuXG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFByb2plY3Rpb25WaWV3KHsgZGF0YXNldDogQ29uZmlnLmRhdGFzZXQgfSkgKTtcblx0XHRcdHRoaXMubWFpblZpZXcudGFnc1JlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy50b3BSZWdpb24ucmVzZXQoKTtcblx0XHRcdHRoaXMubWFpblZpZXcuZm9vdGVyUmVnaW9uLnJlc2V0KCk7XG5cdFx0fVxuXG5cdFx0cG9zdFN1Ym1pc3Npb24oKSB7XG5cdFx0XHRhbGVydCgncG9zdCBzdWJtaXNzaW9uJyk7XG5cdFx0fVxuXG5cdFx0c2hvd1NjYW5uaW5nRGlhbG9nKCkge1xuXHRcdFx0YWxlcnQoXCJTY2FubmluZ0RpYWxvZ1wiKTtcblx0XHR9XG5cblx0XHRvcGVuRXJyb3JEaWFsb2codHlwZSxlcnJvcikge1xuXG5cdFx0XHR2YXIgdGl0bGUgPSAodHlwZSsnLWVycm9yJykudG9VcHBlckNhc2UoKTtcblx0XHRcdHZhciBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcblxuXHRcdFx0YWxlcnQodGl0bGUrJzogJyttZXNzYWdlKTtcblx0XHR9XG5cblx0XHRjbG9zZURpYWxvZygpIHtcblxuXHRcdH1cblxuXHRcdFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlclxuXHQiXX0=