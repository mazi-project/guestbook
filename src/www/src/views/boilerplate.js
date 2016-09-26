'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-14 10:52:57
*/

import Backbone from 'backbone';
import Marionette from 'marionette'
import _ from 'underscore'

import template from 'text!templates/base_tmpl.html';

class BaseView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'page' }

    /* methods */
    initialize(options) {
        console.log(options)
    }
    
}

export default BaseView