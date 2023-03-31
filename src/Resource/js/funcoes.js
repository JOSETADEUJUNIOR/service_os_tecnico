
const URL_API = window.PATH_URL = document.location.origin + '/service_os/src/Resource/api/';

function load() {
    $("#divload").addClass("overlay").html('<i class="fas fa-2x fa-sync-alt fa-spin"> </i>');
}
function RemoverLoad() {
    $("#divload").removeClass("overlay").html('');
}

function AlterarSetorModal(id, nome) {
    alert(id, nome)
    $("#AlteraID").val(id);
    $("#nome").val(nome);
}
function AlterarModeloModal(id, nome) {
    $("#AlteraID").val(id);
    $("#nome").val(nome);
}
function AlterarEquipamentoModal(id, nomeTipo, nomeModelo, identificacao, descricao) {
    $("#idEquip").val(id);
    $("#tipo").val(nomeTipo);
    $("#modelo").val(nomeModelo);
    $("#identificacao").val(identificacao);
    $("#descricao").val(descricao);
}

function ExcluirModal(id, nome) {
    $("#ExcluirID").val(id);
    $("#ExcluirNome").html(nome);

}
function ModalMais(data_atendimento, data_encerramento = "", tec_atendimento = "", tec_encerramento = "", laudotec) {

    $("#dt_atendimento").val(data_atendimento);
    $("#dt_encerramento").val(data_encerramento);
    $("#tec_atendimento").val(tec_atendimento);
    $("#tec_encerramento").val(tec_encerramento);
    if (laudotec != null) {
        $("#laudo").val(laudotec);
    } else if (laudotec = null) {
        console.log('não tem');
        $("#laudo").val("não há dados");
    }
}
function ModalFinalizaChamado(id, idAlocado, data_atendimento, tec_atendimento, laudo = "") {
    $("#id_chamado_finalizado").val(id);
    $("#id_alocado").val(idAlocado);
    $("#dt_atendido").val(data_atendimento);
    $("#tec_atendeu").val(tec_atendimento);
    $("#laudofinal").val(laudo);
}
function AlterarUsuarioModal(id, tipo, nome, email, telefone, cep, rua, bairro, cidade, sigla_estado, empresa_tecnico, setor_id, id_end) {
    
    EscolherUsuario(tipo);
    $("#id_user").val(id);
    $("#tipo").val(tipo);
    $("#nome").val(nome);
    $("#email").val(email);
    $("#telefone").val(telefone);
    $("#cep").val(cep);
    $("#endereco").val(rua);
    $("#bairro").val(bairro);
    $("#cidade").val(cidade);
    $("#estado").val(sigla_estado);
    $("#nome_empresa_tec").val(empresa_tecnico);
    $("#setor").val(setor_id);
    $("#id_end").val(id_end);

}

function AlterarTipoEquipamentoModal(id, nome) {
    $("#AlteraID").val(id);
    $("#nome").val(nome);
}

function FechandoModal(form_id) {
    LimparCampos(form_id)
}


function NotificarCampos(form_id) {

    var ret = true;

    $("#" + form_id + " input," + "#" + form_id + " select, " + "#" + form_id + " textarea").each(function () {

        if ($(this).hasClass("obg")) {
            if ($(this).val().trim() == "") {
                ret = false;
                $(this).addClass("is-invalid");
                $(this).focus();
            } else {
                $(this).removeClass("is-invalid").addClass('is-valid');
            }
        }
    });
    if (!ret)
        MensagemCamposObrigatorios();
    else
        load();

    return ret;
}
function LimparCampos(form_id) {

    $("#" + form_id + " input, select, textarea").each(function () {
        $(this).val('');

    });
}

function CarregarModalStatus(id, nome, status_atual) {
    $("#id_status").val(id);
    $("#nome_user_status").html(nome);
    $("#status_atual").val(status_atual);
}


//para acesso em produção
function BASE_URL_AJAX($file_ajax) {
    return URL_API + $file_ajax + ".php";
}
function EscolherUsuario(tipo) {
   
    switch (tipo) {
        case '2':
            $("#divFunc").show();
            $("#divGeral").show();
            $("#divButton").show();
            $("#divTecnico").hide();
            $("#setor").addClass("obg");
            break;

        case '1':
            $("#divTecnico").hide();
            $("#divFunc").hide();
            $("#setor").removeClass('obg');
            $("#divGeral").show();
            $("#divButton").show();
            break;
        case '3':
            $("#divTecnico").show();
            $("#divFunc").hide();
            $("#divGeral").show();
            $("#divButton").show();
            $("#nome_empresa_tec").addClass('obg');
            break;

        default:
            $("#divFunc").hide();
            $("#divFunc").removeClass('obg');
            $("#divTecnico").hide();
            $("#divGeral").hide();
            $("#divButton").hide();
            break;
    }


}

function AddTnk(t) {
    localStorage.setItem('user_tkn', t);
}

function GetTnkValue() {
    var token = GetTnk();
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var j = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(j);
}

function GetTnk() {
    if (localStorage.getItem('user_tkn') != null)
        return localStorage.getItem('user_tkn');
}

function Verify() {
    if (localStorage.getItem('user_tkn') === null)
        location = "login.php";
}

function ClearTnk() {
    localStorage.clear();
}

function Sair() {

    ClearTnk();
    location = "login.php";
}

function CarregarAtendimentoModal(id, equipamento) {
    $("#id_chamado").val(id);
    $("#equipamento_atender").html(equipamento);
}



