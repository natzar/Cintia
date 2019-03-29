<div id="camera"></div>
<div id="app"> <div id="header"></div><div id="main"> <div class="preloader-wrapper big active" id="loader" >
    <div class="spinner-layer spinner-blue-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
  
  <div id="orders" class="section"></div>
<div id="order" class="section"></div>
<div id="checkout-order" class="section"></div>
<div id="job" class="section"></div>
<div id="jobs" class="section"></div>
</div></div>


 
<script id="header-template" type="text/x-handlebars-template">
<div class="container">
	<div class="section">
	<!--   Icon Section   flash_on -->
		<div class="row">
			<div class="col s12 ">
				<div class="icon-block">
					<h2 class="center light-blue-text"><i class="material-icons">{{icon}}</i></h2>
					<h5 class="center">{{title}}</h5>
					<p class="light center">{{subheader}}</p>
				</div>
			</div>
		</div>
	</div>
</div>

</script>

<script id="orders-template" type="text/x-handlebars-template">
<nav>
	<div class="nav-wrapper  orange darken-4">
    	<div class="col s12">
        	<a  class="breadcrumb">Ordenes</a>
	    </div>
    </div>
</nav>
<div class="row   white-text">
	<div class="input-field white-text col s12">
		<i class="material-icons prefix">search_circle</i>
		<input id="search-orders" type="text" class="">
		<label class="white-text" id="" for="search-orders">Buscar</label>
	</div>
</div>
<ul class="collection black">  
	{{#each collection}}
	<li data-title="{{toLowerCase name}}" data-id="{{ordersId}}" class="collection-item avatar black"> <i class="material-icons circle orange">folder</i> {{#if badge}}<span class="badge">{{badge}}</span>{{/if}} {{name}}</li>
	{{/each}}
</ul>
</script>



<script id="order-template" type="text/x-handlebars-template">
<nav>
	<div class="nav-wrapper orange darken-4">
      <div class="col s12">
        <a href="#orders" class="breadcrumb">Ordenes</a>
		<a href="#!" class="breadcrumb">{{name}}</a>
      </div>
    </div>
</nav>
<div class="row" style="padding-top:5px">				
		<a id="" class="btn back"><i class="material-icons left">chevron_left</i> Atrás</a>
	    <a id="" class="btn continue"><i class="material-icons right">chevron_right</i> Continuar</a>				   	
</div>
<div class="row   white-text">
	<div class="input-field white-text col s12">
		<i class="material-icons prefix">search_circle</i>
		<input id="search-products" type="text" class="">
		<label class="white-text" id="" for="search-products">Buscar</label>
	</div>
</div>
<ul class="collection black">  
  	{{#each content}}
	  <li class="collection-item" data-cod="{{cod}}" data-title="{{title}}" data-done="{{done}}" data-to-do="{{to_do}}">{{cod}}<br> {{title}}<div class="right" style="right:15px">{{done}}/{{to_do}}</div></li>
	{{/each}}
</ul>
<div class="row" style="padding-top:5px">				
		<a id="" class="btn back"><i class="material-icons left">chevron_left</i> Atrás</a>
	    <a id="" class="btn continue"><i class="material-icons right">chevron_right</i> Continuar</a>				   	
</div>
</script>

<script id="jobs-template" type="text/x-handlebars-template">
<nav>
	<div class="nav-wrapper orange darken-4">
		<div class="col s12">
			<a href="#orders" class="breadcrumb">Ordenes</a>
			<a href="#!" class="breadcrumb">{{order.name}}</a>
			<a href="#!" class="breadcrumb">Máquinas</a>
		</div>
	</div>
</nav>

<div class="row" style="padding-top:5px">
	<a id="back" class="waves-effect waves-light btn"><i class="material-icons left">chevron_left</i> Atrás </a>

	<a id="qr-button" class="waves-effect waves-light btn icon"><i class="material-icons left">monochrome_photos</i> QR</a>     
</div>     
<div class="row">
	<div class="input-field col s12">
		<i class="material-icons prefix">search_circle</i>
		<input id="search-jobs" type="text" class="">
		<label for="search-jobs">Buscar</label>
	</div>
</div>  
<ul class="collection">  
	{{#each collection}}
	<li class="collection-item avatar black" data-title="{{toLowerCase name}}" jobsId="{{jobsId}}">
		<i class="material-icons circle orange light">alarm</i>
		<div class="title">{{name}}<br>		
			<div class="time js-time-passed "><span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span></div>		</div>	
			<div class="right">
				<a class="js-play-job " href="#"><i class=" material-icons medium">play_circle_outline</i></a>
	<!--     	<a class="js-play-job " href="#"><i class=" material-icons medium">pause_circle_outline</i></a> -->
				<a class="js-close-job  hidden" href="#"><i class="material-icons medium ">stop</i></a>
			</div>
		</div>
	</li>  	
	{{/each}}
</ul>
</script>
 <!--  Scripts-->
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="public/vendor/materialize/js/materialize.js"></script>
  <script>
 /*
 (function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery);
*/ // end of jQuery name space
	var CONFIG = {
		clientsId: <?= $_SESSION['user']['clientsId'] ?>,
		usersId: <?= $_SESSION['user']['usersId'] ?>
	};
</script>

<script src="public/vendor/qcode-decoder.min.js"></script>


	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="public/vendor/ie10-viewport-bug-workaround.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/ca.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/nosleep/0.6.0/NoSleep.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.12/handlebars.min.js"></script>
    <script src="public/vendor/backbone.min.js"></script>
	<!-- jQuery CDN-->
	<!-- <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> -->

	<!-- Bootstrap 3.3.2 js CDN -->
	<!-- <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script> -->

	<!-- Some Php Variables to JS -->
	<script type="text/javascript">
		var BASE_URL = '<?= $base_url ?>';
		var LANG = '<?= $_SESSION['lang'] ?>';
		
		<?= $HOOK_JS ?>
		
	</script>
	
	<!-- Custom Js -->
	<script type="text/javascript" src="public/application.js"></script>