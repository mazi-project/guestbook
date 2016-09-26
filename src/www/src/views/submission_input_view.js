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
import Backbone from 'backbone';
import _ from 'underscore'
import SubmissionModel from 'models/submission_model';
import Config from 'config';

import template from 'text!templates/submission_input_tmpl.html';

class SubmissionInputView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'submission-input' }

    events() {
    	return {
            'click .submission-headline' : 'focus',
            'mouseleave' : 'unfocus',
            'click #submit-button' : 'onSubmitButtonClick',
            'change #new-submission-file' : 'onFileInputChanged',
            'click #tag-dropdown' : 'onTagDropdownClick',
            'click .tag-dropdown-list' : 'preventPropagation',
            'mouseleave .tag-dropdown-list' : 'onLeaveDropdown'
    	}
    }

    get templateHelpers() {
        return {
            tags : Config.tags
        }
    }

    /* methods */
    initialize(options) {
        //console.log(options)
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
                    Backbone.trigger('error','http',res.responseJSON.error);
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
                Backbone.trigger('error','http',res.responseJSON.error);
            },
            success: (model, res) => {
                if (this.$('#new-submission-file').val())
                    uploadFile(this.$('#new-submission-file'),model, () => {
                        this.clear();
                        this.unfocus();
                    });
                else {
                    this.clear();
                    this.unfocus();
                }
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