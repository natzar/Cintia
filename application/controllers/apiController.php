<?


class apiController extends ControllerBase
{
	public function login(){


	}
	public function order(){
	   
		require "application/models/orderModel.php"; 
		$orders = new orderModel();


		echo json_encode($orders->getAll());
		
	}
	
	public function job(){
		
		require "application/models/jobModel.php"; 
		$jobs = new jobModel();


		echo json_encode($jobs->getAll());	

	}
	public function activity(){
		require "application/models/activityModel.php"; 
		$data = json_decode(file_get_contents('php://input'));
		
		$activity = new activityModel();
		$activity->add($data);
		$data->success = true;
		echo json_encode($data);

	}
	public function tags(){
		echo json_encode(array(

		));
	}
	
	public function entry(){
		//POST
	}
    
    public function settings(){
   		echo json_encode(array(

		));
    }
		
   		
}