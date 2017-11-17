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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvc3VibWlzc2lvbl9tb2RlbC5qcyJdLCJuYW1lcyI6WyJTdWJtaXNzaW9uTW9kZWwiLCJmaWxlcyIsImNvbW1lbnRzIiwidGV4dCIsInRhZ3MiLCJhdXRob3IiLCJ0aXRsZSIsIk1vZGVsIl0sIm1hcHBpbmdzIjoiO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQVVNQSxlOzs7Ozs7Ozs7Ozt1QkFDUztBQUFFLFdBQU8saUJBQU8saUJBQVAsSUFBMEIsYUFBakM7QUFBZ0Q7Ozt1QkFFOUM7QUFBRSxXQUFPLEtBQVA7QUFBYzs7O3VCQUVuQjtBQUNkLFdBQU87QUFDSEMsWUFBTyxFQURKO0FBRUhDLGVBQVUsRUFGUDtBQUdIQyxXQUFNLEVBSEg7QUFJSEMsV0FBTSxFQUpIO0FBS0hDLGFBQVEsRUFMTDtBQU1OQyxZQUFPO0FBTkQsS0FBUDtBQVFBOzs7O0dBZDRCLG1CQUFTQyxLOzttQkFpQnhCUCxlIiwiZmlsZSI6InN1Ym1pc3Npb25fbW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMDEgMjA6NDc6NDFcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbmNsYXNzIFN1Ym1pc3Npb25Nb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsIHtcblx0Z2V0IHVybFJvb3QoKSB7IHJldHVybiBDb25maWdbJ3dlYl9zZXJ2aWNlX3VybCddK1wic3VibWlzc2lvbnNcIiB9XG5cblx0Z2V0IGlkQXR0cmlidXRlKCkgeyByZXR1cm4gJ19pZCcgfVxuXG5cdGdldCBkZWZhdWx0cygpIHsgXG5cdFx0cmV0dXJuIHtcblx0ICAgIFx0ZmlsZXM6IFtdLFxuXHQgICAgXHRjb21tZW50czogW10sXG5cdCAgICBcdHRleHQ6ICcnLFxuXHQgICAgXHR0YWdzOiBbXSxcblx0ICAgIFx0YXV0aG9yOiAnJyxcblx0XHRcdHRpdGxlOiBmYWxzZVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdWJtaXNzaW9uTW9kZWwiXX0=