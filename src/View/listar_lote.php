<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php';
?>

<!DOCTYPE html>
<html>

<head>
	<?php include_once PATH_URL . '/Template/_includes/_head.php' ?>

	<meta name="description" content="Static &amp; Dynamic Tables" />

</head>

<body class="skin-1">
	<?php include_once PATH_URL . '/Template/_includes/_topo.php' ?>
	<!-- topo-->


	<!--inicio do conteudo principal-->
	<div class="main-container ace-save-state" id="main-container">
		<script type="text/javascript">
			try {
				ace.settings.loadState('main-container')
			} catch (e) {}
		</script>

		<?php include_once PATH_URL . '/Template/_includes/_menu.php' ?>

		<div class="main-content">
			<div class="main-content-inner">
				<div class="breadcrumbs ace-save-state" id="breadcrumbs">
					<ul class="breadcrumb">
						<li>
							<i class="ace-icon fa fa-home home-icon"></i>
							<a href="#">Home</a>
						</li>

						<li class="active">Lotes</li>
					</ul><!-- /.breadcrumb -->
				</div>
				<!-- conteudo da pagina -->
				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->

							<div class="row">
								<div class="col-xs-12">
									<h4 class="pink">
										<a href="#lote" role="button" class="btn btn-success" data-toggle="modal"><i class="ace-icon fa fa-plus white"></i>Novo</a>
										
									</h4>
									<div class="table-header">
										Lotes criados

										<div style="display:inline-flex" id="dynamic-table_filter">
											<input type="search" id="search_lote" onkeyup="FiltrarLote(this.value)" class="form-control input-sm" placeholder="buscar por numero de lote" aria-controls="dynamic-table">
										</div>
										<label style="margin-left:10px">
											<input name="form-field-radio" id="CheckTodos" onclick="FiltrarLote($('#dynamic-table_filter input').val(), 'T');" type="radio" class="ace" checked value="todos">
											<span class="lbl"> Todos</span>
										</label>
										<label style="margin-left:10px">
											<input name="form-field-radio" id="CheckAtivos" onclick="FiltrarLote($('#dynamic-table_filter input').val(), 'A');" type="radio" class="ace">
											<span class="lbl"> Ativos</span>
										</label>
										<label style="margin-left:10px">
											<input name="form-field-radio" id="CheckInativos" onclick="FiltrarLote($('#dynamic-table_filter input').val(), 'N');" type="radio" class="ace">
											<span class="lbl"> Inativos</span>
										</label>
										<label style="margin-left:10px">
											<input name="form-field-radio" id="CheckEncerrados" onclick="FiltrarLote($('#dynamic-table_filter input').val(), 'E');" type="radio" class="ace">
											<span class="lbl"> Encerrados</span>
										</label>
									</div>
									<div id="dynamic-tables_lotes">
										<table id="dynamic-table-lote" class="table table-striped table-bordered table-hover">

										</table>
									</div>

									<?php
									
									include_once 'modal/_dadosLote.php';
									

									
									?>

									<form action="chamados.php" id="form_import_equip" method="post">
										<?php include_once 'modal/_lote.php';?>

									</form>
								</div>
							</div>
						</div><!-- /.col -->
					</div><!-- /.row -->
				</div><!-- /.final do conteudo da pagina -->
				<center>
					<div id="loading-spinner" class="fullscreen-spinner">
						<div class="spinner"></div>
					</div>
				</center>
			</div>
		</div><!-- /.main-content -->
	
		<?php include_once PATH_URL . './Template/_includes/_footer.php' ?>
	</div><!-- /.final do conteudo Princial -->

	<?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>
	<script>
		document.addEventListener("DOMContentLoaded", function() {
			// Mostra o spinner quando a página é carregada
			load();

			// Aqui, você pode adicionar qualquer código de inicialização da página, se necessário.

			// Após a conclusão do carregamento inicial da página (por exemplo, quando todos os recursos são carregados), oculte o spinner.
			window.addEventListener("load", function() {
				RemoverLoad();
			});
		});
	</script>
	<script src="../Resource/js/mensagem.js"></script>
	<script src="../Resource/ajax/tecnico-ajx.js"></script>
	<script>
		Verify();
		FiltrarLote("",'T');
		CarregarEquipamento();
		CarregarProdutosOS(3);
		ListarProdutos();
		ListarServicos();
		

	$(document).on("click", ".insert-insumos", function (e) {
    e.preventDefault();
    console.log("Botão insert-insumos clicado!");
    var idLote = $(this).data("id-lote");
    var dtCriacao = $(this).data("dt-criacao");
    console.log("ID do Lote:", idLote);
    console.log("Data de Criação:", dtCriacao);
    $("#lote_id").html(idLote);
    // Redirecione para a página de edição de lote com o ID do lote e a data de criação como parâmetros
    window.location.href = "editar_lote.php?id=" + idLote + "&dtCriacao=" + dtCriacao;
});



	</script>

</body>


</html>