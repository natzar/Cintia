<main>
    <center>

      <div class="section"></div>
      <div class="section"></div>

      <div class="container">
        <div id="login-panel" class="z-depth-1 grey lighten-4 row" style="display: inline-block; padding: 32px 48px 30px 48px; border: 1px solid #EEE;">

          <form class="col s12" method="post" action="/es/login/doLogin">
          

            <div class='row'>
              <div class='col s12'>
                <label for='email'>Usuari</label>
                <input class='' type='text' name='email' placeholder="Nom d'usuari" id='email' required />
              </div>             
            </div>

            <div class='row'>
              <div class='col s12'>
                <label for='password'>Password</label>
                <input class='' type='password' name='password' placeholder="Password" id='password' required="required" />                
              </div>
<!--
              <label style='float: right;'>
								<a class='pink-text' href='#!'><b>Forgot Password?</b></a>
							</label>
-->
            </div>

            <br />
            <center>
              <div class='row'>
                <button type='submit' name='btn_login' class='col s12 btn btn-large waves-effect indigo'>Login</button>
              </div>
            </center>
          </form>
        </div>
      </div>

    </center>

    <div class="section"></div>
    <div class="section"></div>
  </main>