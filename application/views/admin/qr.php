<? if (isset($HOOK_TOP)) echo $HOOK_TOP; ?>
<? if (isset($_GET['i']) and $_GET['i'] == 'success'): ?>
	<div class="alert alert-success">
		<a class="close" data-dismiss='alert'>&times;</a>
		<strong>OK</strong> <?= $notification ?>
	</div>	
<? endif; ?>

          <h1 class="page-header">Tasques QR</h1>

<a class="btn btn-success" style="display:inline-block;"  href="javascript:print();"><i class="glyphicon glyphicon-print"></i> Imprimir </a>


<br><br>


<div style="clear:both;">
<? if (count($items) > 0): ?>
    <table class='' data-table="<?= $table ?>" id='tabla_0'  border="0" >
        <tbody>
                           <tr>
            <? $itemsTotal =count($items);
            $table_no_prefix = str_replace($config->get('db_prefix'),"",$table);
                $col = 1;

                for($i=0;$i<$itemsTotal;$i++):   ?>


<td width="20" style="width:20px;">
    <img src="/qrgenerator.php?content=Cintia.jobs.<?= $items[$i][$table_no_prefix.'Id'] ?>"><br><?= ($items[$i][0]) ?></td>


             

                    <? 

                    if ($col % 2 == 0) echo '</tr><tr>';
                    
                    $col++;
                    
?>
            
            <? endfor; ?>
                 </tr>
	   </tbody>
    </table>
    
     <hr>
    <?
    if ($OFFSET > 0): ?>
    	<a  href="?<?= $_SERVER['QUERY_STRING'] ?>&offset=<?= $OFFSET - $PERPAGE ?>"><< Página Anterior</a> |
    <? endif; ?>
    <? if (count($items) == 18 ): ?>
    	<a  href="?<?= $_SERVER['QUERY_STRING'] ?>&offset=<?= $OFFSET + $PERPAGE ?>">Página Siguiente >></a>
    	<? endif; ?>
<br><br>

</div>		
<? else: ?>

    <div style="clear:both;"></div><div class="alert alert-info"> <?= $table_label.' '.NODATA?></div>
    
<? endif; ?>

<? if(!empty($HOOK_FOOTER)) echo $HOOK_FOOTER; ?>
