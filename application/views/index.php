
<div id="app"></div>

 
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

<script id="collection-template" type="text/x-handlebars-template">
  {{#each collection}}
  <li><a id="{{id}}" class="collection-item" href="{{href}}">{{#if badge}}<span class="badge">{{badge}}</span>{{/if}} {{name}}</a></li>
{{/each}}
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
