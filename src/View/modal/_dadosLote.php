<div class="modal fade" id="dadosLote">
    <div class="modal-dialog modal-lg">
        <div class="modal-content bg-white">
            <div class="modal-header bg-primary">
                <h4 class="modal-title">Insumos e Serviços do equipamento</h4>

            </div>
            <div class="modal-body">
                <div class="row">

                    <div class="widget-header widget-header-large">
                        <h3 class="widget-title grey lighter">
                            <i class="ace-icon fa fa-leaf green"></i>
                            Informações do equipamento
                        </h3>

                        <div class="widget-toolbar no-border invoice-info">
                            <input type="hidden" id="id_lote_equip_dados">
                            <input type="hidden" id="id_equipamento">
                            <input type="hidden" id="status">
                            <span class="invoice-info-label">Equipamento:</span>
                            <span id="equipamento_dados" class="blue"></span></br>
                            <span class="invoice-info-label">Lote:</span>
                            <span id="numero_lote_dados" class="blue"></span>
                        </div>

                        <div class="widget-toolbar hidden-480">
                            <a href="#">
                                <i class="ace-icon fa fa-print"></i>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-12 col-xs-12">



                        <div id="div-produtos">
                            <h3 class="widget-title grey lighter">
                                <i class="ace-icon fa fa-shopping-cart green"></i>
                                Lista de insumos
                            </h3>

                            <table id="tabela-produtos" class="table table-striped table-bordered table-hover">

                                <thead>
                                    <tr class="list_prod">
                                        <th>Insumo</th>
                                        <th>Estoque</th>
                                        <th>Valor</th>
                                        <th>Quantidade</th>
                                        <th>Selecionar</th>

                                    </tr>
                                </thead>
                                <tbody></tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="5" class="text-center">
                                            <button id="btn-gravar" class="btn btn-success col-xs-12 col-sm-12 btn-sm" type="button">Incluir insumo</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                    </div>

                    <div class="col-md-12 col-xs-12" style="margin-top: -20px;">
                        <div id="div-servicos">
                            <h3 class="widget-title grey lighter">
                                <i class="ace-icon fa fa-cogs green"></i>
                                Lista de serviços
                            </h3>

                            <table id="tabela-servicos" class="table table-striped table-bordered table-hover">

                                <thead>
                                    <tr>
                                        <th>Serviços</th>
                                        <th>Valor</th>
                                        <th>Selecionar</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="5" class="text-center">
                                        <button style="float: right;" id="btn-gravar-serv" class="btn btn-success col-xs-12 col-sm-12 btn-sm" type="button">Incluir serviço</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div class="col-md-12 col-xs-12" id="div_listagem_itens_os">
                        <h3 class="widget-title grey lighter">
                            <i class="ace-icon fa fa-list green"></i>
                            Insumos e serviços adicionados no equipamento
                        </h3>
                        <div class="table-responsive">
                            <table id="tabela-produtos-lista" class="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Descrição</th>
                                        <th>Valor Unitário</th>
                                        <th>Quantidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- As linhas dos produtos serão adicionadas aqui dinamicamente -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="col-md-12 col-xs-12" id="div_listagem_servicos_os">
                        <h3 class="widget-title grey lighter">
                            <i class="ace-icon fa fa-list green"></i>
                            Serviços adicionados no equipamento
                        </h3>
                        <div class="table-responsive">
                            <table id="tabela-servicos-lista" class="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Valor</th>
                                        <th>Quantidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- As linhas dos serviços serão adicionadas aqui dinamicamente -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" id="btnCancelar" onclick="FechandoModalOS()" class="btn btn-info" data-dismiss="modal">Salvar dados</button>

            </div>

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