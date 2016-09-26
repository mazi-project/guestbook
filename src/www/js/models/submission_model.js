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

			return _possibleConstructorReturn(this, Object.getPrototypeOf(SubmissionModel).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvc3VibWlzc2lvbl9tb2RlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBWU0sZTs7Ozs7Ozs7Ozs7dUJBRVM7QUFBRSxXQUFPLGlCQUFPLGlCQUFQLElBQTBCLGFBQWpDO0FBQWdEOzs7dUJBRTlDO0FBQUUsV0FBTyxLQUFQO0FBQWM7Ozt1QkFFbkI7QUFDZCxXQUFPO0FBQ0gsWUFBTyxFQURKO0FBRUgsZUFBVSxFQUZQO0FBR0gsV0FBTSxFQUhIO0FBSUgsV0FBTSxFQUpIO0FBS0gsYUFBUSxFQUxMO0FBTUgsWUFBTztBQU5KLEtBQVA7QUFRQTs7OztHQWY0QixtQkFBUyxLOzttQkFrQnhCLGUiLCJmaWxlIjoic3VibWlzc2lvbl9tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0wMSAyMDo0Nzo0MVxuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcblxuY2xhc3MgU3VibWlzc2lvbk1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWwge1xuXG5cdGdldCB1cmxSb290KCkgeyByZXR1cm4gQ29uZmlnWyd3ZWJfc2VydmljZV91cmwnXStcInN1Ym1pc3Npb25zXCIgfVxuXG5cdGdldCBpZEF0dHJpYnV0ZSgpIHsgcmV0dXJuICdfaWQnIH1cblxuXHRnZXQgZGVmYXVsdHMoKSB7IFxuXHRcdHJldHVybiB7XG5cdCAgICBcdGZpbGVzOiBbXSxcblx0ICAgIFx0Y29tbWVudHM6IFtdLFxuXHQgICAgXHR0ZXh0OiAnJyxcblx0ICAgIFx0dGFnczogW10sXG5cdCAgICBcdGF1dGhvcjogJycsXG5cdCAgICBcdHRpdGxlOiBmYWxzZVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdWJtaXNzaW9uTW9kZWwiXX0=