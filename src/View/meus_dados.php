<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php'; ?>

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

						<li class="active">Meus Dados</li>
					</ul><!-- /.breadcrumb -->
				</div>
				<!-- conteudo da pagina -->


				<div class="page-content">

					<div class="col-md-12">



						<div style="margin-top: 10px;" class="col-xs-12 col-sm-12 widget-container-col ui-sortable" id="widget-container-col-5">
							<div class="widget-box ui-sortable-handle" id="widget-box-5">
								<div class="widget-header">
									<i class="orange ace-icon fa fa-database bigger-110"></i>
									<h5 class="widget-title smaller">Alterar meus dados</h5>

									<div class="widget-toolbar">

									</div>
								</div>

								<div class="widget-body">
									<div class="widget-main padding-6">
										<div class="alert">
											<input type="hidden" id="id_end">
											<form action="meus_dados.php" id="form_meusdados" method="post">

												<div class="row">
													<div class="col-md-12">
														<div class="form-group">
															<label>Nome</label>
															<input class="form-control obg" id="nome" name="nome" placeholder="Digite o aqui....">
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label>Empresa</label>
															<input class="form-control obg" id="empresa" name="empresa" placeholder="Digite o aqui....">
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label>E-mail</label>
															<input class="form-control obg" id="email" name="email" placeholder="Digite o aqui....">
														</div>
													</div>
													<div class="col-md-3">
														<div class="form-group">
															<label>Telefone</label>
															<input class="form-control obg" id="telefone" name="telefone" placeholder="Digite o aqui....">
														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label>Cep</label>
															<input class="form-control obg" id="cep" name="cep" onblur="BuscarCep()" placeholder="Digite o aqui....">
														</div>
													</div>
													<div class="col-md-10">
														<div class="form-group">
															<label>Rua</label>
															<input class="form-control obg" id="rua" name="rua" placeholder="Digite o aqui....">
														</div>
													</div>
													<div class="col-md-5">
														<div class="form-group">
															<label>Bairro</label>
															<input class="form-control obg" id="bairro" name="bairro" placeholder="Digite o aqui....">
														</div>
													</div>
													<div class="col-md-5">
														<div class="form-group">
															<label>Cidade</label>
															<input class="form-control obg" id="cidade" name="cidade" placeholder="Digite o aqui....">
														</div>
													</div>
													<div class="col-md-2">
														<div class="form-group">
															<label>Estado</label>
															<input class="form-control obg" id="estado" name="estado" placeholder="Digite o aqui....">
														</div>
													</div>
													<div class="col-md-12">
														<button class="btn btn-success col-md-12" onclick="return AlterarMeusDados('form_meusdados')">Gravar</button>
													</div>
												</div>
										</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div><!-- /.col -->

			</div><!-- /.row -->
			<!-- /.final do conteudo da pagina -->
			<div id="divload">

			</div>

		</div><!-- /.main-content -->
		<?php include_once PATH_URL . './Template/_includes/_footer.php' ?>
	</div><!-- /.final do conteudo Princial -->


	<?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>
	<script src="../Resource/js/mensagem.js"></script>
	<script src="../Resource/ajax/tecnico-ajx.js"></script>
	<script src="../Resource/ajax/buscar_cep_ajx.js"></script>
	<script>
		Verify();
		CarregarMeusDados();
	</script>





</body>


</html>