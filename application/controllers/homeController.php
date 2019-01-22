<?
class homeController extends ControllerBase{
	function index(){
        
		$data = array();
		if (file_exists($this->config->get('viewsFolder').'index.php')){
			$this->view->show('index.php',$data);		
        }	
	}
}
