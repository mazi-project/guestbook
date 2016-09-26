'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-10 16:47:10
*/

import Backbone from 'backbone';
import Config from 'config';

class CommentModel extends Backbone.Model {

	get urlRoot() { return Config['web_service_url']+"comments" }

	get idAttribute() { return '_id' }
}

export default CommentModel