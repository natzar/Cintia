<?



class activityModel extends ModelBase
{
		public function getAll(){

			$client_id = $_SESSION['user']['clientsId'];

			$consulta = $this->db->prepare("SELECT * FROM activity where client_id = :client_id order by id DESC");
			$consulta->bindParam(":client_id",$client_id);
			$consulta->execute();
			return $consulta->fetchAll();			
		}
	
		
		public function add($params){
			$client_id = $_SESSION['user']['clientsId'];
			$user_id = $_SESSION['user']['usersId'];
			$hash = -1;

			$consulta = $this->db->prepare("
				INSERT INTO activity (clientsId,hash,usersId,jobsId,ordersId,start,end,duration)
				VALUES  (:client_id, :hash, :user_id, :job_id, :order_id, :start, :end, :duration)");

			$consulta->bindParam(":client_id",$client_id);
			$consulta->bindParam(":hash",$hash);
			$consulta->bindParam(":user_id",$user_id);
			$consulta->bindParam(":job_id",$params->jobsId);
			$consulta->bindParam(":order_id",$params->ordersId);
			$consulta->bindParam(":start",$params->start);
			$consulta->bindParam(":end",$params->end);
			$consulta->bindParam(":duration",$params->duration);

			$consulta->execute();
			if ($consulta->rowCount() > 0) return true;
			else return false;
		}
		
}
