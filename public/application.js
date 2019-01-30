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
		var self = this;
		this.Collections.jobs = new JobCollection();
		this.Templates['job'] = Handlebars.compile(document.getElementById("job-template").innerHTML);
		this.Templates['collection'] = Handlebars.compile(document.getElementById("collection-template").innerHTML);
		this.Templates['header'] = Handlebars.compile(document.getElementById("header-template").innerHTML);
		
		
		var context = {button: "", title: "Benvingut", subheader: "Fes click a les 3 ralles per començar", "icon": ""}
				
				//$('.sidenav').sidenav('close');
				
		$('#app').html(this.Templates['header'](context));

		this.Views['sidebar'] = new SidebarView({
    		el:$('#nav-mobile')
		});

		this.Views['job'] = new JobView({
    		el:$('#app')
		});
	

		if ('serviceWorker' in navigator) {  			
  			navigator.serviceWorker.register('/CintiaApp/sw.js');
		}		
		
		document.addEventListener('fetch', function(event){
			console.log('Algo relacionado con el worker');
		});


		document.addEventListener('install', function(e) {
		 e.waitUntil(
		   caches.open('airhorner').then(function(cache) {
		     return cache.addAll([
		       '/',
		       '/index.html',
		       '/index.html?homescreen=1',
		       '/?homescreen=1',
		       '/styles/main.css',
		       '/scripts/main.min.js',
		       '/sounds/airhorn.mp3'
		     ]);
		   })
		 );
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
		    initialize: function(){
		    	var that = this;
		        this.fetch({
		            success: this.fetchSuccess,
		            error: this.fetchError
		        });		        
		    },
		    fetchSuccess: function (collection, response) {
		       // collection.render();
		       App.Views['sidebar'].render();
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
			this.save();
			this.resetView();
			noSleep.disable();
		}
	},
	render: function(id){
		this.start_date = this.end_date = null;
		this.id = id;						
		var model = App.Collections.jobs.get(this.id).toJSON();				
		$('#app').html(App.Templates['job'](model));
		
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
			elapsedDuration: moment.duration(moment().diff(this.start_date)).asMinutes().toFixed(2),
			job: this.id
		};

		$('#message').html(moment.duration(moment().diff(this.start_date)).asMinutes().toFixed(2)+' minuts');
		App.saveActivity(data);
		
	}
});


var SidebarView = Backbone.View.extend({	
	initialize: function() {
		var self = this;
		//this.render();
	},
	render: function(){
			console.log('Rendering Collection'); 				
			
			var context = App.Collections.jobs.toJSON(); //{title: "My New Post", body: "This is my first post!"};
			console.log("render",context);
			var html    = App.Templates['collection']({collection:context});
			$('#nav-mobile').html(html);
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

