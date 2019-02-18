<?
class homeController extends ControllerBase{
	function index(){


		$_SESSION['return_url'] = "/es/home";
		$data = array();
		if (file_exists($this->config->get('viewsFolder').'index.php')){
			$this->view->show('index.php',$data);		
        }	
	}
}
