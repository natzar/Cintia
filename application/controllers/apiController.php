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