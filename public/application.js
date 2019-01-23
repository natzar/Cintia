/*

	Cintia App
	January 2018
	@betoayesa
*/

$ = jQuery;


var App = {
	Models: {},
	Collections: {},
	currentJob: null,
	currentMachine: null,
	currentWorker: null,
	clientId: 1,
	view: null
};



var JobModel = Backbone.Model.extend({
    url:'/'+App.clientId+'/documents',
    urlRoot:'/'+App.clientId+'/documents',
    methodToURL:{    	
        'read':'/documents/read',
        'create':'/documents/add',
        'update':'/documents/edit/',
        'delete':'/documents/delete/'
    },
    // sync:function (method, model, options) {
    //     options = options || {};
    //     options.url = model.methodToURL[method.toLowerCase()];
    //     if (method == 'delete' || method == 'update') {
    //         options.url += model.attributes.id
    //     }
    //     if (method == 'read' && model.attributes.id) {
    //         options.url += '/view/' + model.attributes.id
    //     }
        
    //     if( typeof model.attributes.action != 'undefined') {
    //         switch (model.attributes.action) {
    //             case 'reorder':
    //                 options.url = '/'+bootstrap.site_id+'/documents/reorder';
    //             break;
    //             case 'set_permissions':
    //                 options.url = '/'+bootstrap.site_id+'/documents/set_permissions/'+model.attributes.id;
    //             break;
    //             case 'get_permissions':
    //                 options.url = '/'+bootstrap.site_id+'/documents/get_permissions/'+model.attributes.id;
    //             break;
    //             case 'process_permissions':
    //                 options.url = '/'+bootstrap.site_id+'/documents/process_permissions/'+model.attributes.id;
    //             break;
    //         }
    //     }



    //     Backbone.sync(method, model, options);
    // },
    // defaults: {
    //     id: "",
    //     label: "",
    //     color: ""
    // },
    idAttribute: "id"

});

//new DocumentCollection();


// /* @end */

var JobCollection =  Backbone.Collection.extend({			
			url: '/Cintia/es/api/job', //'+App.clientId+'			
			sortByField: function(field, direction){
	            sorted = _.sortBy(this.models, function(model){
	                //return model.get(field)
	                return (-1*model.get(field))+'-'+model.get('name');
	            });

	            if(direction === 'DESC'){
	                sorted = sorted.reverse()
	            }

	            this.models = sorted;
	            self.displayCurrentFolder();
			},
		    initialize: function(){
		    	
		        this.fetch({
		            success: this.fetchSuccess,
		            error: this.fetchError
		        });		        

		        this.on('change', function (model, options) {
    				//console.log('collection:change', model, options);
    				
    				
				});
		        this.on('change:name', function (model, newTitle, options) {
		            this.sortByField('is_folder');
		        });
		        this.on('add', function (model, collection, options) {

		          //  this.sortByField('is_folder');
		            // if (model.attributes.is_folder < 1){
		            // 	self.stats.total_documents++;
		            // 	self.stats.total_gb += parseInt(model.attributes['size']);
		            // 	self.refreshStats();
		            // }

		     //        var parent_folder = null;
							// if (item.is_folder == 1){
							// 	parent_folder = self.tree.get(item.id);
		     					
							// }else{
							// 	parent_folder = self.tree.get(item.parent_id);
							// }
							// self.refreshFolderStats(parent_folder);

		            // this.sortByField('is_folder');
    				
		        });
		        // this.on('remove', function (model, collection, options) {		          
		        //     if (model.attributes.is_folder < 1){
		        //     	self.stats.total_documents--;
		        //     	self.stats.total_gb -= parseInt(model.attributes['size']);
		        //     	self.refreshStats();
		        //     }
		        // });
		    },
		    render: function(){

 				var source  = document.getElementById("collection-template").innerHTML;
				var template = Handlebars.compile(source);
				var context = this.toJSON(); //{title: "My New Post", body: "This is my first post!"};
				console.log("render",context);
				var html    = template({collection:context});
				$('#app').html(html);
		    },
		    fetchSuccess: function (collection, response) {
		    	// Initial sort
		    	// this.models =  _.sortBy(this.models, function(model){
			    //             return (-1*model.get('is_folder'))+'-'+model.get('name');
			    // });			
			    


		        collection.render();

		    },
		    fetchError: function (collection, response) {
		        //alert("Fetch error");
		        throw new Error("Documents fetch error");
		    },
		});

		








/* header view */
var AppView = Backbone.View.extend({	
	
	initialize: function() {
		var self = this;
		this.render();

	},
	render: function(){
		App.Collections.jobs = new JobCollection();
	},

	events: {
		'click #checkbox-select-all': 'toggleItems',
		'click input.select-item': 'selectItem',		
		'mouseup .folder-item': 'navigateToFolder',
		'click .js-actions-bar__download': 'downloadItems',
		'click .documents-options a': 'switchLayout',
		// 'click .sort': 'sortColumns'
	},
	
});


$(document).ready(function(){

	App.view = new AppView({
    	el:$('#app')
	});


});






