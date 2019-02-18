/*

	Cintia App
	January 2018
	@betoayesa
*/

$ = jQuery;

var noSleep = new NoSleep();

var App = {
	Collections: {},
	jobsId: null,
	ordersId: null,
	clientsId: null,
	DATA: {},
	data:{
	   self: this,
	   set: function(x,y){
	       App.DATA[x] = y;
	   },
	   get: function(x){
	       if (typeof App.DATA[x] != "undefined"){
	           return App.DATA[x];
	       }
	       return null;
	   }
	},
	usersId: null,
	Templates: {},
	loaded: 0,
	Views: {},
	init: function(opts){
		var self = this;
		
		for (var p in opts){
		  this[p] = opts[p];
		  console.log(opts[p]);
		}
		this.Collections.jobs = new JobCollection();
		this.Collections.orders = new OrderCollection();
		
		if ('serviceWorker' in navigator) {  			
  			navigator.serviceWorker.register('/sw.js');
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
		
		
		var isLoaded = function(){ 		
          if (self.loaded > 1){
              self.startup();
		  }else{
		      setTimeout(function(){
		          isLoaded();
	          },500);
		  }
        }
		isLoaded();
		

        
	},
	startup: function(){
	    var self = this;
        this.Templates['job'] = Handlebars.compile(document.getElementById("job-template").innerHTML);
		this.Templates['collection'] = Handlebars.compile(document.getElementById("collection-template").innerHTML);
		this.Templates['orders'] = Handlebars.compile(document.getElementById("orders-template").innerHTML);
		
		this.Templates['order'] = Handlebars.compile(document.getElementById("order-template").innerHTML);
		
		this.Templates['jobs'] = Handlebars.compile(document.getElementById("jobs-template").innerHTML);
		
		this.Templates['header'] = Handlebars.compile(document.getElementById("header-template").innerHTML);
		
		
//		var context = {button: "", title: "Benvingut Lucas", subheader: "Fes click a les 3 ralles per començar", "icon": ""}
								
				
		//$('#app').html(this.Templates['header'](context));

		this.Views['jobs'] = new JobsView();
		this.Views['orders'] = new OrdersView();
		this.Views['job'] = new JobView();
    	this.Views['order'] = new OrderView();

        this.Views['orders'].render();
   		  
   		  
   		  $('#app #loader').hide();
   		  
   		  

	},
	resetUI: function(){
	   $('#app #main >.section').removeClass("show");
	},
	setHeader: function(h){
	   $('#app #header').text(h);
	},
	show: function(sectionId,params){
		console.log('trying to show'+sectionId);
		

		
		if (typeof this.Templates[sectionId] != "undefined"){
            var html = this.Templates[sectionId](params);	
            $('#app #main .section').removeClass("show");		
			$('#app #main #'+sectionId).addClass("show");
			console.log('eureka to show'+sectionId);
		}		else{
			console.log('failed to show'+sectionId);
		}
	},
	redirect:function(){
	   window.location.href="/";
	},
	saveActivity: function(data){
		data.user_id = App.currentWorker;
		data.client_id = App.client_id; // nice 
		var activity = new Activity(data);
		activity.save();
	}
};


var Activity = Backbone.Model.extend({
    url:'/en/api/activity',
    //urlRoot:'/'+App.clientId+'/documents',
	methodToURL:{    	
        'read':'/documents/read',
        'create':'/en/api/activity',
        'update':'/documents/edit/',
        'delete':'/documents/delete/'
    },
   idAttribute: "activityId",
});

var JobModel = Backbone.Model.extend({
    url:'/en/api/jobs',
    //urlRoot:'/'+App.clientId+'/documents',
	methodToURL:{    	
        'read':'/documents/read',
        'create':'/en/api/activity',
        'update':'/documents/edit/',
        'delete':'/documents/delete/'
    },
   idAttribute: "jobsId",
});
var OrderModel = Backbone.Model.extend({
    url:'/en/api/orders',
    //urlRoot:'/'+App.clientId+'/documents',
	methodToURL:{    	
        'read':'/documents/read',
        'create':'/en/api/activity',
        'update':'/documents/edit/',
        'delete':'/documents/delete/'
    },
   idAttribute: "ordersId",
});

var JobCollection =  Backbone.Collection.extend({	
		model: JobModel,
			url: '/es/api/job', //'+App.clientId+'			
		    initialize: function(){
		    	var that = this;
		        this.fetch({
		            success: this.fetchSuccess,
		            error: this.fetchError
		        });		        
		    },
		    fetchSuccess: function (collection, response) {
		       // collection.render();
		       App.loaded++;
		    },
		    fetchError: function (collection, response) {
		        //alert("Fetch error");
		        App.redirect();
		        throw new Error("Documents fetch error");
		    },
		});


var OrderCollection =  Backbone.Collection.extend({	
		model: OrderModel,
			url: '/es/api/order', //'+App.clientId+'			
		    initialize: function(){
		    	var that = this;
		        this.fetch({
		            success: this.fetchSuccess,
		            error: this.fetchError
		        });		        
		    },
		    fetchSuccess: function (collection, response) {
		       // collection.render();
                App.loaded++;
		    },
		    fetchError: function (collection, response) {
		        //alert("Fetch error");
   		        App.redirect();
		        throw new Error("Documents fetch error");
		    },
		});
		

var JobView = Backbone.View.extend({	
    el: $('#job.section'),
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
		App.show('job',model);
		
		// Clock		
	},
	resetView: function(){
		$('.js-play-job').removeClass("hidden");
		$('.js-close-job',this.el).addClass("hidden");
		$('.progress',this.el).addClass("hidden");
	},
	save: function(){
		var data = {
			start: this.start_date.format('YYYY-MM-DD H:mm:ss'),
			end: this.end_date.format('YYYY-MM-DD H:mm:ss'),
			duration: moment.duration(moment().diff(this.start_date)).asMinutes().toFixed(2),
			job_id: this.id
		};

		$('#message').html(moment.duration(moment().diff(this.start_date)).asMinutes().toFixed(2)+' minuts');
		App.saveActivity(data);
		
	}
});



var QRView = Backbone.View.extend({
    scanner: null,
    el: $('#qrscanner.section'),
    initialize: function(){
    
     this.scanner = new Instascan.Scanner({ video: document.getElementById('qr-preview') });
    },
    render: function(){    
      var self = this;
     
      this.scanner.addListener('scan', function (content) {
        console.log(content);
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          self.scanner.start(cameras[0]);
           App.resetUI();
          $('#qrscanner.section').addClass("show");
        } else {
          alert('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });   
    }    
});
var qrView = new QRView();

var OrderView = Backbone.View.extend({
    el: $('#order.section'),	
	id: null,
	start_date: null,
	end_date: null,
	initialize: function(){

	},
	events:{
	   'click a.breadcrumb:first-child':'back',
	   'click #back':'back',
	   'click #continue':'next'
	},
	
	render: function(id){
    	console.log("Order.Render",id);
		this.start_date = this.end_date = null;
		this.id = id;			
		console.log(App.Collections);
		var context = App.Collections.orders.get(this.id).toJSON();				
		context.collection = [
		      {name: "221 Libreta blanco", "badge":12}
		  ];
        
        App.data.set('order', context);
		

		var html = App.Templates['order'](context);
		$(this.el).html(html);
		App.resetUI();		
		$(this.el).addClass("show");
	},
	next: function(){
	console.log('next');
	   App.Views['jobs'].render();
	},
	qr: function(){
	
	   qrView.render();
	   
	},
	back: function(e){
    	e.preventDefault();
    	e.stopPropagation();
	   App.Views['orders'].render();
	},
	resetView: function(){
		$('.js-play-job').removeClass("hidden");
		$('.js-close-job',this.el).addClass("hidden");
		$('.progress',this.el).addClass("hidden");
	},
	save: function(){
		var data = {
			start: this.start_date.format('YYYY-MM-DD H:mm:ss'),
			end: this.end_date.format('YYYY-MM-DD H:mm:ss'),
			duration: moment.duration(moment().diff(this.start_date)).asMinutes().toFixed(2),
			job_id: this.id
		};

		$('#message').html(moment.duration(moment().diff(this.start_date)).asMinutes().toFixed(2)+' minuts');
		App.saveActivity(data);
		
	}
});



var JobsView = Backbone.View.extend({	
    el: $('#jobs.section'),
	initialize: function() {
		var self = this;
		//this.render();
	},
	render: function(){
			console.log('Rendering Collection'); 				
			
			var context = {
			 collection:App.Collections.jobs.toJSON(),
			 order: App.data.get('order')
			
			}; //{title: "My New Post", body: "This is my first post!"};   

			console.log("render",context);
			var html    = App.Templates['jobs'](context);
			$(this.el).html(html);
			App.resetUI();
			$(this.el).addClass("show");

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
//		$('#nav-mobile').sidenav('close');
	}	
});




var OrdersView = Backbone.View.extend({	
    el: $('#orders.section'),
	initialize: function() {
		var self = this;
		var context = {header:"Header",subheader:"sub header", icon: "user", collection: App.Collections.orders.toJSON()}; //{title: "My New Post", body: "This is my first post!"};


        $(self.el).html(App.Templates['orders'](context));
		//this.render();
	},
	render: function(){
        App.resetUI();
        $(this.el).addClass("show");
	},
	events: {		
		'click .collection-item': 'showOrder',		
	},
	showOrder: function(e){
		e.preventDefault();
		e.stopPropagation();
		var id = $(e.target).attr("id");
		console.log("Opening job",id);
		
		App.Views['order'].render(id);

//		$('#nav-mobile').sidenav('close');
	}	
});

$(document).ready(function(){
	App.init({clientsId: 1});
});

