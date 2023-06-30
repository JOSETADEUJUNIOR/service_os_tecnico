<div class="modal fade" id="lote">
    <div class="modal-dialog modal-lg">
        <div class="modal-content bg-white">
            <div class="modal-header bg-primary">
                <h4 class="modal-title">Gerar Lote</h4>

            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-8">
                        <div class="form-group">
                            <label>Numero do Lote</label>
                            <input class="form-control obg" id="numero_lote" name="numero_lote" placeholder="Digite o aqui....">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Data do lote</label>
                            <input type="date" class="form-control obg" id="numero_lote" value="<?= date("Y-m-d")?>" name="numero_lote" placeholder="Digite o aqui....">
                        </div>
                    </div>
                    
                    <div class="col-md-8">
                        <input type="hidden" name="idEquip" id="idEquip">
                        <div class="form-group">
                            <label>Selecione o equipamento</label>
                            <select class="form-control obg" id="equipamento" name="equipamento">
                                <option value="">Selecione</option>
                                
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Qtd a ser gerado</label>
                            <input class="form-control obg" id="qtd_equip" name="qtd_equip" placeholder="Digite o aqui....">
                        </div>
                    </div>
                   
                </div>

            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" id="btnCancelar" onclick="FechandoModal('form_equipamento')" class="btn btn-info" data-dismiss="modal">Cancelar</button>
                <button name="btnGravar" class="btn btn-success" onclick="return CriarLote()">Salvar</button>
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