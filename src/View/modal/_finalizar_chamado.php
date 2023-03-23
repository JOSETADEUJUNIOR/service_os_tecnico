<div class="modal fade" id="finalizarChamado">
    <div class="modal-dialog modal-xs">
        <div class="modal-content bg-white">
            <div class="modal-header bg-primary">
                <h4 class="modal-title">Finalizar Chamado</h4>

            </div>
            <form action="" id="form_Finalizar_chamado" method="post">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 col-xs-12">
                            <input type="hidden" id="id_chamado_finalizado">
                            <input type="hidden" id="id_alocado">
                            <div class="form-group">
                                <label>Data de atendimento</label>
                                <input class="form-control obg" readonly id="dt_atendido">
                            </div>
                        </div>
                        <div class="col-md-12 col-xs-12">
                            <div class="form-group">
                                <label>Laudo</label>
                                <textarea class="form-control obg" id="laudofinal"></textarea>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" id="btnCancelar" onclick="FechandoModal('form_Finalizar_chamado')" class="btn btn-info" data-dismiss="modal">Cancelar</button>
                    <button name="btnGravar" class="btn btn-success" onclick="return finalizarChamado('form_Finalizar_chamado')">Salvar</button>
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