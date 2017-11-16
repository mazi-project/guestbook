define(['exports', 'backbone', 'config'], function (exports, _backbone, _config) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-05-10 16:47:10
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

	var CommentModel = function (_Backbone$Model) {
		_inherits(CommentModel, _Backbone$Model);

		function CommentModel() {
			_classCallCheck(this, CommentModel);

			return _possibleConstructorReturn(this, (CommentModel.__proto__ || Object.getPrototypeOf(CommentModel)).apply(this, arguments));
		}

		_createClass(CommentModel, [{
			key: 'urlRoot',
			get: function get() {
				return _config2.default['web_service_url'] + "comments";
			}
		}, {
			key: 'idAttribute',
			get: function get() {
				return '_id';
			}
		}]);

		return CommentModel;
	}(_backbone2.default.Model);

	exports.default = CommentModel;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvY29tbWVudF9tb2RlbC5qcyJdLCJuYW1lcyI6WyJDb21tZW50TW9kZWwiLCJNb2RlbCJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FVTUEsWTs7Ozs7Ozs7Ozs7dUJBRVM7QUFBRSxXQUFPLGlCQUFPLGlCQUFQLElBQTBCLFVBQWpDO0FBQTZDOzs7dUJBRTNDO0FBQUUsV0FBTyxLQUFQO0FBQWM7Ozs7R0FKUixtQkFBU0MsSzs7bUJBT3JCRCxZIiwiZmlsZSI6ImNvbW1lbnRfbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDUtMTAgMTY6NDc6MTBcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbmNsYXNzIENvbW1lbnRNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsIHtcblxuXHRnZXQgdXJsUm9vdCgpIHsgcmV0dXJuIENvbmZpZ1snd2ViX3NlcnZpY2VfdXJsJ10rXCJjb21tZW50c1wiIH1cblxuXHRnZXQgaWRBdHRyaWJ1dGUoKSB7IHJldHVybiAnX2lkJyB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1lbnRNb2RlbCJdfQ==