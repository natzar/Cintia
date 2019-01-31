
  <nav class="red lighten-1" role="navigation">
    <div class="nav-wrapper container">
      <a id="logo-container" href="#" class="brand-logo">Cintia</a>

      <ul class="right">
        <li><div id="clock"></div></li>        
      </ul>

      <ul id="nav-mobile" class="sidenav">
        
      </ul>
      <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>


    <? if (isset($_SESSION['errors'])): ?>
        <div class="alert"><?= $_SESSION['errors'] ?></div>
    <? endif; ?>