var fs = require('fs');
var _ = require('underscore');

module.exports = {

	//handle errors in express routers
	handleError: function(err,res) {
		if(err) {
			if (_.has(err,'message'))
				print(err.message,'ERROR');
			else
	        	print(err,'ERROR');

	        //if res defined, also give server answer
	        if (res) {
	        	res.setHeader('Content-Type','application/json');
	        	res.status(500).send({ error: err });
	        }

	        return true;
	    }
	    return false;
	},

	//escape paths in mongoose pre save middleware
	escapePath: function(doc, path) {
        elements = doc.get(path);
        if (_.isArray(elements))
            doc.set(path, _.map(elements,_.escape))
        else    
            doc.set(path, _.escape(elements));
    }
}