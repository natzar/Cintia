<?

class appController extends ControllerBase
{
	public function index(){
		if (!isset($_SESSION['user']) or empty($_SESSION['user'])){
			header("location: /");
		}
        $this->view->show('app.php',array());
    }
}
?>