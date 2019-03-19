<? if (isset($HOOK_TOP)) echo $HOOK_TOP; ?>
<? if (isset($_GET['i']) and $_GET['i'] == 'success'): ?>
	<div class="alert alert-success">
		<a class="close" data-dismiss='alert'>&times;</a>
		<strong>OK</strong> <?= $notification ?>
	</div>	
<? endif; ?>

          <h1 class="page-header">Tasques QR</h1>

<a class="btn btn-success" style="display:inline-block;"  href="admin/export/<?= $table ?>"><i class="glyphicon glyphicon-print"></i> Imprimir </a>


<br><br>


<div style="clear:both;">
<? if (count($items) > 0): ?>
    <table class='table table-bordered table-hover table-striped ' data-table="<?= $table ?>" id='tabla_0'  border="0" >
        <tbody>
            <? $itemsTotal =count($items);
            $table_no_prefix = str_replace($config->get('db_prefix'),"",$table);
                for($i=0;$i<$itemsTotal;$i++):   ?>
                   <tr id="recordsArray_<?= $items[$i][$table_no_prefix.'Id']?>">

<td width="20" style="width:20px;">
    <img src="/qrgenerator.php?content=Cintia.jobs.<?= $items[$i][$table_no_prefix.'Id'] ?>"></td>


                <?    $row = $items[$i]; 
                $j = 0;
                		foreach ($row as  $cell): 
                		if ($j > 0):?>

                        <td>  <?= $cell;?></td>

                    <? 
                    endif;
                    $j++;
                    endforeach; ?>
                    <td class="actions" align="center" nowrap>
				<a alt='edit' title='edit' href='admin/form/<?= $table ?>/<?= $items[$i][str_replace($config->get('db_prefix'),"",$table).'Id']?>'><img src='public/admin/img/pen_12x12.png'></a> &nbsp;&nbsp;
				<? if ($table != 'home_modules'): ?>
				<a alt='delete' title='delete' href="javascript: DeleteRegistro('recordsArray_<?= $items[$i][str_replace($config->get('db_prefix'),"",$table).'Id']?>','<?= $items[$i][str_replace($config->get('db_prefix'),"",$table).'Id']?>','','<?= $table ?>');"><img src='public/admin/img/x_11x11.png'></a><? endif; ?></td>
                    </tr>
            
            <? endfor; ?>
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
