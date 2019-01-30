<?



class jobModel extends ModelBase
{
		public function getAll(){

			$client_id = $_SESSION['user']['client_id'];

			$consulta = $this->db->prepare("SELECT * FROM jobs where client_id = :client_id order by name DESC");
			$consulta->bindParam(":client_id",$client_id);
			$consulta->execute();
			return $consulta->fetchAll();			
		}
	
		
		
		
}
