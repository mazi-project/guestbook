'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-10 15:11:57
*/

import Backbone from 'backbone';
import SubmissionModel from 'models/submission_model';
import Config from 'config';

class TagCollection extends Backbone.Collection {

	get url() { return Config['web_service_url']+"tags" }
};

export default TagCollection