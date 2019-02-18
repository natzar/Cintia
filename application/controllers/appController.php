<?

class appController extends ControllerBase
{
	public function index(){
        $this->view->show('app.php',array());
    }
}
?>