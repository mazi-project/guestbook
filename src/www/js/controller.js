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

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Controller).call(this));

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
				var tag = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

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
                               /*
				*alert(title + ': ' + message);
                               */
                                 alert('Please fill in both the Name and Text fields. The uploaded image size should not exceed 50MB'); 			


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0EwQk0sVTs7O0FBRUosc0JBQVksR0FBWixFQUFpQjtBQUFBOztBQUFBOztBQUloQixTQUFLLEdBQUwsR0FBVyxHQUFYOztBQUVBLE9BQUksVUFBSixDQUFlO0FBQ2QscUJBQWlCLFlBREg7QUFFZCxpQkFBYTtBQUZDLElBQWY7Ozs7O0FBUUEsc0JBQVMsRUFBVCxDQUFZLE9BQVosRUFBb0IsTUFBSyxlQUF6Qjs7O0FBR0EsT0FBSSxTQUFTLHdCQUFJLGlCQUFPLGNBQVgsQ0FBYjtBQUNTLFVBQU8sRUFBUCxDQUFVLG9CQUFWLEVBQWdDLFVBQVMsSUFBVCxFQUFlO0FBQzlDLHVCQUFTLE9BQVQsQ0FBaUIsb0JBQWpCLEVBQXNDLElBQXRDO0FBQ0EsSUFGRDtBQUdBLFVBQU8sRUFBUCxDQUFVLGdCQUFWLEVBQTRCLFVBQVMsSUFBVCxFQUFlO0FBQzFDLHVCQUFTLE9BQVQsQ0FBaUIsZ0JBQWpCLEVBQWtDLElBQWxDO0FBQ0EsSUFGRDtBQUdBLFVBQU8sRUFBUCxDQUFVLG9CQUFWLEVBQWdDLFVBQVMsSUFBVCxFQUFlO0FBQzlDLHVCQUFTLE9BQVQsQ0FBaUIsZ0JBQWpCLEVBQWtDLElBQWxDO0FBQ0EsSUFGRDtBQUdBLFVBQU8sRUFBUCxDQUFVLG1CQUFWLEVBQStCLFVBQVMsSUFBVCxFQUFlO0FBQzdDLHVCQUFTLE9BQVQsQ0FBaUIsbUJBQWpCLEVBQXFDLElBQXJDO0FBQ0EsSUFGRDs7O0FBS0EsU0FBSyxRQUFMLEdBQWdCLHlCQUFoQjtBQUNBLFNBQUssR0FBTCxDQUFTLGVBQVQsQ0FBeUIsSUFBekIsQ0FBOEIsTUFBSyxRQUFuQzs7QUFqQ087QUFtQ2hCOzs7Ozs7d0NBSTRCO0FBQUEsUUFB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QWMsWUFBZCxDQUEyQixJQUEzQixDQUFnQyxJQUFJLHFCQUFXLFFBQWYsQ0FBd0I7QUFDdkQsZUFBVSxFQUFFLFFBQUY7QUFENkMsS0FBeEIsQ0FBaEM7QUFHQTs7O29DQUVnQjtBQUNoQixNQUFFLE1BQUYsRUFBVSxXQUFWO0FBQ0EsTUFBRSxNQUFGLEVBQVUsUUFBVixDQUFtQixZQUFuQjs7QUFFQSxTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLEtBQTNCO0FBQ0EsU0FBSyxRQUFMLENBQWMsYUFBZCxDQUE0QixJQUE1QixDQUFpQyw4QkFBbUIsRUFBRSxTQUFTLGlCQUFPLE9BQWxCLEVBQW5CLENBQWpDO0FBQ0EsU0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixLQUF6QjtBQUNBLFNBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsS0FBeEI7QUFDQSxTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLEtBQTNCO0FBQ0E7OztvQ0FFZ0I7QUFDaEIsVUFBTSxpQkFBTjtBQUNBOzs7d0NBRW9CO0FBQ3BCLFVBQU0sZ0JBQU47QUFDQTs7O21DQUVlLEksRUFBSyxLLEVBQU87O0FBRTNCLFFBQUksUUFBUSxDQUFDLE9BQUssUUFBTixFQUFnQixXQUFoQixFQUFaO0FBQ0EsUUFBSSxVQUFVLE1BQU0sT0FBcEI7O0FBRUEsVUFBTSxRQUFNLElBQU4sR0FBVyxPQUFqQjtBQUNBOzs7aUNBRWEsQ0FFYjs7OztHQXhJc0IscUJBQVcsVTs7QUEySW5DOzttQkFFYyxVIiwiZmlsZSI6ImNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0elxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA4LTI5IDIwOjQ5OjI5XG4qL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgU0lPIGZyb20gJ3NvY2tldGlvJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcblxuaW1wb3J0IE1haW5WaWV3IGZyb20gJ3ZpZXdzL21haW5fdmlldyc7XG5pbXBvcnQgU3VibWlzc2lvbkxpc3RWaWV3IGZyb20gJ3ZpZXdzL3N1Ym1pc3Npb25fbGlzdF92aWV3JztcbmltcG9ydCBUYWdMaXN0VmlldyBmcm9tICd2aWV3cy90YWdfbGlzdF92aWV3JztcbmltcG9ydCBTdWJtaXNzaW9uSW5wdXRWaWV3IGZyb20gJ3ZpZXdzL3N1Ym1pc3Npb25faW5wdXRfdmlldyc7XG5pbXBvcnQgU3VibWlzc2lvblZpZXcgZnJvbSAndmlld3Mvc3VibWlzc2lvbl92aWV3JztcbmltcG9ydCBBZG1pblZpZXcgZnJvbSAndmlld3MvYWRtaW5fdmlldyc7XG5pbXBvcnQgVGFibGV0VmlldyBmcm9tICd2aWV3cy90YWJsZXRfdmlldyc7XG5pbXBvcnQgUHJvamVjdGlvblZpZXcgZnJvbSAndmlld3MvcHJvamVjdGlvbl92aWV3JztcblxuaW1wb3J0IGhlYWRlclRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2hlYWRlcl90bXBsLmh0bWwnO1xuaW1wb3J0IGZvb3RlclRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL2Zvb3Rlcl90bXBsLmh0bWwnO1xuXG5jbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5Db250cm9sbGVyIHtcblx0XHRcblx0XHRjb25zdHJ1Y3RvcihhcHApIHtcblxuXHRcdFx0c3VwZXIoKTtcblxuXHRcdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0XHRcblx0XHRcdGFwcC5hZGRSZWdpb25zKHtcblx0XHRcdFx0Y29udGFpbmVyUmVnaW9uOiBcIiNjb250YWluZXJcIixcblx0XHRcdFx0bW9kYWxSZWdpb246IFwiI21vZGFsLWNvbnRhaW5lclwiXG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Ly9yZWdpc3RlciBjbGllbnQgZXZlbnRzXG5cdFx0XHQvKkJhY2tib25lLm9uKCdkaWFsb2c6b3BlbicsIHRoaXMub3BlbkRpYWxvZywgdGhpcyk7XG5cdFx0XHRCYWNrYm9uZS5vbignZGlhbG9nOmNsb3NlJywgdGhpcy5jbG9zZURpYWxvZywgdGhpcyk7Ki9cblx0XHRcdEJhY2tib25lLm9uKCdlcnJvcicsdGhpcy5vcGVuRXJyb3JEaWFsb2csIHRoaXMpO1xuXG5cdFx0XHQvL3JlZ2lzdGVyIHNvY2tldCBldmVudHNcblx0XHRcdHZhciBzb2NrZXQgPSBTSU8oQ29uZmlnLndlYl9zb2NrZXRfdXJsKTtcbiAgICAgICAgICAgIHNvY2tldC5vbignc3VibWlzc2lvbjpjaGFuZ2VkJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgXHRCYWNrYm9uZS50cmlnZ2VyKCdzdWJtaXNzaW9uOmNoYW5nZWQnLGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzb2NrZXQub24oJ3N1Ym1pc3Npb246bmV3JywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgXHRCYWNrYm9uZS50cmlnZ2VyKCdzdWJtaXNzaW9uOm5ldycsZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldC5vbignc3VibWlzc2lvbjpyZW1vdmVkJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgXHRCYWNrYm9uZS50cmlnZ2VyKCdzdWJtaXNzaW9uOm5ldycsZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldC5vbignZmVlZGJhY2s6c2Nhbm5pbmcnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ2ZlZWRiYWNrOnNjYW5uaW5nJyxkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL2xvYWQgbWFpbnZpZXdcbiAgICAgICAgICAgIHRoaXMubWFpblZpZXcgPSBuZXcgTWFpblZpZXcoKTtcbiAgICAgICAgICAgIHRoaXMuYXBwLmNvbnRhaW5lclJlZ2lvbi5zaG93KHRoaXMubWFpblZpZXcpO1xuXHRcdFx0XG5cdFx0fVxuXHRcdFx0XG5cdFx0LyogUk9VVEVTICovXG5cblx0XHRzaG93U3VibWlzc2lvbkxpc3QodGFnPW51bGwpIHtcblx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygpO1xuXG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoaGVhZGVyVGVtcGxhdGUpXG5cdFx0XHR9KSk7XG5cblx0XHRcdC8vdXBkYXRlIGxpc3Qgdmlld1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFN1Ym1pc3Npb25MaXN0Vmlldyh7IHRhZzogdGFnLCBkYXRhc2V0OiBDb25maWcuZGF0YXNldCB9KSk7XG5cblx0XHRcdC8vc2V0IGlucHV0IHZpZXdcblx0XHRcdGlmICghKHRoaXMubWFpblZpZXcudG9wUmVnaW9uLmN1cnJlbnRWaWV3IGluc3RhbmNlb2YgU3VibWlzc2lvbklucHV0VmlldykpXG5cdFx0XHRcdHRoaXMubWFpblZpZXcudG9wUmVnaW9uLnNob3cobmV3IFN1Ym1pc3Npb25JbnB1dFZpZXcoKSk7XG5cblx0XHRcdC8vc2V0IHRhZ3ZpZXdcblx0XHRcdGlmICh0aGlzLm1haW5WaWV3LnRhZ3NSZWdpb24uY3VycmVudFZpZXcgaW5zdGFuY2VvZiBUYWdMaXN0Vmlldylcblx0XHRcdFx0dGhpcy5tYWluVmlldy50YWdzUmVnaW9uLmN1cnJlbnRWaWV3LnNldFRhZyh0YWcpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLm1haW5WaWV3LnRhZ3NSZWdpb24uc2hvdyhuZXcgVGFnTGlzdFZpZXcoeyB0YWc6IHRhZywgZGF0YXNldDogQ29uZmlnLmRhdGFzZXQgfSkpO1xuXG5cdFx0XHR0aGlzLm1haW5WaWV3LmZvb3RlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoZm9vdGVyVGVtcGxhdGUpXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cdFx0c2hvd1N1Ym1pc3Npb24oaWQpIHtcblx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygpO1xuXG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFN1Ym1pc3Npb25WaWV3KHsgaWQ6IGlkIH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcudGFnc1JlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy50b3BSZWdpb24ucmVzZXQoKTtcblx0XHRcdHRoaXMubWFpblZpZXcuZm9vdGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZShmb290ZXJUZW1wbGF0ZSlcblx0XHRcdH0pKTtcblx0XHR9XG5cblx0XHRzaG93QWRtaW5QYWdlKCkge1xuXHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCk7XG5cblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cImxpbmstYmFja1wiPjxhIGhyZWY9XCIjXCI+PHNwYW4gY2xhc3M9XCJjbG9zZS1idXR0b25cIj48L3NwYW4+PC9hPjwvZGl2PicpXG5cdFx0XHR9KSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgQWRtaW5WaWV3KHsgZGF0YXNldDogQ29uZmlnLmRhdGFzZXQgfSkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy50YWdzUmVnaW9uLnJlc2V0KCk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnRvcFJlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5mb290ZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHRcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKGZvb3RlclRlbXBsYXRlKVxuXHRcdFx0fSkpO1xuXHRcdH1cblxuXHRcdHNob3dUYWJsZXRWaWV3KCkge1xuXHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCk7XG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoXCJ0YWJsZXRcIik7XG5cblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cImxvZ29cIj48aW1nIHNyYz1cImltYWdlcy9sb2dvLnBuZ1wiPjwvZGl2PjxzcGFuIGNsYXNzPVwibGluZS1ob3Jpem9udGFsXCI+PC9zcGFuPicpXG5cdFx0XHR9KSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgVGFibGV0Vmlldyh7IGRhdGFzZXQ6IENvbmZpZy5kYXRhc2V0IH0pICk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnRhZ3NSZWdpb24ucmVzZXQoKTtcblx0XHRcdHRoaXMubWFpblZpZXcudG9wUmVnaW9uLnJlc2V0KCk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmZvb3RlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoZm9vdGVyVGVtcGxhdGUpXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cdFx0c2hvd1Byb2plY3Rpb24oKSB7XG5cdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoKTtcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcyhcInByb2plY3Rpb25cIik7XG5cblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnJlc2V0KCk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgUHJvamVjdGlvblZpZXcoeyBkYXRhc2V0OiBDb25maWcuZGF0YXNldCB9KSApO1xuXHRcdFx0dGhpcy5tYWluVmlldy50YWdzUmVnaW9uLnJlc2V0KCk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnRvcFJlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5mb290ZXJSZWdpb24ucmVzZXQoKTtcblx0XHR9XG5cblx0XHRwb3N0U3VibWlzc2lvbigpIHtcblx0XHRcdGFsZXJ0KCdwb3N0IHN1Ym1pc3Npb24nKTtcblx0XHR9XG5cblx0XHRzaG93U2Nhbm5pbmdEaWFsb2coKSB7XG5cdFx0XHRhbGVydChcIlNjYW5uaW5nRGlhbG9nXCIpO1xuXHRcdH1cblxuXHRcdG9wZW5FcnJvckRpYWxvZyh0eXBlLGVycm9yKSB7XG5cblx0XHRcdHZhciB0aXRsZSA9ICh0eXBlKyctZXJyb3InKS50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0dmFyIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuXG5cdFx0XHRhbGVydCh0aXRsZSsnOiAnK21lc3NhZ2UpO1xuXHRcdH1cblxuXHRcdGNsb3NlRGlhbG9nKCkge1xuXG5cdFx0fVxuXG5cdFx0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyXG5cdCJdfQ==
