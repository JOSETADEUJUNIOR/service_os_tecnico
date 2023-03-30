<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php'; ?>

<!DOCTYPE html>
<html>

<head>
	<?php include_once PATH_URL . '/Template/_includes/_head.php' ?>
	<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

	<style>
		.dashboard {
			display: flex;
			justify-content: space-between;
		}

		.card {
			width: 30%;
			height: 400px;
			border: 1px solid #ccc;
			box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
			margin-bottom: 20px;
		}

		.card-header {
			background-color: #f8f8f8;
			padding: 10px;
			border-bottom: 1px solid #ccc;
		}

		.card-body {
			height: 300px;
			padding: 20px;
		}

		.card-footer {
			background-color: #f8f8f8;
			padding: 10px;
			border-top: 1px solid #ccc;
		}
	</style>
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










					<div class="dashboard">
						<div class="card">
							<div class="card-header">
								<h2>Chamados Abertos</h2>
							</div>
							<div class="card-body">
								<canvas id="abertos-chart"></canvas>
							</div>
							<div class="card-footer">
								<p>Total de chamados abertos: 50</p>
							</div>
						</div>

						<div class="card">
							<div class="card-header">
								<h2>Chamados em Andamento</h2>
							</div>
							<div class="card-body">
								<canvas id="andamento-chart"></canvas>
							</div>
							<div class="card-footer">
								<p>Total de chamados em andamento: 20</p>
							</div>
						</div>

						<div class="card">
							<div class="card-header">
								<h2>Chamados Encerrados</h2>
							</div>
							<div class="card-body">
								<canvas id="encerrados-chart"></canvas>
							</div>
							<div class="card-footer">
								<p>Total de chamados encerrados: 80</p>
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
	<script>
		//Verify();
		CarregarMeusDados();

		// Dados para os gráficos
		var abertosData = {
			labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
			datasets: [{
				label: 'Chamados Abertos',
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
				data: [10, 15, 20, 25, 30, 35]
			}]
		};

		var andamentoData = {
			labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
			datasets: [{
				label: 'Chamados em Andamento',
				backgroundColor: 'rgba(255, 206, 86, 0.2)',
				borderColor: 'rgba(255, 206, 86, 1)',
				borderWidth: 1,
				data: [5, 10, 15, 20, 25, 30]
			}]
		};

		var encerradosData = {
			labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun]']
		}
		// Configurações dos gráficos
		var chartOptions = {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		};

		// Criação dos gráficos
		var abertosChart = new Chart(document.getElementById("abertos-chart"), {
			type: 'line',
			data: abertosData,
			options: chartOptions
		});

		var andamentoChart = new Chart(document.getElementById("andamento-chart"), {
			type: 'bar',
			data: andamentoData,
			options: chartOptions
		});

		var encerradosChart = new Chart(document.getElementById("encerrados-chart"), {
			type: 'pie',
			data: encerradosData,
			options: chartOptions
		});
	</script>





</body>


</html>