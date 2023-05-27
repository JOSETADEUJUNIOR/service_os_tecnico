<div class="modal fade" id="modal-status">
    <div class="modal-dialog">
        <div class="modal-content bg-danger">
            <div class="modal-header bg-success">
                <h4 class="modal-title">Atender</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>

                </button>
            </div>
            <form action="" id="form_atender" method="post">
                <div class="modal-body">
                    <input type="hidden" id="id_chamado">
                    <input type="hidden" id="status_atual" name="status_atual">
                    <label>Deseja atender a ordem de serviço? <span id="equipamento_atender"></span>?</label>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-warning" onclick="FechandoModal('form_atender')" data-dismiss="modal">fechar</button>
                    <button name="btnMudarStatus" class="btn btn-success" onclick="return AtenderChamado()">Sim</button>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>