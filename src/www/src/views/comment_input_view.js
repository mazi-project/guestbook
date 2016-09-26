'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-30 16:53:03
*/

import Marionette from 'marionette'
import _ from 'underscore'
import CommentModel from 'models/comment_model';

import template from 'text!templates/comment_input_tmpl.html';

class CommentInputView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'input-view' }

    events() {
    	return {
    		'click #new-comment-button' : 'onNewCommentButtonClick'
    	}
    }

    /* methods */
    initialize(options) {
    	this.submissionId = options.submissionId;
    	this.state = options.state
    }

    onShow() {
    	if (!_.isUndefined(this.state)) {
    		this.setState(this.state);
    	}
    }

    onNewCommentButtonClick() {

    	var comment = new CommentModel({
    		text : this.$('#new-comment-text').val(),
    		author : this.$('#new-comment-author').val(),
    		submission: this.submissionId
    	})
    	comment.save(null,{
            error: (model, res) => {
                console.log(res.responseJSON);
                Backbone.trigger('error','http',res.responseJSON.error);
            },
            success: () => {
            	this.render();
            }
        });
    }

    getState() {
    	return {
    		text: this.$('#new-comment-text').val(),
    		author: this.$('#new-comment-author').val()
    	}
    }

    setState(state) {
    	this.$('#new-comment-text').val(state.text);
    	this.$('#new-comment-author').val(state.author)
    }
    
}

export default CommentInputView