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
		function showTime(){
		    var date = new Date();
		    var h = date.getHours(); // 0 - 23
		    var m = date.getMinutes(); // 0 - 59
		    var s = date.getSeconds(); // 0 - 59
		    var session = "AM";
		    
		    if(h == 0){
		        h = 12;
		    }
		    
		    if(h > 12){
		        h = h - 12;
		        session = "PM";
		    }
		    
		    h = (h < 10) ? "0" + h : h;
		    m = (m < 10) ? "0" + m : m;
		    s = (s < 10) ? "0" + s : s;
		    
		    var time = h + ":" + m + ":" + s + " " + session;
		    document.getElementById("clock").innerText = time;
		    document.getElementById("clock").textContent = time;
		    
		    setTimeout(showTime, 1000);
		    
		}
		showTime();
	</script>
	
	<!-- Custom Js -->
	<script type="text/javascript" src="public/application.js"></script>

  </body>
</html>