/*

	Cintia App
	January 2018
	@betoayesa
*/

$ = jQuery;

//var noSleep = new NoSleep();

var App = {
	Collections: {},
	jobsId: null,
	ordersId: null,
	clientsId: null,
	usersId: null,
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
	Templates: {},
	loaded: 0,
	Views: {},
	init: function(opts){
		var self = this;
		if (opts['clientsId'] == -1){
			self.redirect();
		}
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


		/*
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
*/
		
		
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

		this.Templates['orders'] = Handlebars.compile(document.getElementById("orders-template").innerHTML);	
		this.Templates['order'] = Handlebars.compile(document.getElementById("order-template").innerHTML);
		this.Templates['jobs'] = Handlebars.compile(document.getElementById("jobs-template").innerHTML);
		this.Templates['header'] = Handlebars.compile(document.getElementById("header-template").innerHTML);
		
		this.Views['jobs'] = new JobsView();
		this.Views['orders'] = new OrdersView();
    	this.Views['order'] = new OrderView();

        this.Views['orders'].render();
   		     		  
   		$('#app #loader').hide();
	},
	resetUI: function(){
		window.scrollTo(0, 0);
	   $('#app #main >.section').removeClass("show");
	},
	setHeader: function(h){
	   $('#app #header').text(h);
	},
	show: function(sectionId,params){
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
		data.usersId = this.usersId;
		data.clientsId = this.clientsId; // nice 
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
	order: null,
	initialize: function(){

	},
	events:{
	   'click a.breadcrumb:first-child':'back',
	   'click .back':'back',
	   'click .collection-item' : 'editOrder',
	   'click .continue':'next',	
	   'keyup #search-products':'search'  
	},
	render: function(id){
		this.id = id;			
		var context = App.Collections.orders.get(this.id).toJSON();				
        
        App.data.set('order', context);		

		var html = App.Templates['order'](context);
		$(this.el).html(html);
		App.resetUI();		
		$(this.el).addClass("show");
	},
	search:function(e){
		query = $('#search-products').val().toUpperCase();
		console.log('search',query);
		if (query == ""){
			$('.collection li',this.el).show();
		}else{
			$('.collection li',this.el).show().not('[data-title*="'+query+'"]').hide();

		}
	},
	editOrder: function(e){
		$li = $(e.target);
		e.preventDefault();
		e.stopPropagation();
		var done = prompt('Introduce Cantidad Completada',$li.attr("data-done"));		
		$li.attr("data-done", done);
		this.save();
	},
	next: function(){	
	   App.Views['jobs'].render();
	},
	
	back: function(e){
    	e.preventDefault();
    	e.stopPropagation();
	   App.Views['orders'].render();
	},
	rebuildJson: function(){
		var json =[];
		$('.collection li',this.el).each(function(){
			json.push({
				"cod": $(this).attr("data-cod"),
				"title": $(this).attr("data-title"),
				"done": $(this).attr("data-done"),
				"to_do": $(this).attr("data-to-do"),
			});
		});
		
		console.log('rebuild', json);
		return json;
	},
	save: function(){
		var content = this.rebuildJson();
		var model = App.Collections.orders.get(this.id);
		// Update collection + update server
		model.set({content: content});
		model.save();
		
		// Re render
		var html = App.Templates['order'](model.toJSON());
		$(this.el).html(html);

	}
});



var JobsView = Backbone.View.extend({	
    el: $('#jobs.section'),
    jobsId: null,
    ordersId: null,
	start_date:null,
	end_date: null,
	chrono: null,
	initialize: function() {
		var self = this;
	},
	render: function(){			
		var context = {
			 collection:App.Collections.jobs.toJSON(),
			 order: App.data.get('order')			
		};
		this.ordersId = App.data.get('order').ordersId;
		var html = App.Templates['jobs'](context);
		$(this.el).html(html);
		App.resetUI();
		$(this.el).addClass("show");
	},
	events: {		
		'click a.breadcrumb:first-child':'goToOrders',
		'click a.breadcrumb:nth-child(2)':'goToOrder',
		'click #back':'goToOrder',
		'click #qr-button': 'qrView.render',
	   	'click #checkout':'checkout',
    	'click .js-play-job': 'play',		
		'click .js-close-job': 'stop',
		'keyup #search-jobs': 'search'		
	},
	search:function(e){
		query = $('#search-jobs').val();
		console.log('search',query);
		if (query == ""){
			$('.collection li',this.el).show();
		}else{
			$('.collection li',this.el).show().not('[data-title*="'+query+'"]').hide();

		}
	},

	play: function(e){
		e.preventDefault();
		e.stopPropagation();
		this.resetJobs();
		
		
		
		$li = $(e.target).parent().parent().parent();
		$li.addClass("active");
		
		

		this.jobsId = $li.attr("jobsId");
		this.start_date = moment();
		this.chrono = new Chronometer($li.find('.title .time'));
		this.chrono.resume();
				
		$li.find('.js-play-job').addClass("hidden");
		$li.find('.js-close-job').removeClass("hidden");				
	},
	stop: function(e){
		$li = $(e.target).parent().parent().parent();
		e.preventDefault();
		e.stopPropagation();
		this.end_date = moment();
		this.save();
		this.resetJobs();
//		noSleep.disable();

		// Reset Search
		if ($('#search-jobs').val() != ""){
			$('#search-jobs').val('');
			this.search();
			// After reset search put into view the task
			//$li[0].scrollIntoView({ behavior: "smooth"})
		}


	},
	
	resetJobs: function(){
		if (this.chrono) this.chrono.reset();
		$('.collection li',this.el).removeClass("active");
		this.start_date = this.end_date = null;		
		$('.js-play-job').removeClass("hidden");
		$('.js-close-job',this.el).addClass("hidden");
	},
	save: function(){
		var data = {
			start: this.start_date.format('YYYY-MM-DD H:mm:ss'),
			end: this.end_date.format('YYYY-MM-DD H:mm:ss'),
			duration: moment.duration(moment().diff(this.start_date)).asMinutes().toFixed(2),
			jobsId: this.jobsId,
			ordersId: this.ordersId
		};

		App.saveActivity(data);
		
	},
	goToOrders: function(e){	
    	e.preventDefault();
    	e.stopPropagation();
	   App.Views['orders'].render();
	},
	goToOrder: function(e){	
    	e.preventDefault();
    	e.stopPropagation();
    	var id = App.data.get('order').ordersId;

	    App.Views['order'].render(id);
	},
	checkout: function(){
		alert("Finalizar ORDEN");	
	}
});

var OrdersView = Backbone.View.extend({	
    el: $('#orders.section'),
	initialize: function() {
		var self = this;
		var context = {collection: App.Collections.orders.toJSON()}; //{title: "My New Post", body: "This is my first post!"};


        $(self.el).html(App.Templates['orders'](context));
		//this.render();
	},
	render: function(){
		var self = this;
        App.resetUI();
        $(this.el).addClass("show");
        console.log($('#search-orders'));
        
	},
	events: {		
		'click .collection-item': 'showOrder',	
		'keyup #search-orders': 'search'

	},
	search:function(e){
		query = $('#search-orders').val();
		if (query == ""){
			$('.collection li',this.el).show();
		}else{
			$('.collection li',this.el).show().not('[data-title*="'+query+'"]').hide();
		}
	},
	showOrder: function(e){
		e.preventDefault();
		e.stopPropagation();
		var id = $(e.target).attr("data-id");
		console.log("Opening job",id);
		
		App.Views['order'].render(id);

//		$('#nav-mobile').sidenav('close');
	}	
});

$(document).ready(function(){
	if (!CONFIG) App.redirect();
	App.init(CONFIG);
});







Chronometer = function(el) {
  this.$el = el;
  this.secondsUpdated = 0;
  this.minutesUpdated = 0;
  this.hoursUpdated = 0;
  this.timing = undefined;
  this.toggleOnOff = false;
}

Chronometer.prototype = {
  // To Do Create something diferente for this guy
  changeElement: function(elementToChange, value) {
    value = value < 10 ? "0" + value : value
    this.$el.find('.'+elementToChange).text(value);
  },

  // To Do Create something diferente for this guy
  countingSeconds: function() {
    var that = this;

    this.timing = setTimeout(function() {
      that.countingSeconds();
    }, 1000);

    if (this.secondsUpdated < 59) {
      this.secondsUpdated += 1;
    } else {
      this.secondsUpdated = 0;

      if (this.minutesUpdated < 59) {
        this.minutesUpdated += 1;
        this.changeElement("minutes", this.minutesUpdated);
      } else {
        this.minutesUpdated = 0;
        this.hoursUpdated += 1;
        this.changeElement("hours", this.hoursUpdated);
      };
    };

    this.changeElement("seconds", this.secondsUpdated);
  },

  reset:function(){
	this.stop();
    this.secondsUpdated = 0;
    this.minutesUpdated = 0;
    this.hoursUpdated = 0;
    this.changeElement("seconds", 0);
    this.changeElement("minutes", 0);
    this.changeElement("hours", 0);
  },

  resume: function(){
    console.log('start/resume');
    if (!this.toggleOnOff) {
      this.toggleOnOff = true;
      this.countingSeconds();
    }
  },

  stop: function(){
    console.log('stop');
    clearTimeout(this.timing);
    this.toggleOnOff = false;
  }
}




Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});
