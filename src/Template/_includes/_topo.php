
<?php include_once PATH_URL . './Template/_includes/_scripts.php' ?>
	<script src="../Resource/js/mensagem.js"></script>
	<script src="../Resource/ajax/tecnico-ajx.js"></script>
<script>FiltrarChamadoAberto()</script>
<div id="navbar" class="navbar navbar-default          ace-save-state navbar-fixed-top">
	<div class="navbar-container ace-save-state" id="navbar-container">
		<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
			<span class="sr-only">Toggle sidebar</span>

			<span class="icon-bar"></span>

			<span class="icon-bar"></span>

			<span class="icon-bar"></span>
		</button>

		<div class="navbar-header pull-left">
			<a href="index.php" class="navbar-brand">
				<small>
					<i class="fa fa-ticket"></i>
					JRA - Service OS
				</small>
			</a>
		</div>

		<div class="navbar-buttons navbar-header pull-right" role="navigation">
			<ul class="nav ace-nav">


				<li class="purple dropdown-modal">
					<a data-toggle="dropdown" class="dropdown-toggle" href="#">
						<i id="bell" class="ace-icon fa fa-bell icon-animated-bell"></i>
						<span id="QuantidadeChamado" class="badge badge-important"></span>
					</a>

					<ul class="dropdown-menu-right dropdown-navbar navbar-pink dropdown-menu dropdown-caret dropdown-close">
						<li class="dropdown-header">
							<i class="ace-icon fa fa-exclamation-triangle"></i>
							Chamados
						</li>

						<li class="dropdown-content ace-scroll" style="position: relative;">
							<div class="scroll-track" style="display: none;">
								<div class="scroll-bar"></div>
							</div>
							<div class="scroll-content" style="max-height: 200px;">
								<ul class="dropdown-menu dropdown-navbar navbar-pink">
									<li>
										<a href="chamados.php">
											<div class="clearfix">
												<span class="pull-left">
													<i class="btn btn-xs no-hover btn-pink fa fa-comment"></i>
													Novo Chamado 
												</span>
												<span id="QuantidadeChamadoSpan" class="pull-right badge badge-info"></span>
											</div>
										</a>
									</li>

								</ul>
							</div>
						</li>


					</ul>
				</li>

				


			</ul>
		</div>
	</div><!-- /.navbar-container -->
</div>

