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
		welcome_msg: "TODO",
		auto_expand_comment: false // 'Click here to comment' no longer exists. It collapses by default
	};
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWcuanMiXSwibmFtZXMiOlsid2ViX3NlcnZpY2VfdXJsIiwid2ViX3NvY2tldF91cmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInBvcnQiLCJmaWxlc191cmwiLCJzdHJpbmdUcnVuY2F0ZVNob3J0Iiwic3RyaW5nVHJ1bmNhdGVMb25nIiwicHJvamVjdGlvblRpbWVJbnRlcnZhbCIsImRhdGFzZXQiLCJyZWNvcmRzUGVyUGFnZSIsInRhZ3MiLCJiYWNrZ3JvdW5kX2ltZyIsIndlbGNvbWVfbXNnIiwiYXV0b19leHBhbmRfY29tbWVudCJdLCJtYXBwaW5ncyI6IjtBQUFBOztBQUVBOzs7Ozs7Ozs7O21CQU9lO0FBQ2RBLG1CQUFrQixPQURKO0FBRWRDLGtCQUFpQixNQUFJQyxPQUFPQyxRQUFQLENBQWdCQyxJQUZ2QjtBQUdkQyxhQUFZLFNBSEU7QUFJZEMsdUJBQXFCLEdBSlA7QUFLZEMsc0JBQW9CLEdBTE47QUFNZEMsMEJBQXlCLElBTlg7O0FBUWRDLFdBQVMsSUFSSzs7QUFVZEMsa0JBQWdCLEVBVkY7O0FBWWQ7QUFDQUMsUUFBTSxDQUFDLE1BQUQsRUFBUSxNQUFSLEVBQWUsTUFBZixFQUFzQixNQUF0QixDQWJRO0FBY2RDLGtCQUFnQixNQWRGO0FBZWRDLGVBQWEsTUFmQztBQWdCZEMsdUJBQXFCLEtBaEJQLENBZ0JnQjtBQWhCaEIsRSIsImZpbGUiOiJjb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTQgMTY6NTE6NThcbiovXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0d2ViX3NlcnZpY2VfdXJsIDogJy9hcGkvJyxcblx0d2ViX3NvY2tldF91cmwgOiAnOicrd2luZG93LmxvY2F0aW9uLnBvcnQsXG5cdGZpbGVzX3VybCA6ICcvZmlsZXMvJyxcblx0c3RyaW5nVHJ1bmNhdGVTaG9ydDogMTYwLFxuXHRzdHJpbmdUcnVuY2F0ZUxvbmc6IDIyMCxcblx0cHJvamVjdGlvblRpbWVJbnRlcnZhbCA6IDgwMDAsXG5cblx0ZGF0YXNldDogbnVsbCxcblxuXHRyZWNvcmRzUGVyUGFnZTogMTIsXG5cblx0Ly8gVGFnc1xuXHR0YWdzOiBbJ3RhZzEnLCd0YWcyJywndGFnMycsJ3RhZzQnXSxcblx0YmFja2dyb3VuZF9pbWc6IFwiVE9ET1wiLFxuXHR3ZWxjb21lX21zZzogXCJUT0RPXCIsXG5cdGF1dG9fZXhwYW5kX2NvbW1lbnQ6IGZhbHNlLFx0XHRcdC8vICdDbGljayBoZXJlIHRvIGNvbW1lbnQnIG5vIGxvbmdlciBleGlzdHMuIEl0IGNvbGxhcHNlcyBieSBkZWZhdWx0XG59Il19