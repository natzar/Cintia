/*

	STANDART
	CUSTOM - Application.js
	@Modify at your own
*/

var App = {
	Models: {},
	Collections: {}
};

$ = jQuery;
$(document).load(function(){
	
});		
		 
$(document).ready(function()
{

	console.log("STANDART 2");
	console.log("Standart Loaded...");
	console.log("document.ready()");
	var base_url = BASE_URL;
	var	cadena = unescape(document.location.href);
	cadena = cadena.substr(cadena.indexOf(base_url)+base_url.length);
	
	var aux = cadena.split("/");
	
	cadena = aux[0]+"/"+aux[1];
	
	var obj = $("a[href='"+cadena+"']");

	obj.each(function(){
		if ($(this).parent().get( 0 ).tagName == 'LI'){
			$(this).parent().addClass("active list-group-item-active current-menu-item");
		}else{
			$(this).addClass("active list-group-item-active current-menu-item");			
		}

	});
	if (obj.length < 1){
		var obj = $("a[href='"+base_url+"']");
		obj.parent().addClass("current-menu-item");
	}
	
	language_link = cadena.substr(0,cadena.indexOf('/'));
	$('a[href="'+language_link+'"]').addClass("active list-group-item-active current-menu-item");			
	
	   var height = $(window).scrollTop();

    if(height  > 30) {
            $('#header').css("background","#242424");     // do something
    } else {
            $('#header').css("background","transparent");     // do something
    }
    
});


$(window).scroll(function() {
  
});


/* header view */
var PublicDocView = Backbone.View.extend({	
	tree: null, // DocumentCollection
	is_admin: false,
	mode: 'table', // table or cards
	current_folder: "0",
	selectedItems:[],
	path: [{ name: "Documents", id: 0}],	
	stats: { total_gb: 0, total_documents: 0},
	collection_endpoint: '/documents/fetch', // Public Doc Portal
	download_endpoint: "/documents/download_multiple",
	download_zip_endpoint: "/documents/download_zip/",
	permission: '-public', // Used for JST templates (cards-public || cards);
	initialize: function() {
		var self = this;
		if ($('#documents').length < 1){	
			return;
		}
		// Load Admin Features?
		if ($('#documents').hasClass("documents-admin")){				
			self.loadAdminFeatures();
		}else{
			self.loadPropertiesDropdown();
		}

		if(window.location.hash != '') {
			self.current_folder = window.location.hash.substr(1,window.location.hash.length).trim();
		}

		var DocumentCollection =  Backbone.Collection.extend({
			model: Document,
			url: self.collection_endpoint,
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
		            if (model.attributes.is_folder < 1){
		            	self.stats.total_documents++;
		            	self.stats.total_gb += parseInt(model.attributes['size']);
		            	self.refreshStats();
		            }

		     //        var parent_folder = null;
							// if (item.is_folder == 1){
							// 	parent_folder = self.tree.get(item.id);
		     					
							// }else{
							// 	parent_folder = self.tree.get(item.parent_id);
							// }
							// self.refreshFolderStats(parent_folder);

		            this.sortByField('is_folder');
    				
		        });
		        this.on('remove', function (model, collection, options) {		          
		            if (model.attributes.is_folder < 1){
		            	self.stats.total_documents--;
		            	self.stats.total_gb -= parseInt(model.attributes['size']);
		            	self.refreshStats();
		            }
		        });
		    },
		    fetchSuccess: function (collection, response) {
		    	// Initial sort
		    	// this.models =  _.sortBy(this.models, function(model){
			    //             return (-1*model.get('is_folder'))+'-'+model.get('name');
			    // });			    
		        self.displayCurrentFolder();
				self.refreshStats();
		    },
		    fetchError: function (collection, response) {
		        alert("Documents fetch error");
		        throw new Error("Documents fetch error");
		    },
		});

		self.tree = new DocumentCollection();// Re-create collection and show folder's content
		$(document).ready(function(){ self.adjustViewport(); });
		
		$(window).on('hashchange', function() {
  			self.current_folder = window.location.hash.substr(1,window.location.hash.length).trim();		
  			self.displayCurrentFolder();
		});


		$(window).resize(function() {
  			//update stuff
  			self.adjustViewport();
		});

	},
	render: function(){
		
	},

	events: {
		'click #checkbox-select-all': 'toggleItems',
		'click input.select-item': 'selectItem',		
		'mouseup .folder-item': 'navigateToFolder',
		'click .js-actions-bar__download': 'downloadItems',
		'click .documents-options a': 'switchLayout',
		// 'click .sort': 'sortColumns'
	},
	loadPropertiesDropdown: function(){

		$('.sl-dropdown .current-value').click(function(e){
			e.preventDefault();
			e.stopPropagation();
			if ($(this).parent().find('.items').hasClass("open")){
				$(this).parent().find('.items').removeClass("open");	
			}else{
				$(this).parent().find('.items').addClass("open");
			}
		});
		
		$('.sl-dropdown .items .item').click(function(e){
			$(this).parent().parent().removeClass("open");
		});

		$.get('/users/websites',function(data){
			console.log(data);
			data.forEach(function(item){				
				$('.sl-dropdown .items').append(JST['documents/user-property'](item.Website));

			});

			$('.sl-dropdown .items .item').click(function(){
				var domain = $(this).attr("domain");
				window.location = domain+'/login?token='+bootstrap.token;
			});
			
		},'json');
	},
	adjustViewport: function(){
		// Detect Responsive
		var window_width = $(window).width();
		if (window_width < 640 && !this.is_admin){
			
			$('.documents-options').hide();
		}else{
			$('.documents-options').show();
		}
	},
	sortColumns:function(e){
//<a class="sort" direction="ASC" field="name">
		var field = $(e.target).attr("field");
		var direction = $(e.target).attr("direction");
		this.tree.sortByField(field,direction);
		this.displayCurrentFolder();
	},
	refreshStats: function(){
		var self = this;
		$('#js-total-documents').text(self.stats.total_documents+ ' Documents');
		$('#js-total-gb-used').text( formatBytes(self.stats.total_gb,2)+' used');
	},
	loadAdminFeatures: function() {
		var self = this;		
		// Init Admin UI Features		
		_.extend(this, AdminDocView);		
		this.bindAdminActions();	
	},
	switchLayout: function(e){
		$('input.select-item').prop('checked',false);
		this.selectedItems = [];
		var layout = $(e.target).closest('.button').attr("layout");
		$('.documents-options a').removeClass('active');
		$(e.target).closest('.button').addClass("active");
		this.mode = layout;		
		this.displayCurrentFolder();
		$(document).foundation('equalizer', 'reflow');

	},
	toggleItems: function(){
		var self = this;
		var active = $('#checkbox-select-all').prop('checked');		
		$('input.select-item').prop('checked',active);
		this.selectedItems = [];
		if (active){
			this.selectedItems = [];
			$('input.select-item').each(function(i,item){
				self.selectedItems.push($(item).attr("item_id"));
			});
		}

		this.toggleBottomBar();
	},
	
	selectItem: function(e){
		var item_id = $(e.target).attr("item_id");
		var active = $(e.target).prop("checked");
		if (!active){
			// Remove item id from selectedItems
			var index = this.selectedItems.indexOf(item_id);
			if (index > -1) {
			  this.selectedItems.splice(index, 1);
			}
		}else{
			this.selectedItems.push(item_id);	
		}		
		
		this.toggleBottomBar();
	},
	toggleBottomBar: function(){
		if (this.selectedItems.length > 0 && $('input.select-item:checked').length){
			$('.js-actions-bar').addClass("active");			
		}else{
			$('.js-actions-bar').removeClass("active");			
		}
	},


	displayCurrentFolder: function(){
		var self = this;

		// Prevent doing nothing if folder doesn't exist
		if (isNaN(parseInt(self.current_folder ))){
			self.current_folder = "0";
		}
		var h_folder = self.tree.get(self.current_folder);			
		if (self.current_folder != 0 && (typeof h_folder == "undefined" || h_folder.get('is_folder') == 0 ) ){
			return;
		}			

		self.breadcrumb();	
		self.resetUI();		
		if (self.is_admin){
			$('.dropzone-uploader').attr("data-endpoint","/"+bootstrap.site_id+"/documents/upload/"+self.current_folder);

		}	
		$('.js-documents-container').html('');
		$('.js-documents-container').append(JST['documents/'+self.mode+self.permission]);

		var items = self.tree.where({ parent_id: self.current_folder});
		
		if (items.length > 0){
			var is_folder = items[0].attributes.is_folder;
			if (self.current_folder != "0" && self.is_admin){
				var parent = self.tree.get(self.current_folder)
				var parent_id = parent.get('parent_id');
				var counter = parent.get('counter');
				$('#documents-'+self.mode).append(JST['documents/'+self.mode+'-item'+self.permission]({id: parent_id, name: '..', is_folder: true, is_private: false, counter: counter, size: 0, date: null}));				
			}
			items.forEach(function(item){
				// hack for cards view, to separate folders and files
				if (is_folder == 1 && item.attributes.is_folder == 0){
					$('#documents-cards').append('<div class="row"></div>');
					is_folder = 0;
				}
				$('#documents-'+self.mode).append(JST['documents/'+self.mode+'-item'+self.permission](item.attributes));				
			});						
			
		}else{			
			this.UIisEmpty();
		}
		$(document).foundation('equalizer', 'reflow');
	

		
	},
	UIisEmpty: function(){
		if (this.is_admin){
				$('.js-documents-container').html('');
				$('.dropzone-container').show();
			}else{
				$('.js-documents-container').html('<div class="empty-folder">There are no files in this folder</div>');
			}
	},
	resetUI: function(){
		var self = this;
		$('#checkbox-select-all').prop('checked',false);
		$('input.select-item').prop('checked',false);
		$('.dropzone-container').hide();
		
		this.selectedItems = [];
		this.toggleBottomBar();		
		// Admin: UPLOAD dropdown
		$('.upload-button__dropdown').removeClass("active");
		$('.dropzone-container', this.el).hide();
		$('#documentsProgressModal').foundation('reveal', 'close');
		
		// Count items in collection
		var items = self.tree.where({ parent_id: self.current_folder});
		if (items.length < 1){
			this.UIisEmpty();
		}
		
	},

	downloadItems: function(e){ // All selected items from action bar
		if (e) e.preventDefault();
		var self = this;
		self.toggleBottomBar();		
	
		$.ajax({
			type : "POST",
			url : self.download_endpoint,
			data : JSON.stringify({items: self.selectedItems}),
			contentType: "application/json; charset=UTF-8",
			success: function (response) {  				
			    // Hide upload progress modal	
		    	response = JSON.parse(response);	
		    	$('#documentsProgressModal').foundation('reveal', 'close');
				if (response.error){
					
					alert(response.error);
				}else if(response.zip_id){
					self.resetUI();
					
					window.location = self.download_zip_endpoint+response.zip_id;;
					
				}else{
					alert({message:"One of the files you want to download doesn't exist", title: "Error"});
				}
				$('#documentsProgressModal').foundation('reveal', 'close');					
			},			
			error: function (e) {
			    setTimeout(function(){
					$('#documentsProgressModal').foundation('reveal', 'close');
					setTimeout(function(){
						alert({message:"One of the files you want to download doesn't exist", title: "Error"});   
					},200);
				},500);
			},
			beforeSend: function(){				
		    	// Handle the beforeSend event 
		     	$('#documentsProgressModal').foundation('reveal', 'open');
		   },
		   complete: function(){		   	
				setTimeout(function(){
					$('#documentsProgressModal').foundation('reveal', 'close');				
				},500);
		   }
		});	
	},

	breadcrumb: function(){
		var self = this;
		this.getPathToFolder();

		$('.breadcrumb').html('<h4></h4>');
		var els_count = 0;
		var last_el = self.path.length - 1;

		self.path.forEach(function(item){
			if (els_count > 0){
				$('.breadcrumb h4').append('<i class="icon-right-open"></i> ');				
			}
			if (last_el == els_count){
				$('.breadcrumb h4').append(item.name);
			}else{
				$('.breadcrumb h4').append('<a folder_id="'+item.id+'" href="#'+item.id+'" class="folder-item">'+item.name+'</a>');
			}
			
			els_count++;
		});
	},
	getPathToFolder: function(){
		var self = this;
		self.path = [];
		var parent_id = null;
		var deep = 0;
		var deep_max = 10;
		var folder_id = self.current_folder;
		while (folder_id != 0 && deep < deep_max){
			content = self.tree.get(folder_id);
			self.path.push({ name: content.get('name'), id: content.get('id')});
			folder_id = content.get('parent_id');			
			deep++;
		}

		self.path.push({ name: "Documents", id: 0});
		
		self.path = self.path.reverse();

	},
	navigateToFolder: function(e){
		e.preventDefault();
		e.stopPropagation();
		this.current_folder = $(e.target).closest('.folder-item').attr("folder_id");
		window.location.hash = "#"+this.current_folder;		
		window.scrollTo(0,0);		
	},
	countFolderSubElements: function(folder_id){
		// Find number of docs
		var self = this;
		var parent = self.tree.where({parent_id: folder_id});
		var count = 0;
		parent.forEach(function(item) {
			if (item.get('is_folder') == 1){
				count += 1 + self.countFolderSubElements(item.get('id'));
			}else{
				count += 1;
			}
		});
		return count;
	},

	getFolderSize: function(folder_id){ /* Recursive */		
		var self = this;
		var parent = self.tree.where({parent_id: folder_id});
		var size = 0;
		parent.forEach(function(item) {
			if (item.get('is_folder') == 1){
				size += self.getFolderSize(item.get('id'));
			}else{
				size += parseInt(item.get('size'));
			}
		});
		return size;
	}
});

var public_doc_view = new PublicDocView({
    el:$('#documents')
});

var source   = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);


var context = {title: "My New Post", body: "This is my first post!"};
var html    = template(context);

