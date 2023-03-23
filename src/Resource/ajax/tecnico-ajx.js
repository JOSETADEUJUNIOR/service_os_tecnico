
function ligarRedirecionamento() {
    const myTimeout = setInterval(Redireciona, 5000);
}
function Redireciona() {
    if ($("#verMais").is(":visible")) {
    } else {
        FiltrarChamadoAberto();
        FiltrarChamado(4);
    }

}
function FiltrarChamadoAberto(){
   dados = {
    endpoint: 'FiltrarChamadoAberto'
   }
    $.ajax({
        type: "POST",
        // url: BASE_URL_AJAX("funcionario_api"),
        url: "http://localhost/syscompra/src/Resource/api/tecnico_api.php",
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];

           const quantidadeBell = resultado.QuantidadeChamado;
           $("#QuantidadeChamado").html('+'+ resultado.QuantidadeChamado);
                $("#bell").addClass('fa-bell icon-animated-bell');
               
           
        }


    })
}

function ValidarAcesso() {

    var dados = {
        email: $("#login").val(),
        senha: $("#senha").val(),
        endpoint: 'Autenticar'

    }
    $.ajax({
        type: "POST",
        url: "http://localhost/syscompra/src/Resource/api/tecnico_api.php",
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var ret = dados_ret['result'];

            if (ret == -3) {
                MensagemGenerica('Não autorizado', 'info');
            } else if (ret == 0) {
                MensagemGenerica('Preencha os campos obrigatórios', 'warning');
                if ($("#login").val() == '') {
                    $("#login").focus();
                } else {
                    $("#senha").focus();
                }
            } else if (ret == -4) {
                MensagemGenerica('Usuário não ativo ou inexistente, contate o administrador', 'info');

            } else {
                AddTnk(ret);
                MensagemLogar('Sucesso, você será direcioando ao sistema');
            }

        }
    })
    return false;
}

function CarregarMeusDados() {
    // 32 para acessorias
    // 14 em casa
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id){
        Sair();
    }
    var id_user_logado = dadosAPI.tecnico_id;

    var endpoint_cliente = "DetalharMeusDados";
    var dados = {
        endpoint: endpoint_cliente,
        id_user: id_user_logado
    }
    $.ajax({
        type: "POST",
        url: "http://localhost/syscompra/src/Resource/api/tecnico_api.php",
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {

            var resultado = dados_ret["result"];
            $("#nome").val(resultado.nome);
            $("#empresa").val(resultado.empresa_tecnico);
            $("#email").val(resultado.login);
            $("#telefone").val(resultado.telefone);
            $("#rua").val(resultado.rua);
            $("#cidade").val(resultado.cidade);
            $("#estado").val(resultado.sigla_estado);
            $("#id_end").val(resultado.id_end);
            $("#bairro").val(resultado.bairro);
            $("#cep").val(resultado.cep);
        }
    })
}


function AlterarMeusDados(id_form) {
    
    if (NotificarCampos(id_form)) {
        alert(id_form);
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id){
            Sair();
        }
        let id_user_tec = dadosAPI.tecnico_id;
        
        var dados = {
            id_user: id_user_tec,
            endpoint: "AlterarMeusDados",
            nome: $("#nome").val(),
            empresa: $("#empresa").val(),
            login: $("#email").val(),
            telefone: $("#telefone").val(),
            rua: $("#rua").val(),
            cidade: $("#cidade").val(),
            estado: $("#estado").val(),
            id_end: $("#id_end").val(),
            bairro: $("#bairro").val(),
            cep: $("#cep").val(),
        }
        $.ajax({

            type: "POST",
            url: "http://localhost/syscompra/src/Resource/api/tecnico_api.php",
            data: JSON.stringify(dados),
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var resultado = dados_ret['result'];

                if (resultado == -1) {
                  alert('dddd');
                } else {
                   console.log('dasdasdas');
                } 
            }
        })

    }

    return false;
}

function AtenderChamado() {
    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id){
        Sair();
    }
    let id_user_tec = dadosAPI.tecnico_id;

    let dados = {
        endpoint: 'AtenderChamado',
        id_tec: id_user_tec,
        id_chamado: $("#id_chamado").val(),
    }
    $.ajax({

        type: "POST",
        url: "http://localhost/syscompra/src/Resource/api/tecnico_api.php",
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];

            if (resultado == '1') {
                MensagemSucesso();
                FiltrarChamado();
                $("#modal-status").modal('hide');
            } else {
                MensagemErro();
            }
        }
    })

}

function FiltrarChamado(situacao = 4) {

    let filtro_chamado = situacao;

    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id){
        Sair();
    }
    var dados = {
        situacao: filtro_chamado,
        endpoint: 'FiltrarChamadoGeral'
    };
    $.ajax({
        type: "POST",
        // url: BASE_URL_AJAX("funcionario_api"),
        url: "http://localhost/syscompra/src/Resource/api/tecnico_api.php",
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret['result'];
            var QuantidadeAberto = 0;
            if (this.data_atendimento == null) {
                $(resultado).each(function () {
                    QuantidadeAberto = QuantidadeAberto + 1;
                });
            }

            if (resultado) {

                let table_start = '';
                let table_head = '';
                let table_data = '';
                let table_end = '';

                table_start = '<table class="table table-hover" id="dynamic-table"><thead>';
                table_head = '<tr>';
                table_head += '<th></th>';
                table_head += '<th>Data Abertura</th>';
                table_head += '<th>Funcionário</th>';
                table_head += '<th>Equipamento</th>';
                table_head += '<th>Problema</th>';
                table_head += '</tr></thead><tbody>';

                $(resultado).each(function () {
                    table_data += '<tr>';
                    table_data += '<td>';
                    if (this.data_atendimento != null) {
                        table_data += '<button type="button" class="btn btn-block btn-primary btn-sm" onclick="ModalMais(' + "'" + this.data_atendimento + "'" + ', ' + "'" + (this.data_encerramento != null ? this.data_encerramento : '') + "'" + ', ' + "'" + this.nome_tecnico + "'" + ', ' + "'" + (this.tecnico_encerramento != null ? this.tecnico_encerramento : '') + "'" + ',' + "'" + (this.laudo_tecnico != null ? this.laudo_tecnico : 'sem laudo') + "'" + ')" data-toggle="modal" data-target="#verMais">ver mais</button>';
                    }

                    if (this.data_atendimento == null) {
                        table_data += '<button type="button" class="btn btn-block btn-success btn-sm" onclick="CarregarAtendimentoModal(' + this.id + ', ' + "'" + this.identificacao + ' / ' + "Modelo: " + this.nome_modelo + ' / ' + this.nome_tipo + "'" + ')" data-toggle="modal" data-target="#modal-status" >Atender</button>';
                    } else if (this.data_atendimento != null && this.data_encerramento == null) {
                        table_data += '<button type="button" onclick="ModalFinalizaChamado(' + this.id + ',' + this.idAlocado + ',' + "'" + this.data_atendimento + "'" + ', ' + "'" + this.nome_tecnico + "'" + ', ' + "'" + (this.laudo_tecnico != null ? this.laudo_tecnico : '') + "'" + ')" data-toggle="modal" data-target="#finalizarChamado" class="btn btn-block btn-success btn-sm">Finalizar</button>';
                    }
                    table_data += '</td>';

                    table_data += '<td>' + this.data_abertura + '</td>';
                    table_data += '<td>' + this.nome_funcionario + '</td>';
                    table_data += '<td>' + this.identificacao + ' / ' + "Modelo: " + this.nome_modelo + ' / ' + this.nome_tipo + '</td>';
                    table_data += '<td>' + this.descricao_problema + '</td>';
                    table_data += '</tr>';
                })
                table_end = '</tbody></table>';

                let vaso = table_start + table_head + table_data + table_end;

                $("#dynamic-table").html(vaso);
            } else {
                MensagemGenerica("Nenhum chamado encontrado");
                $("#dynamic-table").html('');
            }
        }


    })

}

function VerificarSenhaAtual() {

    var dados = {
        endpoint: 'VerificarSenhaAtual',
        id: 9,
        senha: $("#senha").val()
    };
    $.ajax({
        type: "POST",
        // url: BASE_URL_AJAX("funcionario_api"),
        url: "http://localhost/projetoCurso/src/Resource/api/funcionario_api.php",
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];

            if (resultado == 1) {
                RemoverLoad();
                $("#divSenhaAtual").hide();
                $("#divMudarSenha").show();
            } else if (resultado == -1) {
                MensagemGenerica("Senha não confere", "info");
                $("#senha").focus();
            }
        }


    })

    return false;
}

function AtualizarSenha() {
    var dados = {
        endpoint: "AtualizarSenha",
        id: 32,
        senha: $("#newsenha").val().trim(),
        repetir_senha: $("#resenha").val().trim()
    };
    $.ajax({
        type: "POST",
        // url: BASE_URL_AJAX("funcionario_api"),
        url: "http://localhost/projetoCurso/src/Resource/api/funcionario_api.php",
        data: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];

            if (resultado == 0) {
                NotificarCampos('formNovaSenha');
                $("#newsenha").focus();
            } else if (resultado == -2) {
                NotificarCampos('formNovaSenha');
                MensagemGenerica("Senha precisa ter minimo de 6 caracteres");
                $("#newsenha").focus();
            } else if (resultado == -4) {
                NotificarCampos('formNovaSenha');
                MensagemGenerica("Senhas não conferem", 3);
                $("#resenha").focus();
            } else {
                MensagemGenerica("Sucesso ao alterar senha", 'success');
                $("#divSenhaAtual").show();
                $("#divMudarSenha").hide();
                $("#senha").val('');
                $("#newsenha").val('');
                $("#resenha").val('');
            }
            RemoverLoad();
        }


    })
    return false;
}

function VerSenha() {

    if ($("#senha").prop('type') == 'password') {
        $("#senha").prop('type', 'text');

    } else {
        $("#senha").prop('type', 'password');

    }


}

function finalizarChamado(id_form) {
    if (NotificarCampos(id_form)) {
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id){
            Sair();
        }
        let id_user_tec = dadosAPI.tecnico_id;

        let dados = {
            endpoint: 'FinalizarChamado',
            id_tec: id_user_tec,
            laudo: $("#laudofinal").val(),
            id_chamado: $("#id_chamado_finalizado").val(),
            id_alocado: $("#id_alocado").val(),
        }
        $.ajax({

            type: "POST",
            url: "http://localhost/syscompra/src/Resource/api/tecnico_api.php",
            data: JSON.stringify(dados),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];

                if (resultado == '1') {
                    MensagemSucesso();
                    FiltrarChamado();
                    $("#finalizarChamado").modal('hide');
                } else {
                    MensagemErro();
                }
            }
        })


    }
    return false;
}