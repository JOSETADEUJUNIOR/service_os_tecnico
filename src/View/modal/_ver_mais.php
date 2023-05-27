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

                        <div class="col-md-12 col-xs-12" id="div_listagem_itens_os" style="display:none">
                    <h3 class="widget-title grey lighter">
                            <i class="ace-icon fa fa-list green"></i>
                            Produtos e serviços adicionados na ordem de serviço
                        </h3>
                        <table id="tabela-itens_os" class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Tipo</th>
                                    <th>Quantidade</th>
                                    <th>Valor Unitário</th>
                                    <th>Valor Total</th>
                                   <!--  <th>Ações</th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <!-- As linhas dos itens serão adicionadas aqui dinamicamente -->
                            </tbody>
                           <!--  <tfoot>
                                <tr style="background-color:#ddd">
                                    <td colspan="5">Total Geral:</td>
                                    <td></td>
                                </tr>
                            </tfoot> -->
                        </table>

                    </div>
                    </div>

                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" id="btnCancelar" onclick="FechandoModal('form_chamado')" class="btn btn-info" data-dismiss="modal">Cancelar</button>
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
</script>