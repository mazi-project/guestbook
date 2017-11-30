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

		// Tags
		tags: ['tag1', 'tag2', 'tag3', 'tag4'],
		background_img: "TODO",
		welcome_msg: "Click here to comment on the MAZI toolkit",
		auto_expand_comment: false // 'Click here to comment' no longer exists. It collapses by default
	};
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWcuanMiXSwibmFtZXMiOlsid2ViX3NlcnZpY2VfdXJsIiwid2ViX3NvY2tldF91cmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInBvcnQiLCJmaWxlc191cmwiLCJzdHJpbmdUcnVuY2F0ZVNob3J0Iiwic3RyaW5nVHJ1bmNhdGVMb25nIiwicHJvamVjdGlvblRpbWVJbnRlcnZhbCIsImRhdGFzZXQiLCJyZWNvcmRzUGVyUGFnZSIsInRhZ3MiLCJiYWNrZ3JvdW5kX2ltZyIsIndlbGNvbWVfbXNnIiwiYXV0b19leHBhbmRfY29tbWVudCJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7O21CQU9lO0FBQ2RBLG1CQUFrQixPQURKO0FBRWRDLGtCQUFpQixNQUFJQyxPQUFPQyxRQUFQLENBQWdCQyxJQUZ2QjtBQUdkQyxhQUFZLFNBSEU7QUFJZEMsdUJBQXFCLEdBSlA7QUFLZEMsc0JBQW9CLEdBTE47QUFNZEMsMEJBQXlCLElBTlg7O0FBUWRDLFdBQVMsSUFSSzs7QUFVZEMsa0JBQWdCLEVBVkY7O0FBWWQ7QUFDQUMsUUFBTSxDQUFDLE1BQUQsRUFBUSxNQUFSLEVBQWUsTUFBZixFQUFzQixNQUF0QixDQWJRO0FBY2RDLGtCQUFnQixNQWRGO0FBZWRDLGVBQWEsMkNBZkM7QUFnQmRDLHVCQUFxQixLQWhCUCxDQWdCZ0I7QUFoQmhCLEUiLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA3LTE0IDE2OjUxOjU4XG4qL1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdHdlYl9zZXJ2aWNlX3VybCA6ICcvYXBpLycsXG5cdHdlYl9zb2NrZXRfdXJsIDogJzonK3dpbmRvdy5sb2NhdGlvbi5wb3J0LFxuXHRmaWxlc191cmwgOiAnL2ZpbGVzLycsXG5cdHN0cmluZ1RydW5jYXRlU2hvcnQ6IDE2MCxcblx0c3RyaW5nVHJ1bmNhdGVMb25nOiAyMjAsXG5cdHByb2plY3Rpb25UaW1lSW50ZXJ2YWwgOiA4MDAwLFxuXG5cdGRhdGFzZXQ6IG51bGwsXG5cblx0cmVjb3Jkc1BlclBhZ2U6IDEyLFxuXG5cdC8vIFRhZ3Ncblx0dGFnczogWyd0YWcxJywndGFnMicsJ3RhZzMnLCd0YWc0J10sXG5cdGJhY2tncm91bmRfaW1nOiBcIlRPRE9cIixcblx0d2VsY29tZV9tc2c6IFwiQ2xpY2sgaGVyZSB0byBjb21tZW50IG9uIHRoZSBNQVpJIHRvb2xraXRcIixcblx0YXV0b19leHBhbmRfY29tbWVudDogZmFsc2UsXHRcdFx0Ly8gJ0NsaWNrIGhlcmUgdG8gY29tbWVudCcgbm8gbG9uZ2VyIGV4aXN0cy4gSXQgY29sbGFwc2VzIGJ5IGRlZmF1bHRcbn1cbiJdfQ==