/*

	Cintia App
	January 2018
	@betoayesa
*/

$ = jQuery;

var noSleep = new NoSleep();

var App = {
	Collections: {},
	currentJob: null,
	currentMachine: null,
	currentWorker: 'Lucas',
	Templates: {},
	clientId: 1,
	Views: {},
	init: function(){
		this.Collections.jobs = new JobCollection();
		this.Templates['job'] = document.getElementById("job-template").innerHTML;
		this.Templates['collection'] = document.getElementById("collection-template").innerHTML;
		this.Templates['header'] = document.getElementById("header-template").innerHTML;
		

		var template = Handlebars.compile(this.Templates['header']);
		var context = {button: "", title: "Benvingut", subheader: "Fes click a les 3 ralles per començar", "icon": ""}
				
				//$('.sidenav').sidenav('close');
				
		$('#app').html(template(context));



		this.Views['sidebar'] = new JobCollectionView({
    		el:$('#nav-mobile')
		});

		this.Views['job'] = new JobView({
    		el:$('#app')
		});
		
		
	},
	show: function(sectionId){
		console.log('trying to show'+sectionId);
		if (typeof this.Views[sectionId] != "undefined"){
			this.Views[sectionId].render();
			console.log('eureka to show'+sectionId);
		}		else{
			console.log('failed to show'+sectionId);
		}
	},
	saveActivity: function(data){
		data.worker = App.currentWorker;
		data.clientId = App.clientId; // nice 
		var activity = new Activity(data);
		activity.save();
	}
};


var Activity = Backbone.Model.extend({
    url:'/CintiaApp/en/api/activity',
    //urlRoot:'/'+App.clientId+'/documents',
	methodToURL:{    	
        'read':'/documents/read',
        'create':'/CintiaApp/en/api/activity',
        'update':'/documents/edit/',
        'delete':'/documents/delete/'
    },
   idAttribute: "id",
});

var JobCollection =  Backbone.Collection.extend({	
				
			url: '/CintiaApp/es/api/job', //'+App.clientId+'			
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
		    	var that = this;
		        this.fetch({
		            success: this.fetchSuccess,
		            error: this.fetchError
		        });		        

		        this.on('change', function (model, options) {
    				//console.log('collection:change', model, options);
    				that.render();
    				
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
console.log('Rendering Collection');
 				
				var template = Handlebars.compile(App.Templates['collection']);
				var context = this.toJSON(); //{title: "My New Post", body: "This is my first post!"};
				console.log("render",context);
				var html    = template({collection:context});
				$('#nav-mobile').html(html);

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
	id: null,
	start_date: null,
	end_date: null,
	initialize: function(){

	},
	events:{
		'click .js-play-job': 'play',
		'click .js-close-job': 'stop',

	},
	play: function(e){
		e.preventDefault();
		$('.js-play-job',this.el).addClass("hidden");
		$('.js-close-job',this.el).removeClass("hidden");
		$('.progress',this.el).removeClass("hidden");
		this.start_date = moment();
		document.addEventListener('click', function enableNoSleep() {
  			document.removeEventListener('click', enableNoSleep, false);
  			noSleep.enable();
		}, false);		
	},
	stop: function(e){
		e.preventDefault();
		e.stopPropagation();
		if (confirm('Això donarà la tasca per acabada. Estàs segur?')){
			this.end_date = moment();
			this.resetView();
			this.save();
			noSleep.disable();
		}
	},
	render: function(id){
		this.id = id;		
		var that = this;
		var template = Handlebars.compile(App.Templates['job']);
		var model = App.Collections.jobs.get(this.id);

		var context = model.toJSON();		
		var html    = template(context);
		$('#app').html(html);
		
		// Clock		
	},
	resetView: function(){
		$('.js-play-job').removeClass("hidden");
		$('.js-close-job',this.el).addClass("hidden");
		$('.progress',this.el).addClass("hidden");
	},
	save: function(){
		var data = {
			
			start_date: this.start_date.format('Y-m-d H:mm:ss'),
			end_date: this.end_date.format('Y-m-d H:mm:ss'),
			elapsedDuration: moment.duration(moment().diff(this.start_date)).asMinutes(),
			job: this.id
		};

		$('#message').html(moment.duration(moment().diff(this.start_date)).asMinutes()+' minuts');



		App.saveActivity(data);
		
	}
});


var JobCollectionView = Backbone.View.extend({	
	initialize: function() {
		var self = this;
		this.render();
	},
	render: function(){
		
	},
	events: {		
		'click .collection-item': 'showJob',		
	},
	showJob: function(e){
		e.preventDefault();
		e.stopPropagation();
		var id = $(e.target).attr("id");
		console.log("Opening job",id);
		
		App.Views['job'].render(id);
		$('#nav-mobile').sidenav('close');
	}	
});


$(document).ready(function(){
	App.init();
});






