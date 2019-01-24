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
	view: null,
	init: function(){
		
		function showTime(){
		    var date = new Date();
		    var h = date.getHours(); // 0 - 23
		    var m = date.getMinutes(); // 0 - 59
		    var s = date.getSeconds(); // 0 - 59
		    var session = "AM";
		    
		    if(h == 0){
		        h = 12;
		    }
		    
		    if(h > 12){
		        h = h - 12;
		        session = "PM";
		    }
		    
		    h = (h < 10) ? "0" + h : h;
		    m = (m < 10) ? "0" + m : m;
		    s = (s < 10) ? "0" + s : s;
		    
		    var time = h + ":" + m + ":" + s + " " + session;
		    document.getElementById("clock").innerText = time;
		    document.getElementById("clock").textContent = time;
		    
		    setTimeout(showTime, 1000);
		    
		}

		showTime();
		this.showJobCollection();
	},
	showJobCollection: function(){
		var jobs = new JobCollectionView({
    		el:$('#app')
		});
	}
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

		

var JobView = Backbone.View.extend({	
	initialize: function(){

	},
	events:{
		'click .js-play-job': 'play',
		'click .js-close-job': 'close',

	},
	play: function(e){
		e.preventDefault();
		$('.js-play-job',this.el).addClass("hidden");
		$('.js-close-job',this.el).removeClass("hidden");
		$('.progress',this.el).removeClass("hidden");

	},
	close: function(e){
		e.preventDefault();
		this.resetView();
	},
	render: function(id){
		var source  = document.getElementById("job-template").innerHTML;
		var template = Handlebars.compile(source);
		var context = {name:"X"}; //{title: "My New Post", body: "This is my first post!"};
		console.log("render",context);
		var html    = template({collection:context});
		$('#app').html(html);

		// Clock
		

	},
	resetView: function(){
		$('.js-play-job').removeClass("hidden");
		$('.js-close-job',this.el).addClass("hidden");
		$('.progress',this.el).addClass("hidden");
	}
});

var JobCollectionView = Backbone.View.extend({	
	initialize: function() {
		var self = this;
		this.render();

	},
	render: function(){
		App.Collections.jobs = new JobCollection();
	},

	events: {		
		'click .collection-item': 'showJob',		
	},
	showJob: function(e){
		e.preventDefault();
		e.stopPropagation();
		id = $(e.target).attr("id");
		console.log("Opening job",id);
		var job_view = new JobView({
    		el:$('#app')
		});

		job_view.render(id);
	}
	
});










$(document).ready(function(){
	App.init();
});






