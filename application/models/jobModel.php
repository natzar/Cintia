<?



class jobModel extends ModelBase
{
		public function getAll(){

			$client_id = $_SESSION['user']['clientsId'];

			$consulta = $this->db->prepare("SELECT * FROM jobs where clientsId = :client_id order by name ASC");
			$consulta->bindParam(":client_id",$client_id);
			$consulta->execute();
			return $consulta->fetchAll();			
		}
	
		
		
		
}
