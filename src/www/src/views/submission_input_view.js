'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-01 19:56:41
*/

import 'jquery';
import 'iframeTransport';
import Marionette from 'marionette'
import Backbone, { ajax } from 'backbone';
import _ from 'underscore'
import SubmissionModel from 'models/submission_model';
import Config from 'config';

import template from 'text!templates/submission_input_tmpl.html';

class SubmissionInputView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'submission-input' }

    events() {
		var events = {
			'click #submit-button' : 'onSubmitButtonClick',
            'change #new-submission-file' : 'onFileInputChanged',
            'click #tag-dropdown' : 'onTagDropdownClick',
            'click .tag-dropdown-list' : 'preventPropagation',
            'mouseleave .tag-dropdown-list' : 'onLeaveDropdown'
		}
		if(!Config.auto_expand_comment){
			events['click .submission-headline'] = 'focus';
			events['mouseleave'] = 'unfocus';
		}
		return events;
    }

    get templateHelpers() {
		return {
			tags : Config.tags,
			welcome_msg: Config.welcome_msg
		}
    }

    /* methods */
    initialize(options) {
		$.ajax({
			method: 'GET',
			url: 'api/submissions/options',
			error: (res) => {
				this.$('span.size-info').text(5); 		//default value
			},
			success: (res) => {
				this.$('span.size-info').text(res.maxFileSize/1024/1024);
			}
		});

		if(Config.auto_expand_comment)
			this.$el.addClass('expand');
    }

    focus() {
    	this.$el.addClass('expand');
    }

    unfocus() {
    	if (!this.$('#new-submission-text').val() && !this.$('#new-submission-author').val() && !this.$('#new-submission-file').val())
    		this.$el.removeClass('expand');
    }

    clear() {
        this.$('#new-submission-text').val('');
        this.$('#new-submission-author').val('');
        this.$('#new-submission-file').val('');
        $('#attach-text').addClass('hidden');
        $('input[name="new-submission-tags"]:checked').attr('checked', false);
    }

    onTagDropdownClick() {
        this.$('.tag-dropdown-list').toggleClass('expand');
    }

    onLeaveDropdown() {
        this.$('.tag-dropdown-list').removeClass('expand');
    }

    preventPropagation(event) {
        event.stopPropagation();
    }

    onSubmitButtonClick() {

        // upload file
        var uploadFile = function(file, model,callback) {
			
            $.ajax({
                method: 'POST',
                url: Config.web_service_url+'file/attach/'+model.get('_id'),
                iframe: true,
                files: file,
                dataType: 'json',
                error: (res) => {
                    Backbone.trigger('error','http',"Unable to upload file");
                },
                success: (res) => {
                    if (_.has(res,'error'))
						Backbone.trigger('error','http',res.error);
                    else
                        callback();
                }
            });
        };

        var tags = _.map($('input[name="new-submission-tags"]:checked'), (element) => {
            return element.value;
        });

    	var submission = new SubmissionModel({
    		text : this.$('#new-submission-text').val(),
    		author : this.$('#new-submission-author').val(),
            tags: tags
    	})
    	submission.save(null,{
            error: (model,res) => {
				var error = res.responseJSON.error.message;
				var response_txt = '';

				if(error.includes('author')){
					response_txt = "Please enter your name.\n";
				}
				if(error.includes('text')){
					response_txt += "Please write a comment.";
				}
				alert(response_txt);
            },
            success: (model, res) => {
				if(this.$('#new-submission-file').val())
					uploadFile(this.$('#new-submission-file'),model, () => {});
				
				this.clear();
				if(Config.auto_expand_comment)
					$('html, body').animate({
						scrollTop: $('div#submission-list').offset().top
					}, 2000);
				else
					this.unfocus();
            }
        });
    }

    onFileInputChanged() {
        var filename = _.last(this.$('#new-submission-file').val().split("\\"));
        $('#attach-text').html('Image: '+filename);
        $('#attach-text').removeClass('hidden');
        this.focus();
    }
    
}

export default SubmissionInputView