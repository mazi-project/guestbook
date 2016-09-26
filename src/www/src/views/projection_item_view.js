'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-14 17:06:19
*/

import Marionette from 'marionette'
import _ from 'underscore'
import Config from 'config'

import template from 'text!templates/projection_item_tmpl.html';

class BaseView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

   	get templateHelpers() {
  		return {
            backgroundImage : this.getBackgroundImageString()
  		}
    }

    /* methods */
    initialize(options) {
        //listen to model events
        this.listenTo(this.model,'change',this.render);

        //listen to socket events
        this.listenTo(Backbone,'submission:changed', this.onSubmissionChanged);
    }

    onRender() {
        if (this.model.get('device') == "letterbox")
            this.$('.background').addClass("invert");
    }

    getBackgroundImageString() {
        var filesUrl = Config.files_url + this.model.get('_id') + '/';
        var files = this.model.get('files')
        if (files.length > 0)
            return "style=\"background-image: url('"+filesUrl+files[0].name+"')\"";
        else
            return "";
    }

    onSubmissionChanged() {
        this.model.fetch();
    }
    
}

export default BaseView