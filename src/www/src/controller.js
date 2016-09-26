'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutz
* @Last Modified time: 2016-08-29 20:49:29
*/

import Backbone from 'backbone';
import Marionette from 'marionette';
import SIO from 'socketio';
import Config from 'config';

import MainView from 'views/main_view';
import SubmissionListView from 'views/submission_list_view';
import TagListView from 'views/tag_list_view';
import SubmissionInputView from 'views/submission_input_view';
import SubmissionView from 'views/submission_view';
import AdminView from 'views/admin_view';
import TabletView from 'views/tablet_view';
import ProjectionView from 'views/projection_view';

import headerTemplate from 'text!templates/header_tmpl.html';
import footerTemplate from 'text!templates/footer_tmpl.html';

class Controller extends Marionette.Controller {
		
		constructor(app) {

			super();

			this.app = app;
			
			app.addRegions({
				containerRegion: "#container",
				modalRegion: "#modal-container"
			});
			
			//register client events
			/*Backbone.on('dialog:open', this.openDialog, this);
			Backbone.on('dialog:close', this.closeDialog, this);*/
			Backbone.on('error',this.openErrorDialog, this);

			//register socket events
			var socket = SIO(Config.web_socket_url);
            socket.on('submission:changed', function(data) {
            	Backbone.trigger('submission:changed',data);
            });
            socket.on('submission:new', function(data) {
            	Backbone.trigger('submission:new',data);
            });
            socket.on('submission:removed', function(data) {
            	Backbone.trigger('submission:new',data);
            });
            socket.on('feedback:scanning', function(data) {
            	Backbone.trigger('feedback:scanning',data);
            });

            //load mainview
            this.mainView = new MainView();
            this.app.containerRegion.show(this.mainView);
			
		}
			
		/* ROUTES */

		showSubmissionList(tag=null) {
			$('body').removeClass();

			this.mainView.headerRegion.show(new Marionette.ItemView({
				template: _.template(headerTemplate)
			}));

			//update list view
			this.mainView.contentRegion.show(new SubmissionListView({ tag: tag, dataset: Config.dataset }));

			//set input view
			if (!(this.mainView.topRegion.currentView instanceof SubmissionInputView))
				this.mainView.topRegion.show(new SubmissionInputView());

			//set tagview
			if (this.mainView.tagsRegion.currentView instanceof TagListView)
				this.mainView.tagsRegion.currentView.setTag(tag);
			else
				this.mainView.tagsRegion.show(new TagListView({ tag: tag, dataset: Config.dataset }));

			this.mainView.footerRegion.show(new Marionette.ItemView({
				template: _.template(footerTemplate)
			}));
		}

		showSubmission(id) {
			$('body').removeClass();

			this.mainView.headerRegion.reset();
			this.mainView.contentRegion.show(new SubmissionView({ id: id }));
			this.mainView.tagsRegion.reset();
			this.mainView.topRegion.reset();
			this.mainView.footerRegion.show(new Marionette.ItemView({
				template: _.template(footerTemplate)
			}));
		}

		showAdminPage() {
			$('body').removeClass();

			this.mainView.headerRegion.show(new Marionette.ItemView({
				template: _.template('<div class="link-back"><a href="#"><span class="close-button"></span></a></div>')
			}));
			this.mainView.contentRegion.show(new AdminView({ dataset: Config.dataset }));
			this.mainView.tagsRegion.reset();
			this.mainView.topRegion.reset();
			this.mainView.footerRegion.show(new Marionette.ItemView({
				template: _.template(footerTemplate)
			}));
		}

		showTabletView() {
			$('body').removeClass();
			$('body').addClass("tablet");

			this.mainView.headerRegion.show(new Marionette.ItemView({
				template: _.template('<div class="logo"><img src="images/logo.png"></div><span class="line-horizontal"></span>')
			}));
			this.mainView.contentRegion.show(new TabletView({ dataset: Config.dataset }) );
			this.mainView.tagsRegion.reset();
			this.mainView.topRegion.reset();
			this.mainView.footerRegion.show(new Marionette.ItemView({
				template: _.template(footerTemplate)
			}));
		}

		showProjection() {
			$('body').removeClass();
			$('body').addClass("projection");

			this.mainView.headerRegion.reset();
			this.mainView.contentRegion.show(new ProjectionView({ dataset: Config.dataset }) );
			this.mainView.tagsRegion.reset();
			this.mainView.topRegion.reset();
			this.mainView.footerRegion.reset();
		}

		postSubmission() {
			alert('post submission');
		}

		showScanningDialog() {
			alert("ScanningDialog");
		}

		openErrorDialog(type,error) {

			var title = (type+'-error').toUpperCase();
			var message = error.message;

			alert(title+': '+message);
		}

		closeDialog() {

		}

		
};

export default Controller
	