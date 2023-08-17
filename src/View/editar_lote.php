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
			background-color: #ffcccc;
			/* Cor de fundo vermelha */
		}

		.linha-incompleta {
			background-color: #ffcccc;
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
								<div class="widget-header widget-header-large">
									<h3 class="widget-title grey lighter">
										<i class="ace-icon fa fa-leaf green"></i>
										Equipamentos do Lote
									</h3>

									<div class="widget-toolbar no-border invoice-info">
										<span class="invoice-info-label">Lote:</span>
										<input type="text" id="loteID">
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



								<?php # Dados do equipamento 
								?>


								<div id="dynamic-tables_lotes">
									<table id="dynamic-table-lote" class="table table-striped table-bordered table-hover">
										<!-- Linhas da tabela -->
									</table>

									<!-- Detalhes do equipamento -->
									<tr class="detail-row">
										<td colspan="4">
											<!-- Conteúdo dos detalhes -->
										</td>
									</tr>
								</div>

								<?php
								include_once 'modal/_lote.php';
								include_once 'modal/_dadosLote.php';
								?>

								<div class="col-sm-12" style="margin-top: 1px;">
									
								<ul class="pager">
									<li id="previous-page" class="previous">
										<a class="btn btn-info btn-sm" href="#">&larr; Anterior</a>
									</li>
									<li id="next-page" class="next">
										<a class="btn btn-info btn-sm" href="#">Próxima &rarr;</a>
									</li>
								</ul>
								<ul id="pagination-ul" class="pagination"></ul>
									<span id="current-page">1</span> <!-- Elemento para exibir o número da página atual -->
									<span id="entries-info"></span> <!-- Elemento para exibir a informação de exibição de entradas -->
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
	<script src="../Resource/js/mensagem.js"></script>
	<script src="../Resource/ajax/tecnico-ajx.js"></script>
	<script>
		Verify();
		FiltrarEquipamentoLote();
	</script>
	<!-- <script>
		if ($("#verMais").is(":visible")) {
			
		} else {
			ligarRedirecionamento();
		}
	</script> -->
	<script>
		const eventSource = new EventSource('/sse.php');
		eventSource.addEventListener('horario', e => {
			console.log(e);

			document.getElementById('sse').innerHTML = e.data;
		});
	</script>

</body>


</html>