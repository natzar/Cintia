<?


class apiController extends ControllerBase
{
	public function login(){


	}
	public function job(){
		

		echo json_encode(array(
			array("id" => 1, "name" => "Encuadernar", "badge" => "OK", "href" => "#"),
			array("id" => 2,"name" => "Enganxar", "badge" => "OK", "href" => "#"),
			array("id" => 3,"name" => "Tallar", "badge" => "OK", "href" => "#"),
		));	

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