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

						<li class="active">Configurações</li>
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
										<a href="#novoChamado" role="button" class="btn btn-success" data-toggle="modal"><i class="ace-icon fa fa-plus white"></i>Novo</a>
									</h4>
									<div class="table-header">
										Ordem de serviço Realizada

										<div style="display:inline-flex" id="dynamic-table_filter">
											<input type="search" onkeyup="FiltrarOsNf(this.value)" class="form-control input-sm" placeholder="buscar por nf" aria-controls="dynamic-table">
										</div>
										<label style="margin-left:10px">
											<input name="form-field-radio" id="CheckFuncionario" onclick="FiltrarChamado('4')" type="radio" class="ace" checked>
											<span class="lbl"> Todos</span>
										</label>
										<label style="margin-left:10px">
											<input name="form-field-radio" id="CheckTecnico" onclick="FiltrarChamado('1')" type="radio" class="ace">
											<span class="lbl"> Em aberto</span>
										</label>
										<label style="margin-left:10px">
											<input name="form-field-radio" id="CheckTecnico" onclick="FiltrarChamado('2')" type="radio" class="ace">
											<span class="lbl"> Em atendimento</span>
										</label>
										<label style="margin-left:10px">
											<input name="form-field-radio" id="CheckTecnico" onclick="FiltrarChamado('3')" type="radio" class="ace">
											<span class="lbl"> Encerrados</span>
										</label>
									</div>
									<div id="dynamic-tables">
										<table id="dynamic-table" class="table table-striped table-bordered table-hover">

										</table>
									</div>
									<?php
									include_once 'modal/_confirmar_atendimento.php';
									include_once 'modal/_finalizar_chamado.php';
									
									?>
									<form action="chamados.php" id="form_chamado_lote" method="post">
										<?php include_once 'modal/_ver_mais.php';?>

									</form>
								</div>
							</div>
						</div><!-- /.col -->
					</div><!-- /.row -->
				</div><!-- /.final do conteudo da pagina -->
				<div id="divload">

				</div>
			</div>
		</div><!-- /.main-content -->
		<form id="form_chamado" action="chamados.php" method="post">
				<?php include_once 'modal/_novo_chamado.php' ?>

			</form>
		<?php include_once PATH_URL . './Template/_includes/_footer.php' ?>
	</div><!-- /.final do conteudo Princial -->

	<?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>
	<script src="../Resource/js/mensagem.js"></script>
	<script src="../Resource/ajax/tecnico-ajx.js"></script>
	<script>
		Verify();
		FiltrarChamado();
		CarregarClientes();
		CarregarLote();
		$("#btn-toggle-div").click(function() {
			$("#div-produtos").toggle();
		});
	</script>
	<!-- <script>
		if ($("#verMais").is(":visible")) {
			
		} else {
			ligarRedirecionamento();
		}
	</script> -->
	<script>
	const eventSource = new EventSource('/sse.php');
	eventSource.addEventListener('horario', e=>{
		console.log(e);

		document.getElementById('sse').innerHTML = e.data;
	});
	</script>

</body>


</html>