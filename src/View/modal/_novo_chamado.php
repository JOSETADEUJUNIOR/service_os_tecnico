<div class="modal fade" id="novoChamado">
    <div class="modal-dialog modal-xs">
        <div class="modal-content bg-white">
            <div class="modal-header bg-primary">
                <h4 class="modal-title">Novo Chamado</h4>

            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <input type="hidden" name="idEquip" id="idEquip">
                        <div class="form-group">
                            <label>Escolha o Equipamento</label>
                            <select class="form-control obg" id="equipamento" name="equipamento">

                            </select>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Descrição</label>
                            <textarea class="form-control obg" id="descricao" name="descricao" style="resize: vertical" placeholder="Digite o aqui...."></textarea>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" id="btnCancelar" onclick="FechandoModal('form_chamado')" class="btn btn-info" data-dismiss="modal">Cancelar</button>
                <button name="btnGravar" class="btn btn-success" onclick="return AbrirChamado('form_chamado')">Salvar</button>
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