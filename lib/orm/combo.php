<?

final class combo extends field{

	function view(){

		$f_fieldname = str_replace("Id","",$this->fieldname);
		return $this->giveme($f_fieldname,$this->fieldname,$this->value);
	}
	function bake_field (){
		$output ='';
		//$output = "<div id=\"combo_".$this->fieldname."\">";
		if ($this->config->get('combo_add') == 1) $output .= "<a href=\"javascript:show_add_option_box('".$this->fieldname."');\"> <img  src=\"".$this->config->get('base_http')."lib/img/plus.jpg\"></a>&nbsp;&nbsp;";
		// Field name foreign
		$f_fieldname = str_replace("Id","",$this->fieldname);
		$output .= $this->bake_combo($this->config->get('db_prefix').$f_fieldname,$this->fieldname,$this->value);
		//$output .= "</div>";
		// Parte invisible que aparece para anadir una nueva opcion al select
		if ($this->config->get('combo_add') == 1 ) $output .= "<div id=\"div_".$this->fieldname."\" style=\"display:none;\">
						<input class=\"text-input medium-input \" type=\"text\" cols=\"120\" id=\"new_".$this->fieldname."\"> <input class='btn btn-success' type=\"button\" value=\"A&ntilde;adir\" onclick=\"add_new_option_to_combo('".$this->fieldname."');\"> &nbsp;&nbsp; <a href=\"javascript:close_add_option_box('".$this->fieldname."');\"><img src=\"".$this->config->get('base_http')."lib/img/close.jpg\"></a>
						</div>";
        return $output;
	}
		
	function exec_add () {
		return $this->value;
	}
	function exec_edit () {
		return $this->value;	
	}

	function giveme($tabla,$campo,$valor_en_indice){

        
        $consulta = $this->db->prepare("SELECT * from ".$this->config->get('db_prefix').$tabla." where ".$tabla."Id='$valor_en_indice' limit 1" );
        $consulta->execute();
      	$row = $consulta->fetch(PDO::FETCH_NUM);


        if ($tabla == 'clientes'){
            return $row[3];
        }else{

		if (is_string($row[1]) and $row[1] != ''  and substr($row[1],-3) != 'jpg' or (is_int($row[1]) and intval( $row[1] > 1) ) or !isset($row[2])) return $row[1];
		else if (is_string($row[2]) and $row[2] != '' and (is_int($row[2]) and $row[2] > 1)  and substr($row[2],-3) != 'jpg') return $row[2];
		else if (is_string($row[3]) and $row[3] != '' and is_string($row[3]) and substr($row[3],-3) != 'jpg') return $row[3];
		else return  $row[4];
		}


	}
	

function bake_combo($tabla,$select_name,$id_selected){
	    $consulta = $this->db->prepare("SELECT * from $tabla ORDER BY 2 ASC" );
    	$consulta->execute();
        
		$output = "<select class='form-control ' name=\"".$select_name."\" id=\"".$select_name."\" >";
		$output .= "<option value=\"-1\">---</option>";
	
		
	while ($row = $consulta->fetch(PDO::FETCH_NUM)){
		$output .= "<option value=\"".$row[0]."\"";
		if ($row[0] == $id_selected) $output .= " selected";
		$output .=">";

		if (is_string($row[1]) and $row[1] != '' and $row[1] != '0' and intval($row[1]) == 0 and substr($row[1],-3) != 'jpg' or !isset($row[2])) $output .= $row[1]."</option>";
		else if (is_string($row[2]) and $row[2] != '' and $row[2] != '0' and intval($row[2]) == 0 and substr($row[2],-3) != 'jpg') $output .= $row[2]."</option>";
		else if (is_string($row[3]) and $row[3] != '' and $row[3] != '0' and intval($row[3]) == 0 and substr($row[3],-3) != 'jpg') $output .= $row[3]."</option>";
		else $output .= $row[4]."</option>";
	}
	$output .='<option value="">Sin especificar</option>';
	$output .= "</select>";

	return $output;
}




}

