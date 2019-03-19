<?



class orderModel extends ModelBase
{
		public function getAll(){

					$client_id = $_SESSION['user']['clientsId'];

			$consulta = $this->db->prepare("SELECT * FROM orders where clientsId = :client_id order by name ASC");
			$consulta->bindParam(":client_id",$client_id);
			$consulta->execute();
			return $consulta->fetchAll();			
		}
		
		public function updateContent($order){
			
			$c = $this->db->prepare('UPDATE orders SET content = :c where ordersId=:id');
			$content = json_encode($order->content);
			$c->bindParam(":c",$content);
			$c->bindParam(":id",$order->ordersId);
			$c->execute();
			
		
		}
}
