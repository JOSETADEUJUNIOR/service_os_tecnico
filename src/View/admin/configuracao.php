<?php

require_once dirname(__DIR__, 2) . '/Resource/dataview/index_dataview.php';
?>
<!DOCTYPE html>
<html>

<head>
	<?php include_once PATH_URL . '/Template/_includes/_head.php' ?>
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


					<div class="page-header">
						<h1>
							Configurações Gerais
							<small>
								<i class="ace-icon fa fa-angle-double-right"></i>
								Configurações do sistema
							</small>
						</h1>
					</div><!-- /.page-header -->

					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->

							<div class="tabbable">
								<ul class="nav nav-tabs padding-18 tab-size-bigger" id="myTab">
									<li class="active">
										<a data-toggle="tab" href="#faq-tab-1">
											<i class="blue ace-icon fa fa-cogs bigger-120"></i>
											Configurações
										</a>
									</li>

									<li>
										<a data-toggle="tab" href="#faq-tab-2">
											<i class="green ace-icon fa fa-info-circle bigger-120"></i>
											Sobre
										</a>
									</li>

									<li>
										<a data-toggle="tab" href="#faq-tab-3">
											<i class="orange ace-icon fa fa-user bigger-120"></i>
											Perfil
										</a>
									</li>


								</ul>

								<div class="tab-content no-border padding-24">
									<div id="faq-tab-1" class="tab-pane fade in active">
										<h4 class="blue">
											<i class="ace-icon fa fa-check bigger-110"></i>
											Assuntos Gerais
										</h4>

										<div class="space-8"></div>



										<div id="faq-list-1" class="panel-group accordion-style1 accordion-style2">
											<form action="" class="form-horizontal" role="form" method="post">
												<div class="form-group">

													<div class="col-sm-12">
														<!-- <label class="control-label" for="form-field-1-1"> Full Length </label> -->
														<input type="text" id="form-field-1-1" placeholder="Titulo do Site" class="form-control" />
													</div>
												</div>
												<div class="form-group">

													<div class="col-sm-12">
														<!-- <label class="control-label" for="form-field-1-1"> Full Length </label> -->
														<input type="text" id="form-field-1-1" placeholder="Descrição do Site" class="form-control" />
													</div>
												</div>
												<div class="form-group">

													<div class="col-sm-12">
														<!-- <label class="control-label" for="form-field-1-1"> Full Length </label> -->
														<input type="text" id="form-field-1-1" placeholder="Key/Words do Site (SEO)" class="form-control" />
													</div>
												</div>
												<div class="form-group">

													<div class="col-sm-12">
														<!-- <label class="control-label" for="form-field-1-1"> Full Length </label> -->
														<input type="text" id="form-field-1-1" placeholder="Domínio" class="form-control" />
													</div>
												</div>
												<div class="form-group">

													<div class="col-sm-12">
														<!-- <label class="control-label" for="form-field-1-1"> Full Length </label> -->
														<input type="text" id="form-field-1-1" placeholder="Facebook (Url)" class="form-control" />
													</div>
												</div>
												<div class="form-group">

													<div class="col-sm-12">
														<!-- <label class="control-label" for="form-field-1-1"> Full Length </label> -->
														<input type="text" id="form-field-1-1" placeholder="Instagram (Url)" class="form-control" />
													</div>
												</div>
												<div class="form-group">

													<div class="col-sm-12">
														<!-- <label class="control-label" for="form-field-1-1"> Full Length </label> -->
														<input type="text" id="form-field-1-1" placeholder="Linkedin (Url)" class="form-control" />
													</div>

												</div>
												<div class="form-group">
													<div class="col-sm-6">

														<button class="col-sm-12 btn btn-white btn-success">
															<i class="ace-icon fa fa-check bigger-110"></i>Gravar dados
														</button>
													</div>
													<div class="col-sm-6">
														<button class="col-sm-12 btn btn-white btn-warning">
															<i class="ace-icon fa fa-undo bigger-110"></i>Voltar
														</button>

													</div>
												</div>



											</form>
											<!-- <div class="panel panel-default">
													<div class="panel-heading">
                                                       
														<a href="#faq-1-1" data-parent="#faq-list-1" data-toggle="collapse" class="accordion-toggle collapsed">
															<i class="ace-icon fa fa-chevron-left pull-right" data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-left"></i>

															<i class="ace-icon fa fa-user bigger-130"></i>
															&nbsp; High life accusamus terry richardson ad squid?
														</a>
													</div>

													<div class="panel-collapse collapse" id="faq-1-1">
														<div class="panel-body">
															Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
														</div>
													</div>
												</div> -->

											<!-- <div class="panel panel-default">
													<div class="panel-heading">
														<a href="#faq-1-2" data-parent="#faq-list-1" data-toggle="collapse" class="accordion-toggle collapsed">
															<i class="ace-icon fa fa-chevron-left pull-right" data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-left"></i>

															<i class="ace-icon fa fa-sort-amount-desc"></i>
															&nbsp; Can I have nested questions?
														</a>
													</div>

													<div class="panel-collapse collapse" id="faq-1-2">
														<div class="panel-body">
															<div id="faq-list-nested-1" class="panel-group accordion-style1 accordion-style2">
																<div class="panel panel-default">
																	<div class="panel-heading">
																		<a href="#faq-list-1-sub-1" data-parent="#faq-list-nested-1" data-toggle="collapse" class="accordion-toggle collapsed">
																			<i class="ace-icon fa fa-plus smaller-80 middle" data-icon-hide="ace-icon fa fa-minus" data-icon-show="ace-icon fa fa-plus"></i>&nbsp;
									                                         Enim eiusmod high life accusamus terry?
																		</a>
																	</div>

																	<div class="panel-collapse collapse" id="faq-list-1-sub-1">
																		<div class="panel-body">
																			Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
																		</div>
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">
																		<a href="#faq-list-1-sub-2" data-parent="#faq-list-nested-1" data-toggle="collapse" class="accordion-toggle collapsed">
																			<i class="ace-icon fa fa-plus smaller-80 middle" data-icon-hide="ace-icon fa fa-minus" data-icon-show="ace-icon fa fa-plus"></i>&nbsp;
									                                              Food truck quinoa nesciunt laborum eiusmod?
																		</a>
																	</div>

																	<div class="panel-collapse collapse" id="faq-list-1-sub-2">
																		<div class="panel-body">
																			Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
																		</div>
																	</div>
																</div>

																<div class="panel panel-default">
																	<div class="panel-heading">
																		<a href="#faq-list-1-sub-3" data-parent="#faq-list-nested-1" data-toggle="collapse" class="accordion-toggle collapsed">
																			<i class="ace-icon fa fa-plus smaller-80 middle" data-icon-hide="ace-icon fa fa-minus" data-icon-show="ace-icon fa fa-plus"></i>&nbsp;
									                                                              Cupidatat skateboard dolor brunch?
																		</a>
																	</div>

																	<div class="panel-collapse collapse" id="faq-list-1-sub-3">
																		<div class="panel-body">
																			Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div> -->

											<!-- <div class="panel panel-default">
													<div class="panel-heading">
														<a href="#faq-1-3" data-parent="#faq-list-1" data-toggle="collapse" class="accordion-toggle collapsed">
															<i class="ace-icon fa fa-chevron-left pull-right" data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-left"></i>

															<i class="ace-icon fa fa-credit-card bigger-130"></i>
															&nbsp; Single-origin coffee nulla assumenda shoreditch et?
														</a>
													</div>

													<div class="panel-collapse collapse" id="faq-1-3">
														<div class="panel-body">
															Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
														</div>
													</div>
												</div> -->

											<!-- <div class="panel panel-default">
													<div class="panel-heading">
														<a href="#faq-1-4" data-parent="#faq-list-1" data-toggle="collapse" class="accordion-toggle collapsed">
															<i class="ace-icon fa fa-chevron-left pull-right" data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-left"></i>

															<i class="ace-icon fa fa-files-o bigger-130"></i>
															&nbsp; Sunt aliqua put a bird on it squid?
														</a>
													</div>

													<div class="panel-collapse collapse" id="faq-1-4">
														<div class="panel-body">
															Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
														</div>
													</div>
												</div> -->

											<!-- <div class="panel panel-default">
													<div class="panel-heading">
														<a href="#faq-1-5" data-parent="#faq-list-1" data-toggle="collapse" class="accordion-toggle collapsed">
															<i class="ace-icon fa fa-chevron-left pull-right" data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-left"></i>

															<i class="ace-icon fa fa-cog bigger-130"></i>
															&nbsp; Brunch 3 wolf moon tempor sunt aliqua put?
														</a>
													</div>

													<div class="panel-collapse collapse" id="faq-1-5">
														<div class="panel-body">
															Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
														</div>
													</div>
												</div> -->
										</div>
									</div>

									<div id="faq-tab-2" class="tab-pane fade">
										<h4 class="blue">
											<i class="green ace-icon fa fa-user bigger-110"></i>
											Informações Sobre o Autor
										</h4>

										<div class="space-8"></div>


										<div id="faq-list-2" class="panel-group accordion-style1 accordion-style2">
											<form action="" class="form-horizontal" role="form" method="post">
												<div class="form-group">

													<div class="col-sm-12">
														<!-- <label class="control-label" for="form-field-1-1"> Full Length </label> -->
														<textarea style="resize: vertical;" rows="10" class="form-control" id="form-field-8" placeholder="Descreva o que deve aparecer no sobre"></textarea>
													</div>

												</div>
												<div class="form-group">
													<div class="col-sm-6">

														<button class="col-sm-12 btn btn-white btn-success">
															<i class="ace-icon fa fa-check bigger-110"></i>Gravar dados
														</button>
													</div>
													<div class="col-sm-6">
														<button class="col-sm-12 btn btn-white btn-warning">
															<i class="ace-icon fa fa-undo bigger-110"></i>Voltar
														</button>

													</div>
												</div>
											</form>
										</div>


									</div>


									<div id="faq-tab-3" class="tab-pane fade">
										<h4 class="blue">
											<i class="orange ace-icon fa fa-credit-card bigger-110"></i>
											Meus Dados
										</h4>

										<div class="space-8"></div>

										<div id="faq-list-3" class="panel-group accordion-style1 accordion-style2">
											<div class="panel panel-default">
												<div class="panel-heading">
													<a href="#faq-3-1" data-parent="#faq-list-3" data-toggle="collapse" class="accordion-toggle collapsed">
														<i class="ace-icon fa fa-plus smaller-80" data-icon-hide="ace-icon fa fa-minus" data-icon-show="ace-icon fa fa-plus"></i>&nbsp;
														Enim eiusmod high life accusamus terry richardson?
													</a>
												</div>

												<div class="panel-collapse collapse" id="faq-3-1">
													<div class="panel-body">
														Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
													</div>
												</div>
											</div>

											<div class="panel panel-default">
												<div class="panel-heading">
													<a href="#faq-3-2" data-parent="#faq-list-3" data-toggle="collapse" class="accordion-toggle collapsed">
														<i class="ace-icon fa fa-plus smaller-80" data-icon-hide="ace-icon fa fa-minus" data-icon-show="ace-icon fa fa-plus"></i>&nbsp;
														Single-origin coffee nulla assumenda shoreditch et?
													</a>
												</div>

												<div class="panel-collapse collapse" id="faq-3-2">
													<div class="panel-body">
														Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
													</div>
												</div>
											</div>

											<div class="panel panel-default">
												<div class="panel-heading">
													<a href="#faq-3-3" data-parent="#faq-list-3" data-toggle="collapse" class="accordion-toggle collapsed">
														<i class="ace-icon fa fa-plus smaller-80" data-icon-hide="ace-icon fa fa-minus" data-icon-show="ace-icon fa fa-plus"></i>&nbsp;
														Sunt aliqua put a bird on it squid?
													</a>
												</div>

												<div class="panel-collapse collapse" id="faq-3-3">
													<div class="panel-body">
														Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
													</div>
												</div>
											</div>

											<div class="panel panel-default">
												<div class="panel-heading">
													<a href="#faq-3-4" data-parent="#faq-list-3" data-toggle="collapse" class="accordion-toggle collapsed">
														<i class="ace-icon fa fa-plus smaller-80" data-icon-hide="ace-icon fa fa-minus" data-icon-show="ace-icon fa fa-plus"></i>&nbsp;
														Brunch 3 wolf moon tempor sunt aliqua put?
													</a>
												</div>

												<div class="panel-collapse collapse" id="faq-3-4">
													<div class="panel-body">
														Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
													</div>
												</div>
											</div>
										</div>
									</div>

									<div id="faq-tab-4" class="tab-pane fade">
										<h4 class="blue">
											<i class="purple ace-icon fa fa-magic bigger-110"></i>
											Miscellaneous Questions
										</h4>

										<div class="space-8"></div>

										<div id="faq-list-4" class="panel-group accordion-style1 accordion-style2">
											<div class="panel panel-default">
												<div class="panel-heading">
													<a href="#faq-4-1" data-parent="#faq-list-4" data-toggle="collapse" class="accordion-toggle collapsed">
														<i class="ace-icon fa fa-hand-o-right" data-icon-hide="ace-icon fa fa-hand-o-down" data-icon-show="ace-icon fa fa-hand-o-right"></i>&nbsp;
														Enim eiusmod high life accusamus terry richardson?
													</a>
												</div>

												<div class="panel-collapse collapse" id="faq-4-1">
													<div class="panel-body">
														Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
													</div>
												</div>
											</div>

											<div class="panel panel-default">
												<div class="panel-heading">
													<a href="#faq-4-2" data-parent="#faq-list-4" data-toggle="collapse" class="accordion-toggle collapsed">
														<i class="ace-icon fa fa-frown-o bigger-120" data-icon-hide="ace-icon fa fa-smile-o" data-icon-show="ace-icon fa fa-frown-o"></i>&nbsp;
														Single-origin coffee nulla assumenda shoreditch et?
													</a>
												</div>

												<div class="panel-collapse collapse" id="faq-4-2">
													<div class="panel-body">
														Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
													</div>
												</div>
											</div>

											<div class="panel panel-default">
												<div class="panel-heading">
													<a href="#faq-4-3" data-parent="#faq-list-4" data-toggle="collapse" class="accordion-toggle collapsed">
														<i class="ace-icon fa fa-plus smaller-80" data-icon-hide="ace-icon fa fa-minus" data-icon-show="ace-icon fa fa-plus"></i>&nbsp;
														Sunt aliqua put a bird on it squid?
													</a>
												</div>

												<div class="panel-collapse collapse" id="faq-4-3">
													<div class="panel-body">
														Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
													</div>
												</div>
											</div>

											<div class="panel panel-default">
												<div class="panel-heading">
													<a href="#faq-4-4" data-parent="#faq-list-4" data-toggle="collapse" class="accordion-toggle collapsed">
														<i class="ace-icon fa fa-plus smaller-80" data-icon-hide="ace-icon fa fa-minus" data-icon-show="ace-icon fa fa-plus"></i>&nbsp;
														Brunch 3 wolf moon tempor sunt aliqua put?
													</a>
												</div>

												<div class="panel-collapse collapse" id="faq-4-4">
													<div class="panel-body">
														Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<!-- PAGE CONTENT ENDS -->


						</div><!-- /.col -->
					</div><!-- /.row -->
				</div><!-- /.final do conteudo da pagina -->
			</div>
		</div><!-- /.main-content -->

		<?php include_once PATH_URL . '/Template/_includes/_footer.php' ?>


	</div><!-- /.final do conteudo Princial -->







	<?php include_once PATH_URL . '/Template/_includes/_scripts.php' ?>
</body>


</html>