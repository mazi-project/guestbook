'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-31 15:23:53
*/

import Backbone from 'backbone';
import Marionette from 'marionette';
import $ from 'jquery';
import _ from 'underscore';
import SubmissionCollection from 'models/submission_collection';
import AdminItemView from 'views/admin_item_view';
import template from 'text!templates/admin_tmpl.html';
import Config from 'config'


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
class AdminView extends Marionette.CompositeView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'adminview' }

    get childViewContainer() { return '#submission-list' }

    get childView() { return AdminItemView }

    /* methods */
    initialize(options) {
		login_fun(); //Auth

		this.collection = new SubmissionCollection();

		this.listenTo(this.collection,'sync',this.hideSpinner);
		this.listenTo(this.collection,'fetching',this.showSpinner);

		this.collection.getFirstPage();

		this.listenTo(Backbone,'submission:changed', this.onSubmissionChanged);
    }

    onAttach() {
        //bind scroll handler
        this.winowScrollListener =  _.throttle(() => {
            this.onWindowScroll();
        },500);
        $(window).on('scroll',this.winowScrollListener);
    }

    onBeforeDestroy() {
        //unbind scroll handler
        $(window).off("scroll", this.winowScrollListener);
    }

    // update model on data change
    onSubmissionChanged(data) {
        var model = this.collection.get(data.model._id);
        if (model)
            model.fetch();
    }

    onWindowScroll() {

        var scrollPos = $(window).scrollTop();
        var triggerPos =  $(document).height() - $(window).height() * 1.2;

        if (scrollPos > triggerPos) {
            this.collection.getNextPage(this.fetchParams);
        }
    }

    showSpinner() {
        this.$('.spinner').removeClass('hidden');
        this.$('#load-more-button').addClass('hidden');
    }
    
    hideSpinner() {
        this.$('.spinner').addClass('hidden');
        if (!(this.loadMore)) {
            this.$('#load-more-button').removeClass('hidden');
        }
    }
    
}

export default AdminView