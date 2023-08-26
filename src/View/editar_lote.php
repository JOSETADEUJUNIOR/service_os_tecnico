<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

if (isset($_GET['id'])) {
	$loteID = $_GET['id'];
	$dataCriacao = $_GET['dtCriacao'];
} ?>

<!DOCTYPE html>
<html>

<head>
	<?php include_once PATH_URL . '/Template/_includes/_head.php' ?>

	<meta name="description" content="Static &amp; Dynamic Tables" />

	<style>
		tr.campo-vazio {
			background-color: red;
			/* Cor de fundo vermelha */
		}

		.linha-incompleta {
			background-color: #abd589db;
			/* Cor de fundo vermelha */
		}

		#tabela-produtos-lista tbody tr {
			height: 10px;
			/* Altura desejada para as linhas */
		}

		/* Estilo para diminuir a altura das células da tabela */
		#tabela-produtos-lista td {
			padding: 5px 8px;
			/* Espaçamento interno das células */
			font-size: 12px;
			/* Tamanho da fonte das células */
		}
		h3 {
			font-size: 17px;
		}
		body{
			font-size: 12px;
		}
	</style>

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
							<a href="index.php">Home</a>
						</li>

						<li class="active">Edição de equipamento</li>
					</ul><!-- /.breadcrumb -->
				</div>
				<!-- conteudo da pagina -->
				<div class="page-content">

					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->
							<div class="row">
								<div class="widget-header widget-header-large">
									<h3 class="widget-title grey lighter">
										<i class="ace-icon fa fa-leaf green"></i>
										Equipamentos do Lote
									</h3>

									<div class="widget-toolbar no-border invoice-info">
										<span class="invoice-info-label">Lote:</span>
										<input type="hidden" id="loteID">
										<span id="lote_id_label" class="red"><?= $loteID ?></span>

										<br />
										<span class="invoice-info-label">Date:</span>
										<span id="data_criacao_label" class="blue"><?= $dataCriacao ?></span>
									</div>

									<div class="widget-toolbar hidden-480">
										<a href="#">
											<i class="ace-icon fa fa-print"></i>
										</a>
									</div>
								</div>

								<div id="dynamic-table-container"></div>

								<?php
								include_once 'modal/_lote.php';
								include_once 'modal/_dadosLote.php';
								?>

								<div class="col-sm-12" style="margin-top: 1px;">
								
								
								
								</div><!-- /.span -->
								<div class="col-xs-12 col-sm-12">
									<button class="btn btn-success btn-sm col-xs-12 col-sm-6" onclick="return EncerrarLote()"> Encerrar lote</button>
									<a href="listar_lote.php" class="btn btn-warning btn-sm col-xs-12 col-sm-6"> Voltar</a>
								</div><!-- /.span -->

							</div>


						</div>
					</div><!-- /.col -->
				</div><!-- /.row -->


			</div><!-- /.final do conteudo da pagina -->



		</div><!-- /.main-content -->

		<?php include_once PATH_URL . './Template/_includes/_footer.php' ?>
	</div><!-- /.final do conteudo Princial -->

	<?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>
		<!-- page specific plugin scripts -->
		<script src="assets/js/jquery.dataTables.min.js"></script>
		<script src="assets/js/jquery.dataTables.bootstrap.min.js"></script>
		<script src="assets/js/dataTables.buttons.min.js"></script>
		<script src="assets/js/buttons.flash.min.js"></script>
		<script src="assets/js/buttons.html5.min.js"></script>
		<script src="assets/js/buttons.print.min.js"></script>
		<script src="assets/js/buttons.colVis.min.js"></script>
		<script src="assets/js/dataTables.select.min.js"></script>

	<script src="../Resource/js/mensagem.js"></script>
	<script src="../Resource/ajax/tecnico-ajx.js"></script>
	<script>
		Verify();
		FiltrarEquipamentoLote();
		
	</script>
	

</body>


</html>