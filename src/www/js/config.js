define(['exports'], function (exports) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-14 16:51:58
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		web_service_url: '/api/',
		web_socket_url: ':' + window.location.port,
		files_url: '/files/',
		stringTruncateShort: 160,
		stringTruncateLong: 220,
		projectionTimeInterval: 8000,

		dataset: null,

		recordsPerPage: 12,

		tags: ['Artist', 'Activist', 'Male', 'Female', 'Student', 'Professor', 'DSIMaker', 'PolicyMaker', 'CAPSproject']
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7bUJBU2U7QUFDZCxtQkFBa0IsT0FESjtBQUVkLGtCQUFpQixNQUFJLE9BQU8sUUFBUCxDQUFnQixJQUZ2QjtBQUdkLGFBQVksU0FIRTtBQUlkLHVCQUFxQixHQUpQO0FBS2Qsc0JBQW9CLEdBTE47QUFNZCwwQkFBeUIsSUFOWDs7QUFRZCxXQUFTLElBUks7O0FBVWQsa0JBQWdCLEVBVkY7O0FBWWQsUUFBTSxDQUFDLE1BQUQsRUFBUSxNQUFSLEVBQWUsTUFBZixFQUFzQixNQUF0QjtBQVpRLEUiLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTE0IDE2OjUxOjU4XG4qL1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdHdlYl9zZXJ2aWNlX3VybCA6ICcvYXBpLycsXG5cdHdlYl9zb2NrZXRfdXJsIDogJzonK3dpbmRvdy5sb2NhdGlvbi5wb3J0LFxuXHRmaWxlc191cmwgOiAnL2ZpbGVzLycsXG5cdHN0cmluZ1RydW5jYXRlU2hvcnQ6IDE2MCxcblx0c3RyaW5nVHJ1bmNhdGVMb25nOiAyMjAsXG5cdHByb2plY3Rpb25UaW1lSW50ZXJ2YWwgOiA4MDAwLFxuXG5cdGRhdGFzZXQ6IG51bGwsXG5cblx0cmVjb3Jkc1BlclBhZ2U6IDEyLFxuXG5cdHRhZ3M6IFsndGFnMScsJ3RhZzInLCd0YWczJywndGFnNCddXG59Il19
