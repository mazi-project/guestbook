'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-01 13:40:54
*/

import Marionette from 'marionette';
import Backbone from 'backbone';
import _ from 'underscore';
import SubmissionCollection from 'models/submission_collection';
import SubmissionModel from 'models/submission_model';
import TabletItemView from 'views/tablet_item_view';

import template from 'text!templates/tablet_tmpl.html';

class TabletView extends Marionette.CompositeView {

	/* properties */
	get template() { return _.template(template) }

	get className() { return 'composite-view' }

	get childViewContainer() { return '#submission-list' }

	get childView() { return TabletItemView }

	/* methods */

	initialize(options) {

		this.fetchParams = {};

		if (options.tag != null)
			this.fetchParams.tag = options.tag
        if (options.dataset != null)
            this.fetchParams.dataset = options.dataset
		
		this.collection = new SubmissionCollection();

        this.listenTo(this.collection,'sync',this.hideSpinner);
        this.listenTo(this.collection,'fetching',this.showSpinner);

        this.listenTo(Backbone,'submission:changed', this.onSubmissionChanged);
        this.listenTo(Backbone,'submission:new', this.onSubmissionAdded);
        this.listenTo(Backbone,'submission:removed', this.onSubmissionRemoved);
        this.listenTo(Backbone,'feedback:scanning', this.onSubmissionScanning);

        this.collection.getFirstPage(this.fetchParams);
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

    onSubmissionAdded(data) {
        //console.log(data);
    	var submission = new SubmissionModel(data.model);
    	submission.fetch();
    	 // add to front of collection
		this.collection.add(submission, { at: 0});
		this.hideScanSpinner();
    }

    onSubmissionRemoved(data) {
        console.log(data);
        this.collection.remove(data._id);
    }

    onSubmissionScanning(data) {
    	this.showScanSpinner();
    }

    onWindowScroll() {

        var scrollPos = $(window).scrollTop();
        var triggerPos =  $(document).height() - $(window).height() * 1.2;

        if (scrollPos > triggerPos) {
            this.collection.getNextPage(this.fetchParams);
        }
    }

    showSpinner() {
        this.$('#fetch-spinner').removeClass('hidden');    
    }
    
    hideSpinner() {
        this.$('#fetch-spinner').addClass('hidden');
    }

    showScanSpinner() {
    	this.$('#scan-spinner').removeClass('hidden');
    	setTimeout(() => {
    		this.hideScanSpinner();
    	},10000)
    }

    hideScanSpinner() {
    	this.$('#scan-spinner').addClass('hidden');
    }
  
}

export default TabletView