<?


function cleanData(&$str)
  {
    // escape tab characters
    $str = preg_replace("/\t/", "\\t", $str);

    // escape new lines
    $str = preg_replace("/\r?\n/", "\\n", $str);

    // convert 't' and 'f' to boolean values
    if($str == 't') $str = 'TRUE';
    if($str == 'f') $str = 'FALSE';

    // force certain number/date formats to be imported as strings
    if(preg_match("/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/", $str)) {
//      $str = "$str";

    }

    // escape fields that include double quotes
    if(strstr($str, '"')) $str = '"' . str_replace('"', '""', $str) . '"';
  }

 class adminController extends ControllerBase{

	/* 	Admin Login
	---------------------------------------*/
	public function __construct(){
		parent::__construct();
	 	$this->view->setPath('application/views/admin/');
	 	$_SESSION['lang'] = $this->config->get('default_lang');			
	 	$fingerprint = md5($_SERVER['HTTP_USER_AGENT'].$this->config->get('base_title'));
    	if (!isset($_SESSION['user']['clientsId']) or !isset($_SESSION['HTTP_USER_AGENT']) or  $_SESSION['HTTP_USER_AGENT'] != $fingerprint ){
			if (get_param('email') != -1)
				$this->do_login();
			else $this->login();
			die();
		}
	}
	public function index(){
		if (!is_file($this->config->get('path')."/application/views/admin/layout/menu.php")){
			require 'application/models/installModel.php';
			$installModel = new installModel();
			$installModel->makeDefaultMenu();
		}
		$this->dashboard();
	}
	public function login(){
        $_SESSION['return_url'] = '/admin/login';
		$this->view->show("login.php", array(),false);
    }
	 
	public function do_login()
	{
    	require 'application/models/loginModel.php';
    	$loginModel = new loginModel();	
    	$loginModel->login(get_param('email'),get_param('pass'),true);
	}
 
	public function logout()
	{
		require 'application/models/loginModel.php';
    	$loginModel = new loginModel();
    	$loginModel->logout();
	}
	
	/* 	Showing data
	---------------------------------------*/
	
	public function dashboard(){
		include "application/models/showModel.php";
		$show = new showModel();
		

		$data = array(
			"HOOK_JS" => ''
		);
		$this->view->show("dashboard.php",$data);
	
	}
	
	 public function table(){
	   
    	$config = Config::singleton();
	    require $config->get('modelsFolder').'showModel.php';
		$items = new showModel();
     	$table = get_param('a') != -1 ? get_param('a') : $config->get('tabla_default');
		$_SESSION['return_url'] =  $_SERVER['REQUEST_URI'] ;
		$data = Array(/* "table_label" => $table_label, */
		          "title" => "BackOffice | $table",
		          "items_head" => $items->getItemsHead($table),
		          "items" => $items->getAll($table),
		          "HOOK_JS" => $items->js($table),
                  "table" => $table,
					"table_label" =>$items->getTableAttribute($table,'table_label'),
					"notification" => get_param('i') != -1 ? 'Se ha guardado correctamente' : ''
		      		          
		        	  );

		 $this->view->show("show.php", $data);	
    }
    
    
    public function grid(){
    	$config = Config::singleton();
	    require $config->get('modelsFolder').'showModel.php';
		$items = new showModel();
     	$table = get_param('a') != -1 ? get_param('a') : $config->get('tabla_default');
		$_SESSION['return_url'] =  $_SERVER['REQUEST_URI'] ;
		$data = Array(/* "table_label" => $table_label, */
		          "title" => "BackOffice | $table",
		          "items_head" => $items->getItemsHead($table),
		          "items" => $items->getAll($table),
		          "HOOK_JS" => $items->js($table),
                  "table" => $table,
					"table_label" =>$items->getTableAttribute($table,'table_label'),
					"notification" => get_param('i') != -1 ? 'Se ha guardado correctamente' : ''
		      		          
		          );
		
		 $this->view->show("grid.php", $data);	
    }
    
    
    
    public function searchResults(){
	
		$params = gett();
        include "application/models/showModel.php";
        $items = new showModel();
		$table = $params['table'];		
		$config = Config::singleton();
	    
     //	$_SESSION['return_url'] =  $_SERVER['REQUEST_URI'] ;
		
		$data = Array(/* "table_label" => $table_label, */
		          "title" => "BackOffice | $table",
		          "items_head" => $items->getItemsHead($table),
		          "items" => 		$items->search($params),
		          "HOOK_JS" => $items->js($table),
                  "table" => $table,
					"table_label" =>$items->getTableAttribute($table,'table_label'),
					"notification" => "Resultados de búsqueda"
		      		          
		          );
		          
		
				 $this->view->show("show.php", $data);
	}
	 public function detail(){
    	$config = Config::singleton();
	    require 'application/models/showModel.php';
		$items = new showModel();
     	$table = get_param('a');
     	$tableForeignId=get_param('i');		
		$_SESSION['return_url'] =  $_SERVER['REQUEST_URI'] ;
		$data = Array(/* "table_label" => $table_label, */
		          "title" => "BackOffice | $table",
		          "items_head" => $items->getItemsHead($table),
		          "items" => $items->getAllByField($table,'coursestypesId',$coursestypesId),
		          "HOOK_JS" => $items->js($table),
                  "table" => $table, 
					"table_label" => "Courses: ". $titles[$coursestypesId], //$items->getTableAttribute($table,'table_label'),
					"notification" => get_param('i') != -1 ? 'Se ha guardado correctamente' : ''
		      		          
		          );

		
		$this->view->show("show-detail.php", $data);
		
		
    }
    
    public function export(){
    
    	$config = Config::singleton();
	    require $config->get('modelsFolder').'showModel.php';
		$items = new showModel();
      	$table = get_param('a') != -1 ? get_param('a') : $config->get('tabla_default');

$data = $items->getAll($table);

  // filename for download
  $filename = "website_data_" . date('Ymd') . ".xls";

  header("Content-Disposition: attachment; filename=\"$filename\"");
  header("Content-Type: application/vnd.ms-excel");

  $flag = false;

$data = $items->getAll($table);

 echo implode("\t",  $items->getItemsHead($table)) . "\r\n";        
   
    
foreach($data as $row) {
$row = array_splice($row,1,6);

    array_walk($row, __NAMESPACE__ . '\cleanData');
    echo implode("\t", array_values($row)) . "\r\n";
  }
  exit;
  
  
  
  
  
  
  
    
    
    
    }
    
    	
	/* Forms creation and Rows Inserting and updating
	---------------------------------------*/
	
	function form(){

    	require 'application/models/formModel.php'; 	
   		$form = new formModel();
        $table = get_param('a');
        $rid = get_param('i');
        $op = get_param('m');
        require "setup/".$table.".php";
        if ($rid == '') $rid =-1;    			
        $form_html = "";
        $raw = ($rid != -1) ? $form->getFormValues($table,$rid) : '';
				//print_r($raw);
				

                      
                      	
    	for ($i=0;$i< count($fields);$i++){
    			if ($fields[$i] != $table.'Id'){	
    					$form_html.= "<div class='form-group'><label class='form-label'>";
    					$form_html .= ucfirst($fields_labels[$i]);
    					$form_html .= "</label>";
    					// added to provide hints about the field
    					if (isset($field_hints)  and $field_hints[$i] != ''){
	    					$form_html .="<span class=\"help\">e.g. \"".$field_hints[$i]."\"</span>";    					
    					}
    					$form_html .="<div class='controls'>";		
    					if (!class_exists($fields_types[$i])) die ("La clase ".$fields_types[$i]." no existe");
    					$VALUE = isset($raw[$fields[$i]]) ? $raw[$fields[$i]] : '';
    					$field_aux = new $fields_types[$i]($fields[$i],$fields_labels[$i],$fields_types[$i],$VALUE,$table,$rid);
    					$form_html .= $field_aux->bake_field();								
    					$form_html .= "</div></div>";
    			}		
    	}
		
		$data = Array(/* "table_label" => $table_label, */
		          "title" => "BackOffice | $table",
		          "form" => $form_html,
		          "HOOK_JS" => $form->js($table),
		      	  "table" => $table,
		      	  "op" => '',
		      	  "rid" => $rid,
		      	  "table_label" => $table_label
		          
		          );
		          
		$this->view->show("form.php", $data);
    }


 	public function update(){

 	        require 'application/models/formModel.php';
        	$form = new formModel();
        	$rid = get_param('rid');
        	$table = get_param('table');
      		if ($rid == -1) $form->add($table);
			else $form->edit($table,$rid);

        
			header("location: ".$_SESSION['return_url']);

 	} 
 	
 	function import(){
 		require 'application/models/formModel.php'; 	

        $table = get_param('a');
        $rid = get_param('i');
        $op = get_param('m');
        require "setup/".$table.".php";
 	$form_html = '<textarea width="100%" rows="10" name="import_content"></textarea><br><small>Registros separados por líneas</small>';
 	$data = Array(/* "table_label" => $table_label, */
		          "title" => "BackOffice | $table",
		          "form" => $form_html,
		      	  "table" => $table,
		      	  "HOOK_JS" => '',
		      	  "op" => '',
		      	  "rid" => $rid,
		      	  "table_label" => $table_label
		          
		          );
		          
		$this->view->show("import.php", $data);
 	
 	}
 	
 	function do_import(){
 		
 		$con = get_param('import_content');
 	  	require 'application/models/formModel.php';
        	$form = new formModel();
        	$rid = get_param('rid');
        	$table = get_param('table');
        	
        	$form->import($table,$con);
        	
        	$data = Array(
		          "title" => "BackOffice | $table",
		          
		      	  "table" => $table,
		      	  "HOOK_JS" => '',
		      	  "op" => '',
		      	  "form" => "Importado correctamente",
		      	  "rid" => $rid,
		      	  "table_label" => 'Importar '.$table
		          
		          );
		          

        	$this->view->show("import.php", $data);
        	
 	}
 	
 	function search(){

    	require 'application/models/formModel.php'; 	
   		$form = new formModel();
        $table = get_param('a');
        $rid = get_param('i');
        $op = get_param('m');
        require "setup/".$table.".php";
        if ($rid == '') $rid =-1;    			
        $form_html = "";
        		
		
    	for ($i=0;$i< count($fields);$i++){
    			if ($fields[$i] != $table.'Id' and strstr($fields_types[$i],"combo") or $fields_types[$i] == 'literal' or $fields_types[$i] == 'text'){	
    					$form_html.= "<div class='control-group'><label class='control-label'>";
    					$form_html .= ucfirst($fields_labels[$i]);
    					$form_html .= "</label><div class='controls'>";		
    					if (!class_exists($fields_types[$i])) die ("La clase ".$fields_types[$i]." no existe");
    					$VALUE =  '';
    					$field_aux = new $fields_types[$i]($fields[$i],$fields_labels[$i],$fields_types[$i],$VALUE,$table,$rid);
    					$form_html .= $field_aux->bake_field();								
    					$form_html .= "</div></div>";
    			}		
    	}
		
		$data = Array(/* "table_label" => $table_label, */
		          "title" => "BackOffice | $table",
		          "form" => $form_html,
		          "HOOK_JS" => $form->js($table),
		      	  "table" => $table,
		      	  "op" => '',
		      	  "rid" => $rid,
		      	  "table_label" => $table_label
		          
		          );
		          
		$this->view->show("search-form.php", $data);
    }


    public function addToCombo(){
        $table = get_param('a');
        include "application/models/formModel.php";
        $form = new formModel();
        $form->add($table);
        $lastId = getLastId($table);
      
        include "setup/".$table.".php";
        include "lib/fields/field.php";
        
        $combo = new combo($fields[1],$fields_labels[1],$fields_types[1],$lastId);
        
        $output = "<a href=\"javascript:show_add_option_box('".$fiel."');\"> <img  src=\"".$web->base_http."lib/img/plus.jpg\"></a>&nbsp;&nbsp;";
        $output .= $combo->bake_combo($tabla,$fiel,$raw['id']);
		
        return utf8_encode($output);

    }
	
	public function updateOrder(){
		include "application/models/formModel.php";
        $form = new formModel();
        $form->updateOrder();
	}
	
	public function updateVisible(){
		include "application/models/formModel.php";
        $form = new formModel();
        $form->updateVisible();
	}
	public function updateFeatured(){
		include "application/models/formModel.php";
        $form = new formModel();
        $form->updateFeatured();
	}


	/* Delete Rows and Files
	---------------------------------------*/
	public function deleteFile(){
        require 'application/models/formModel.php';
    	$deleteModel = new formModel();
   	   $table = $_GET['table'];
        $field = $_GET['f'];
        $id = $_GET['rid'];
        
    	$deleteModel->deleteImage($table,$field,$id);
		echo '1';
    }
	 
	public function deleteRow()
	{
		$params = gett();	
        require 'application/models/formModel.php';
    	$deleteModel = new formModel();
	    $table = $params['table'];
    	$id = $params['rid'];
    	$deleteModel->deleteRow($table,$id);
		echo '1';		
	}

	/* Newsletter Sending
	---------------------------------------*/
 	public function newsletter(){
		    
		$this->view->show('newsletter.php',array("HOOK_JS" => ""));

	}
	
	public function sendNewsletter(){
		$ret = '';
		if(isset($_POST['emailSubject']) && isset($_POST['emailBody']) && strlen($_POST['emailSubject'])>1 && strlen($_POST['emailBody'])>1 ){
				include "application/models/newsletterModel.php";
				$newsletter = new newsletterModel();
				$ret = $newsletter->send();		
		}
				$this->view->show('newsletter_ok.php',array("HOOK_JS" => "","content" => $ret));
	
	}
	
	/* Presupuestos
		---------------------------------------*/


	public function tools()
	{
		$params = gett();
        require 'application/models/installModel.php';
    	$tools = new installModel();
	    $table = $params['table'];
    	$id = $params['rid'];

		switch($params['a']):
			case 'makemodels':
				    	$tools->generateModels($table);
			break;
			case 'filldb':
				    	$tools->fillDb(30);			
			break;
			
		endswitch;	

$this->view->show('dashboard.php',array());
	}
	

}