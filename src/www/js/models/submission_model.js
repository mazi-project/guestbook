define(['exports', 'backbone', 'config'], function (exports, _backbone, _config) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-01 20:47:41
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	var _config2 = _interopRequireDefault(_config);

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

	var SubmissionModel = function (_Backbone$Model) {
		_inherits(SubmissionModel, _Backbone$Model);

		function SubmissionModel() {
			_classCallCheck(this, SubmissionModel);

			return _possibleConstructorReturn(this, (SubmissionModel.__proto__ || Object.getPrototypeOf(SubmissionModel)).apply(this, arguments));
		}

		_createClass(SubmissionModel, [{
			key: 'urlRoot',
			get: function get() {
				return _config2.default['web_service_url'] + "submissions";
			}
		}, {
			key: 'idAttribute',
			get: function get() {
				return '_id';
			}
		}, {
			key: 'defaults',
			get: function get() {
				return {
					files: [],
					comments: [],
					text: '',
					tags: [],
					author: '',
					title: false
				};
			}
		}]);

		return SubmissionModel;
	}(_backbone2.default.Model);

	exports.default = SubmissionModel;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvc3VibWlzc2lvbl9tb2RlbC5qcyJdLCJuYW1lcyI6WyJTdWJtaXNzaW9uTW9kZWwiLCJmaWxlcyIsImNvbW1lbnRzIiwidGV4dCIsInRhZ3MiLCJhdXRob3IiLCJ0aXRsZSIsIm9wdGlvbnMiLCJNb2RlbCJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FVTUEsZTs7Ozs7Ozs7Ozs7dUJBQ1M7QUFBRSxXQUFPLGlCQUFPLGlCQUFQLElBQTBCLGFBQWpDO0FBQWdEOzs7dUJBRTlDO0FBQUUsV0FBTyxLQUFQO0FBQWM7Ozt1QkFFbkI7QUFDZCxXQUFPO0FBQ0hDLFlBQU8sRUFESjtBQUVIQyxlQUFVLEVBRlA7QUFHSEMsV0FBTSxFQUhIO0FBSUhDLFdBQU0sRUFKSDtBQUtIQyxhQUFRLEVBTEw7QUFNTkMsWUFBTyxLQU5EO0FBT05DLGNBQVM7QUFQSCxLQUFQO0FBU0E7Ozs7R0FmNEIsbUJBQVNDLEs7O21CQWtCeEJSLGUiLCJmaWxlIjoic3VibWlzc2lvbl9tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0wMSAyMDo0Nzo0MVxuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcblxuY2xhc3MgU3VibWlzc2lvbk1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWwge1xuXHRnZXQgdXJsUm9vdCgpIHsgcmV0dXJuIENvbmZpZ1snd2ViX3NlcnZpY2VfdXJsJ10rXCJzdWJtaXNzaW9uc1wiIH1cblxuXHRnZXQgaWRBdHRyaWJ1dGUoKSB7IHJldHVybiAnX2lkJyB9XG5cblx0Z2V0IGRlZmF1bHRzKCkgeyBcblx0XHRyZXR1cm4ge1xuXHQgICAgXHRmaWxlczogW10sXG5cdCAgICBcdGNvbW1lbnRzOiBbXSxcblx0ICAgIFx0dGV4dDogJycsXG5cdCAgICBcdHRhZ3M6IFtdLFxuXHQgICAgXHRhdXRob3I6ICcnLFxuXHRcdFx0dGl0bGU6IGZhbHNlLFxuXHRcdFx0b3B0aW9uczogW11cblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3VibWlzc2lvbk1vZGVsIl19