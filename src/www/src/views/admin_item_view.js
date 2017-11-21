'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-31 14:57:31
*/

import Marionette from 'marionette';
import _ from 'underscore';
import Config from 'config';
import moment from 'moment';
import template from 'text!templates/admin_item_tmpl.html';
import CommentModel from 'models/comment_model';
import $ from 'jquery';

var login_fun = function(cb){
	$.ajax({
		method: 'GET',
		url: Config['web_service_url']+"admin",
		error: function(err) {
			console.log(err);
		},
		success: function success(res) {
			console.log('success');
			cb();
		}
	});
}

class AdminItemView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'admin-item-view' }

    get templateHelpers() {
		return {
			filesUrl : Config.files_url + this.model.get('_id') + '/',
           	formatDate: function(date) {
           		return moment(date).format('LLL');
           	},
           	fromNow: function(date) {
           		return moment(date).fromNow(); 
           	},
           	createdAt: this.model.has('createdAt') ? this.model.get('createdAt') : 0
		}
    }

    get modelEvents() {
        return {
            'change' : 'render'
        }
    }

    events() {
    	return {
    		'click #admin-expand-button' : 'onExpandButtonClick',
            'click #delete-comment-button' : 'onDeleteCommentButtonClick',
            'click #delete-submission-button' : 'onDeleteSubmissionButtonClick',
    	}
    }

    /* methods */
    initialize(options) {

    }

    onExpandButtonClick() {
		var _this = this;
		login_fun(function(){
			_this.$('#admin-comments-list').toggleClass('hidden');
		});
    }

    onDeleteCommentButtonClick(event) {
		login_fun(function(){
			var commentId = $(event.target).attr('data-id')
			var comment = new CommentModel({
				_id : commentId
			});
			comment.destroy();
		});
    }

    onDeleteSubmissionButtonClick() {
		var _this = this;
		login_fun(function(){
			_this.model.destroy();
		});
    }
}

export default AdminItemView