define(["exports"], function (exports) {
	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-31 15:02:36
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-05-31 15:03:29
 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		encodeQueryParameters: function encodeQueryParameters(data) {
			var ret = [];
			for (var d in data) {
				ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
			}return ret.join("&");
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJlbmNvZGVRdWVyeVBhcmFtZXRlcnMiLCJkYXRhIiwicmV0IiwiZCIsInB1c2giLCJlbmNvZGVVUklDb21wb25lbnQiLCJqb2luIl0sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7QUFPQTs7Ozs7bUJBRWU7QUFDZEEseUJBQXVCLCtCQUFTQyxJQUFULEVBQWU7QUFDbkMsT0FBSUMsTUFBTSxFQUFWO0FBQ0EsUUFBSyxJQUFJQyxDQUFULElBQWNGLElBQWQ7QUFDR0MsUUFBSUUsSUFBSixDQUFTQyxtQkFBbUJGLENBQW5CLElBQXdCLEdBQXhCLEdBQThCRSxtQkFBbUJKLEtBQUtFLENBQUwsQ0FBbkIsQ0FBdkM7QUFESCxJQUVBLE9BQU9ELElBQUlJLElBQUosQ0FBUyxHQUFULENBQVA7QUFDRjtBQU5hLEUiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTMxIDE1OjAyOjM2XG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA1LTMxIDE1OjAzOjI5XG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZW5jb2RlUXVlcnlQYXJhbWV0ZXJzOiBmdW5jdGlvbihkYXRhKSB7XG5cdCAgIHZhciByZXQgPSBbXTtcblx0ICAgZm9yICh2YXIgZCBpbiBkYXRhKVxuXHQgICAgICByZXQucHVzaChlbmNvZGVVUklDb21wb25lbnQoZCkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChkYXRhW2RdKSk7XG5cdCAgIHJldHVybiByZXQuam9pbihcIiZcIik7XG5cdH1cbn0iXX0=