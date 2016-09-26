define(['exports', 'jquery', 'backbone', 'marionette', 'controller'], function (exports, _jquery, _backbone, _marionette, _controller) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-13 17:36:56
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _jquery2 = _interopRequireDefault(_jquery);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _marionette2 = _interopRequireDefault(_marionette);

	var _controller2 = _interopRequireDefault(_controller);

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

	var App = function (_Backbone$Marionette$) {
		_inherits(App, _Backbone$Marionette$);

		function App() {
			_classCallCheck(this, App);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

			//add app initializer
			_this.addInitializer(function (options) {
				_backbone2.default.history.start();

				// support cross origin sharing
				_jquery2.default.support.cors = true;

				_marionette2.default.Behaviors.behaviorsLookup = function () {
					return window.Behaviors;
				};
			});

			//init router
			_this.Router = new _marionette2.default.AppRouter({
				controller: new _controller2.default(_this),
				appRoutes: {
					'scanning': 'showScanningDialog',
					'tag/:tag': 'showSubmissionList',
					'new': 'postSubmission',
					'submission/:id': 'showSubmission',
					'admin': 'showAdminPage',
					'tablet': 'showTabletView',
					'projection': 'showProjection',
					'*actions': 'showSubmissionList'
				}
			});
			return _this;
		}

		return App;
	}(_backbone2.default.Marionette.Application);

	exports.default = App;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FjTSxHOzs7QUFFTCxpQkFBYztBQUFBOztBQUFBOzs7QUFJYixTQUFLLGNBQUwsQ0FBcUIsVUFBUyxPQUFULEVBQWlCO0FBQ25DLHVCQUFTLE9BQVQsQ0FBaUIsS0FBakI7OztBQUdBLHFCQUFFLE9BQUYsQ0FBVSxJQUFWLEdBQWUsSUFBZjs7QUFFQSx5QkFBVyxTQUFYLENBQXFCLGVBQXJCLEdBQXVDLFlBQVc7QUFDOUMsWUFBTyxPQUFPLFNBQWQ7QUFDSCxLQUZEO0FBSUYsSUFWRDs7O0FBYUEsU0FBSyxNQUFMLEdBQWMsSUFBSSxxQkFBVyxTQUFmLENBQXlCO0FBQ3RDLGdCQUFZLCtCQUQwQjtBQUV0QyxlQUFXO0FBQ1YsaUJBQWEsb0JBREg7QUFFVixpQkFBYSxvQkFGSDtBQUdWLFlBQVEsZ0JBSEU7QUFJVix1QkFBbUIsZ0JBSlQ7QUFLVixjQUFVLGVBTEE7QUFNVixlQUFXLGdCQU5EO0FBT1YsbUJBQWUsZ0JBUEw7QUFRVixpQkFBWTtBQVJGO0FBRjJCLElBQXpCLENBQWQ7QUFqQmE7QUE4QmI7OztHQWhDZ0IsbUJBQVMsVUFBVCxDQUFvQixXOzttQkFtQ3ZCLEciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTEzIDE3OjM2OjU2XG4qL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnY29udHJvbGxlcic7XG5cbmNsYXNzIEFwcCBleHRlbmRzIEJhY2tib25lLk1hcmlvbmV0dGUuQXBwbGljYXRpb24ge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHQvL2FkZCBhcHAgaW5pdGlhbGl6ZXJcblx0XHR0aGlzLmFkZEluaXRpYWxpemVyKCBmdW5jdGlvbihvcHRpb25zKXtcblx0XHRcdCAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCgpO1xuXHRcdFx0ICBcblx0XHRcdCAgLy8gc3VwcG9ydCBjcm9zcyBvcmlnaW4gc2hhcmluZ1xuXHRcdFx0ICAkLnN1cHBvcnQuY29ycz10cnVlO1xuXHRcdFx0ICBcblx0XHRcdCAgTWFyaW9uZXR0ZS5CZWhhdmlvcnMuYmVoYXZpb3JzTG9va3VwID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQgICAgICByZXR1cm4gd2luZG93LkJlaGF2aW9ycztcblx0XHRcdCAgfVxuXHRcdFx0ICBcblx0XHR9KTtcblxuXHRcdC8vaW5pdCByb3V0ZXJcblx0XHR0aGlzLlJvdXRlciA9IG5ldyBNYXJpb25ldHRlLkFwcFJvdXRlcih7XG5cdFx0XHRjb250cm9sbGVyOiBuZXcgQ29udHJvbGxlcih0aGlzKSxcblx0XHRcdGFwcFJvdXRlczoge1xuXHRcdFx0XHQnc2Nhbm5pbmcnIDogJ3Nob3dTY2FubmluZ0RpYWxvZycsXG5cdFx0XHRcdCd0YWcvOnRhZycgOiAnc2hvd1N1Ym1pc3Npb25MaXN0Jyxcblx0XHRcdFx0J25ldycgOiAncG9zdFN1Ym1pc3Npb24nLFxuXHRcdFx0XHQnc3VibWlzc2lvbi86aWQnIDogJ3Nob3dTdWJtaXNzaW9uJyxcblx0XHRcdFx0J2FkbWluJyA6ICdzaG93QWRtaW5QYWdlJyxcblx0XHRcdFx0J3RhYmxldCcgOiAnc2hvd1RhYmxldFZpZXcnLFxuXHRcdFx0XHQncHJvamVjdGlvbicgOiAnc2hvd1Byb2plY3Rpb24nLFxuXHRcdFx0XHQnKmFjdGlvbnMnOiAnc2hvd1N1Ym1pc3Npb25MaXN0J1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiJdfQ==