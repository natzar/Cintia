
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
  
  <div class="ui collection">
  {{#each collection}}
    <a href="{{href}}" class="collection-item">{{#if badge}}<span class="badge">{{badge}}</span>{{/if}} {{name}}</a>
  
  {{/each}}
  </div>
  

</script>
