'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-31 15:20:27
*/

import Backbone from 'backbone';
import Marionette from 'marionette';
import _ from 'underscore'
import moment from 'moment';
import 'moment_en_gb';
import Config from 'config';
import CommentInputView from 'views/comment_input_view';
import SubmissionModel from 'models/submission_model';

import template from 'text!templates/submission_tmpl.html';

class SubmissionView extends Marionette.LayoutView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'singleview' }

    regions() { 
    	return {
        	commentInputRegion: '#comment-input'
	    }
	}

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


    /* methods */
    initialize(options) {
        this.model = new SubmissionModel({ _id: options.id });
        this.model.fetch();
        
        //listen to model events
        this.listenTo(this.model,'change',this.onModelChanged);

        //listen to socket events
        this.listenTo(Backbone,'submission:changed', this.onSubmissionChanged);
    }

    onSubmissionChanged(data) {
    	if (data.model._id == this.model.get('_id'))
    		this.model.fetch();
    }

    onModelChanged() {
		if (_.isUndefined(this.commentInputRegion.currentView)) {
			this.render();
			this.commentInputRegion.show(new CommentInputView({ submissionId : this.model.get('_id') }));
		} else {
			var state = this.commentInputRegion.currentView.getState();
			this.render();
			this.commentInputRegion.show(new CommentInputView({ submissionId : this.model.get('_id'), state: state }));
		}
    }
    
}

export default SubmissionView