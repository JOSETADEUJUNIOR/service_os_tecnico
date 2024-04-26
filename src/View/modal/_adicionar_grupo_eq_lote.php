<div class="modal fade" id="modal_grupo_eq_lote">
    <div class="modal-dialog modal-xs">
        <div class="modal-content bg-white">
            <div class="modal-header bg-primary">
                <h4 class="modal-title">Adicionar insumos no equipamento</h4>

            </div>
            <div class="modal-body">
                <div class="row">
                    <input type="hidden" id="ids_insumos">
                    <input type="hidden" id="id_lote">
                    <div class="table-responsive">
                        <div id="spanGrupoEqLote"></div>
                    </div>
                </div>
                <p>Deseja adicionar os insumos do(s) grupo(s) (<span id="spanNomeGrupos"></span>) em todos os equipamentos?</p>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" id="btnCancelar" onclick="FechandoModal('form_equipamento')" class="btn btn-info" data-dismiss="modal">Cancelar</button>
                <button name="btnGravar" class="btn btn-success" onclick="return AdicionarInsumoTodoLoteAjx()">Sim</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>