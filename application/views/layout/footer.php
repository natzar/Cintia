	<? include "footer-content.php";?>
	
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


	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="public/vendor/ie10-viewport-bug-workaround.js"></script>
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

  </body>
</html>