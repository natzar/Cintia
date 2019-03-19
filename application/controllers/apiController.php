<?


class apiController extends ControllerBase
{
	public function login(){


	}
	public function order(){
	   
		require "application/models/orderModel.php"; 
		$orders = new orderModel();

		$all = $orders->getAll();
		$result = array();
		foreach ($all as $order){
			
			$order['content'] = json_decode($order['content']);
			$result[] = $order;
		}
		
		echo json_encode($result);
		
	}
	public function orders(){
		// UPDATE Orders.content (json field)
		require "application/models/orderModel.php"; 
		$orders = new orderModel();
		$data = json_decode(file_get_contents('php://input'));
		$orders->updateContent($data);
		echo json_encode($data);
		
	
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