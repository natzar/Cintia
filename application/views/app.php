
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
  <div id="qrscanner" class="section"><video id="qr-preview"></video></div>
  <div id="orders" class="section"></div>
<div id="order" class="section"></div>
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
    

<div class="nav-wrapper  deep-orange darken-4">
      <div class="col s12">
        <a href="#!" class="breadcrumb">Ordenes</a>
        <!--
<a href="#!" class="breadcrumb">Second</a>
        <a href="#!" class="breadcrumb">Third</a>
-->
      </div>
    </div>
  </nav>
   <div class="row  orange darken-4 white-text">
        <div class="input-field white-text col s12">
          <i class="material-icons prefix">search_circle</i>
          <input id="icon_prefix" type="text" class="validate">
          <label class="white-text" for="icon_prefix">Buscar</label>
        </div>
        </div>
<ul class="collection black">  {{#each collection}}
  <li class="collection-item avatar "> <i class="material-icons circle">folder</i> <a id="{{ordersId}}" class="collection-item" href="{{href}}">{{#if badge}}<span class="badge">{{badge}}</span>{{/if}} {{name}}</a></li>
{{/each}}
</ul>
</script>


<script id="collection-template" type="text/x-handlebars-template">
<ul>  {{#each collection}}
  <li><a id="{{jobsId}}" class="collection-item" href="{{href}}">{{#if badge}}<span class="badge">{{badge}}</span>{{/if}} {{name}}</a></li>
{{/each}}
</ul>
</script>

<script id="job-template" type="text/x-handlebars-template">
  
<div class="container">
	<div class="section">
	<!--   Icon Section   flash_on -->
		<div class="row">
			<div class="col s12 ">
				<div class="icon-block">
					<!--<h2 class="center light-blue-text"><i class="material-icons large">alarm</i></h2>-->
					<h5 class="center">{{name}}</h5>
					<p id="message" class="light center"></p>

				</div>
			</div>
			<div class="col s12 center centered">
				
				<div class="progress hidden">
      				<div class="indeterminate"></div>
  				</div>
  				<div class="js-time-passed"></div>
				
				<a class="js-play-job" href="#"><i class=" material-icons large huge massive">play_circle_outline</i></a>
				<a class="js-close-job hidden" href="#"><i class="material-icons large ">stop</i></a>

				
			</div>
		</div>
	</div>
</div>
  


</script>


<script id="order-template" type="text/x-handlebars-template">
  <nav>
<div class="nav-wrapper deep-orange darken-4">
      <div class="col s12">
        <a href="#orders" class="breadcrumb">Ordenes</a>

<a href="#!" class="breadcrumb">{{name}}</a>
      </div>
    </div>
      </nav>
      			<ul>  {{#each collection}}
  <li><a  class="collection-item" href="#">{{#if badge}}<span class="badge">Uds: {{badge}}</span>{{/if}} {{name}}</a></li>
{{/each}}
</ul>
<div class="container">
	<div class="section">
	<!--   Icon Section   flash_on -->
		<div class="row">

			<div class="col s12 center centered">
			
			
			



				<div>
				
				 <a id="back" class="btn-large"><i class="material-icons right">arrow_left</i> Atrás</a>

				    <a id="continue" class="btn-large"><i class="material-icons right">send</i> Continuar</a>
				   
				    
				</div>

			</div>
		</div>
	</div>
	
	
</div>
 



</script>

<script id="jobs-template" type="text/x-handlebars-template">
 <nav>
<div class="nav-wrapper deep-orange darken-4">
      <div class="col s12">
        <a href="#orders" class="breadcrumb">Ordenes</a>

        <a href="#!" class="breadcrumb">{{order.name}}</a>
        <a href="#!" class="breadcrumb">Máquinas</a>
      </div>
    </div>
      </nav>
      

    <div class="row">


<a class="waves-effect waves-light btn">Atrás <i class="material-icons right">cloud</i></a>

        <a id="qr-button" class="waves-effect waves-light btn">QR</a>                <a class="waves-effect waves-light btn">Finalizar orden <i class="material-icons right">cloud</i></a>



    </div>

  
     
<div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">search_circle</i>
          <input id="icon_prefix" type="text" class="validate">
          <label for="icon_prefix">Buscar</label>
        </div>
        </div>  
<ul class="collection">  {{#each collection}}
  <li class="collection-item avatar">
   <i class="material-icons circle">folder</i>
      <span class="title">Title</span>
      {{#if badge}}<p>{{badge}}    </p>{{/if}}
      
  <a id="{{jobsId}}" class="collection-item" href="{{href}}"> {{name}}</a></li>
{{/each}}
</ul>
</script>
 <!--  Scripts-->
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="public/vendor/materialize/js/materialize.js"></script>
  <script>
  (function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

</script>
<script type="text/javascript" src="/public/vendor/instascan.min.js"></script>

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