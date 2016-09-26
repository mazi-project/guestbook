'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-17 11:17:50
*/

import Marionette from 'marionette';
import _ from 'underscore';
import TagCollection from 'models/tag_collection';
import TagItemView from 'views/tag_item_view'

class TagListView extends Marionette.CollectionView {

	/* properties */

    get className() { return 'tag-list' }

    get tagName() { return 'ul' }

    get childView() { return TagItemView }


    /* methods */
    initialize(options) {

        this.collection = new TagCollection();
        this.collection.fetch();

        // setup collection events
        this.listenTo(this.collection,'sync',this.onCollectionLoaded)

        if (_.has(options,'tag')) {
            this.setTag(options.tag);
        }
    }

    setTag(tag) {
    	this.tag = tag;
    	this.children.each( (childView) => {
    		if (childView.model.get('name') == this.tag)
    			childView.setSelected(true);
    		else
    			childView.setSelected(false);
    	});
    }

    onCollectionLoaded() {
    	this.setTag(this.tag)
    }
}

export default TagListView