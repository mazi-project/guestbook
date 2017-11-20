'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-14 16:51:58
*/

export default {
	web_service_url : '/api/',
	web_socket_url : ':'+window.location.port,
	files_url : '/files/',
	stringTruncateShort: 160,
	stringTruncateLong: 220,
	projectionTimeInterval : 8000,

	dataset: null,

	recordsPerPage: 12,

	// Tags
	tags: ['tag1','tag2','tag3','tag4'],
	background_img: "TODO",
	welcome_msg: "TODO",
	auto_expand_comment: false,			// 'Click here to comment' no longer exists. It collapses by default
}