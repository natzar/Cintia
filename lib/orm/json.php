<?

final class json extends field{

	function view(){
		return 'Contenido';	
	}
	
	function bake_field (){
		
		$table = json_decode($this->value);
		$html = "";
		if ($this->rid == -1){				
			$html .= "<input type='file' name='".$this->fieldname."' id='".$this->fieldname."'>";		
		}else if (isset($table) and isset($table[0] )){

			$html .= '<table class="table"><thead><tr>';
			
			foreach($table[0] as $k => $v){
				$html .= '<th>'.$k.'</th>';
			}
			$html .= '</tr></thead><tbody>';
			foreach($table as $item){
				$html .='<tr>';
				foreach($item as $k => $v){
				
					$html.='<td>'.$v.'</td>';
				}
				$html .='</tr>';
			}
			$html .= '</tbody></table>';	
			$html .= "<textarea name=\"".$this->fieldname."\" id=\"".$this->fieldname."\" style=\"display:none;\">".$this->value."</textarea>                ";
			
		}
		return $html;
	}
		
	function exec_add () {
		if ($_FILES[$this->fieldname]['name'] != ""){
			
			$filename_new = generar_nombre_archivo($_FILES[$this->fieldname]['name']);
			copy($_FILES[$this->fieldname]['tmp_name'], $this->config->get('data_dir')."file/".$filename_new);
								
			//Had to change this path to point to IOFactory.php.
			//Do not change the contents of the PHPExcel-1.8 folder at all.
			include('lib/vendor/PHPExcel-1.8/Classes/PHPExcel/IOFactory.php');
			
			//Use whatever path to an Excel file you need.
			$inputFileName = $this->config->get('data_dir')."file/".$filename_new;
			
			try {
			$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
			$objReader = PHPExcel_IOFactory::createReader($inputFileType);
			$objPHPExcel = $objReader->load($inputFileName);
			} catch (Exception $e) {
			die('Error loading file "' . pathinfo($inputFileName, PATHINFO_BASENAME) . '": ' . 
			    $e->getMessage());
			}
			
			$sheet = $objPHPExcel->getSheet(0);
			$highestRow = $sheet->getHighestRow();
			$highestColumn = $sheet->getHighestColumn();
			$DATA = array();
			for ($row = 1; $row <= $highestRow; $row++) { 
				$rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, 
			                                null, true, false);			
				//Prints out data in each row.
				//Replace this with whatever you want to do with the data.
				if ($row > 1 and !empty($rowData[0][3])){
					$DATA[] = array(
						"cod" => $rowData[0][0],
						"title" => $rowData[0][1],
						"to_do" => $rowData[0][3],
						"done" => 0
					);

				}
			}

			unlink($inputFileName );		

			
			return json_encode( $DATA);			
		}
		return '{}';
	}
	
	function exec_edit () {
		return $this->value;
	}
}

