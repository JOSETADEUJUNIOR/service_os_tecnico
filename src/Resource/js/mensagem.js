function RetornarMsg(n) {


    var msg = "";

    switch (n) {
        case -7:
            msg = "Os sem *valor, não será possível faturar!";
            break;
        case -6:
            msg = "E-mail digitado já existe!";
            break;
        case -5:
            msg = "Senhas não conferem!";
            break;
        case -3:
            msg = "Senha inválida!";
            break;

        case -4:
            msg = "Login inválido!";
            break;
        case -2:
            msg = "Erro ao tentar excluir, itens em uso";
            break;
        case -1:
            msg = "ocorreu um erro na operação, tente mais tarde";
            break;
        case 0:
            msg = "Preencher o(s) campo(s) obrigatorio(s)";
            break;
        case 1:
            msg = "Ação realizada com sucesso";
            break;
        default:
            break;
    }

    return msg;
}

function MensagemLoginInvalido() {
    toastr.warning(RetornarMsg(-4));
}
function MensagemSenhaInvalida() {
    toastr.warning(RetornarMsg(-3));
}
function MensagemCamposObrigatorios() {
    toastr.warning(RetornarMsg(0));
}
function MensagemSucesso() {
    toastr.success(RetornarMsg(1));
}
function MensagemErro() {
    toastr.error(RetornarMsg(-1));
}
function MensagemExcluirErro() {
    toastr.error(RetornarMsg(-2));
}
function MensagemLogin() {
    toastr.warning(RetornarMsg(-4));
}
function MensagemSenhaDiferente() {
    toastr.warning(RetornarMsg(-5));
}
function MensagemEmailExiste() {
    toastr.warning(RetornarMsg(-6));
}
function MensagemFaturarSemValor() {
    toastr.warning(RetornarMsg(-7));
}
function MensagemGenerica(texto, $tipo) {


    if ($tipo == "warning") {
        toastr.warning(texto);
    } else if ($tipo == "error") {
        toastr.error(texto)
    } else if ($tipo == "success") {
        toastr.success(texto)
    }
    else {
        toastr.info(texto);
    }
}

function MensagemLogar(texto) {

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3600",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr.success(texto)
    window.setTimeout(() => {
        window.location = 'chamados.php';
    }, 3600);
}


