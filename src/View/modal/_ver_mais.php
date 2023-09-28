<style>
    .scrollable-table th, .scrollable-table td {
    width: 150px; /* Defina a largura desejada para as células */
    white-space: nowrap; /* Impede que o conteúdo seja quebrado em várias linhas */
    overflow: hidden; /* Esconde qualquer conteúdo que exceda a largura das células */
    text-overflow: ellipsis; /* Adiciona "..." ao final do conteúdo que não couber na célula */
}

/* Estilo para a div que contém a tabela */
.table-container {
    width: 100%;
    max-height: 400px; /* Defina a altura máxima desejada para ativar a barra de rolagem vertical */
    overflow: auto; /* Ativa a barra de rolagem vertical quando necessário */
}

/* Estilo para a div que envolve a tabela */
.table-wrapper {
    max-width: 100%; /* Isso permite que a barra de rolagem horizontal apareça quando a tabela for mais larga */
    overflow: auto; /* Ativa a barra de rolagem horizontal quando necessário */
}


</style>

<div class="modal fade" id="verMais">
    <div class="modal-dialog modal-lg">
        <div class="modal-content bg-white">
            <div class="modal-header bg-primary">
                <h4 class="modal-title">Ver mais detalhes</h4>

            </div>
            <form action="" id="form_chamado" method="post">
                <div class="modal-body">
                    <div class="row">
                        <div class="widget-header widget-header-large">
                            <h3 class="widget-title grey lighter">
                                <i class="ace-icon fa fa-leaf green"></i>
                                Dados da ordem de serviço
                            </h3>

                            <div class="widget-toolbar no-border invoice-info">
                                <input type="hidden" id="OsID">
                                <span class="invoice-info-label">Numero da NF:</span>
                                <span id="nf" class="red"></span>

                                <br />
                                <span class="invoice-info-label">Data abertura:</span>
                                <span id="data_abertura" class="blue"></span>
                            </div>

                            <div class="widget-toolbar hidden-480">
                                <a href="#">
                                    <i class="ace-icon fa fa-print"></i>
                                </a>
                            </div>
                        </div>


                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Data de atendimento</label>
                                <input class="form-control obg" readonly id="dt_atendimento">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Data de encerramento</label>
                                <input class="form-control obg" readonly id="dt_encerramento">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Tecnico que atendeu</label>
                                <input class="form-control obg" readonly id="tec_atendimento">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Tecnico que encerrou</label>
                                <input class="form-control obg" readonly id="tec_encerramento">
                            </div>
                        </div>
                        <div class="col-md-12 col-xs-12">
                            <div class="form-group">
                                <label>Laudo</label>
                                <textarea class="form-control obg" readonly id="laudo"></textarea>
                            </div>
                        </div>

                        <div class="col-md-12 col-xs-12" id="div_listagem_itens_os" style="display:block">
                            <h3 class="widget-title grey lighter">
                                <i class="ace-icon fa fa-list green"></i>
                                Produtos e serviços adicionados na ordem de serviço
                            </h3>

                            <div class="table-responsive">
                                <div class="modal-body">
                                <div class="table-container">
                                <div class="table-wrapper">
                                <table id="dynamic-table-equipamentos-lote" class="table table-hover table-condensed table-bordered table-striped scrollable-table">
         
                                        <thead>
                                            <tr>
                                                <th>Lote</th>
                                                <th>Equipamento</th>
                                                <th>N.Serie</th>
                                                <th>Versão</th>
                                                <th>Insumos</th>
                                                <th>Serviços</th>
                                                <th>Total Geral</th>
                                                <!--  <th>Ações</th> -->
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <!-- As linhas dos itens serão adicionadas aqui dinamicamente -->
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colspan="6" style="text-align: right;"><strong></strong></td>
                                                <td id="total_geral">0</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    </div>
                                </div>
                                  <!--   <div id="botoes-paginacao" style="text-align:center;">
                                        <button class="btn btn-info btn-sm" id="pagina-anterior">Anterior</button>
                                        <button class="btn btn-info btn-sm" id="proxima-pagina">Próxima</button>
                                    </div> -->
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" id="btnCancelar" onclick="FechandoModal('form_chamado_lote')" class="btn btn-info" data-dismiss="modal">Cancelar</button>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<script>
    /* $(window).on("load", function(){
   // página totalmente carregada (DOM, imagens etc.)
   $("#nome").focus();
   $("#nome").reset();
}); */
function renderizarDados(dados) {
    // ... seu código para renderizar as linhas da tabela ...

    // Calcular o valor total geral
    let totalGeral = 0;
    dados.forEach(function (item) {
        totalGeral += item.total_geral;
    });

    // Inserir o valor total geral no elemento <td>
    $("#total-geral").text(totalGeral.toFixed(2)); // Você pode formatar o valor conforme necessário
}





</script>

