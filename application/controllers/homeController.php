<?
class homeController extends ControllerBase{
	function index(){
        $_SESSION['user']['client_id'] = 1;
		$_SESSION['user']['id'] = 3;
		$data = array();
		if (file_exists($this->config->get('viewsFolder').'index.php')){
			$this->view->show('index.php',$data);		
        }	
	}
}
