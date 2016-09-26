'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-06-23 11:59:23
*/

import Marionette from 'marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import _str from 'underscoreString';
import $ from 'jquery';
import Moment from 'moment';
import 'moment_en_gb';
import Config from 'config';
import CommentModel from 'models/comment_model';

import template from 'text!templates/tablet_item_tmpl.html';

class TabletItemView extends Marionette.ItemView {

	/* properties */
    get template() { return _.template(template) }

    get className() { return 'item-view card' }

    get templateHelpers() {
		return {
			filesUrl : Config.files_url + this.model.get('_id') + '/',
            isAdmin : false,
            text_truncated_short : _str.truncate(this.model.get('text'),Config.stringTruncateShort,'...'),
            text_truncated_long : _str.truncate(this.model.get('text'),Config.stringTruncateLong,'...'),
            fromNow: function(date) {
                return Moment(date).fromNow(); 
            }
		}
    }

    get modelEvents() {
        return {
            'change' : 'render'
        }
    }

}

export default TabletItemView;