
function ligarRedirecionamento() {
    const myTimeout = setInterval(Redireciona, 600000);
}
function Redireciona() {
    if ($("#verMais").is(":visible")) {
    } else {
        FiltrarChamadoAberto();
        FiltrarChamado(4);
        exibirNotificacao();
    }

}

function exibirNotificacao() {
    // Verifica se o navegador suporta notificações
    if ('Notification' in window) {
        // Solicita permissão para exibir notificações
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                // Se a permissão for concedida, exibe a notificação
                var notification = new Notification('Nova ordem de serviço', {
                    body: 'Uma nova ordem de serviço foi criada',
                    icon: 'fundo.jpg'
                });

                // Reproduz um som de notificação
                var audio = new Audio('som.mp3');
                audio.play();
            }
        });
    }
}


function FiltrarChamadoAberto() {
    dados = {
        endpoint: 'FiltrarChamadoAberto'
    }
    $.ajax({
        type: "POST",
        // url: BASE_URL_AJAX("funcionario_api"),
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];

            const quantidadeBell = resultado.QuantidadeChamado;
            $("#QuantidadeChamado").html('+' + resultado.QuantidadeChamado);
            $("#QuantidadeChamadoSpan").html('+' + resultado.QuantidadeChamado);
            $("#bell").addClass('fa-bell icon-animated-bell');


        }


    })
}

function ValidarAcesso(id_form) {
    if (NotificarCampos(id_form)) {

        var dados = {
            email: $("#login").val(),
            senha: $("#senha").val(),
            endpoint: 'Autenticar'

        }
        $.ajax({
            type: "POST",
            url: BASE_URL_AJAX("tecnico_api"),
            data: JSON.stringify(dados),
            headers: {

                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var ret = dados_ret['result'];
                console.log(ret);
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
    }

    return false;
}

function CarregarMeusDados() {
    // 32 para acessorias
    // 14 em casa
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
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
        url: BASE_URL_AJAX("tecnico_api"),
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
        let dadosAPI = GetTnkValue();
        if (!dadosAPI.tecnico_id) {
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
            url: BASE_URL_AJAX("tecnico_api"),
            data: JSON.stringify(dados),
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];
                if (resultado == 1) {
                    MensagemGenerica("Dados alterados com sucesso", "success");
                } else {
                    MensagemErro();
                }
            }
        })

    }

    return false;
}

function AtenderChamado() {
    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
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
        url: BASE_URL_AJAX("tecnico_api"),
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
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var dados = {
        situacao: filtro_chamado,
        endpoint: 'FiltrarChamadoGeral',
        empresa_id: dadosAPI.empresa_id
    };
    $.ajax({
        type: "POST",
        // url: BASE_URL_AJAX("funcionario_api"),
        url: BASE_URL_AJAX("tecnico_api"),
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
                table_head += '<th>Ver mais</th>';
                table_head += '<th>Ação</th>';
                table_head += '<th>NF</th>';
                table_head += '<th>Data Abertura</th>';
                table_head += '<th>Funcionário</th>';
                table_head += '<th>Status</th>';
                table_head += '<th>Problema</th>';
                table_head += '</tr></thead><tbody>';

                $(resultado).each(function () {
                    var status = '';
                    table_data += '<tr>';
                    table_data += '<td>';
                    if (this.data_abertura != null && this.data_atendimento == null) {
                        status = '<span class="label label-info arrowed-right arrowed-in">Em aberto</span>';
                    } else if (this.data_atendimento != null && this.data_encerramento == null) {
                        status = '<span class="label label-warning arrowed arrowed-right">Em atendimento</span>';
                    } else if (this.data_encerramento != null) {
                        status = '<span class="label label-success arrowed-in arrowed-in-right">Concluída</span>';
                    }



                    table_data += '<button type="button" class="btn btn-info" onclick="ModalMais(' + "'" + this.id + "'" + ',' + "'" + this.data_abertura + "'" + ',' + "'" + this.numero_nf + "'" + ',' + "'" + this.data_atendimento + "'" + ', ' + "'" + (this.data_encerramento != null ? this.data_encerramento : '') + "'" + ', ' + "'" + this.nome_tecnico + "'" + ', ' + "'" + (this.tecnico_encerramento != null ? this.tecnico_encerramento : '') + "'" + ',' + "'" + (this.laudo_tecnico != null ? this.laudo_tecnico : 'sem laudo') + "'" + ')" data-toggle="modal" data-target="#verMais"><i class="ace-icon fa fa-info  align-top bigger-125 icon-on-right"></i></button>';


                    table_data += '</td>';
                    table_data += '<td>';
                    if (this.data_atendimento == null) {
                        table_data += '<button type="button" class="btn btn-xs btn-purple" onclick="CarregarAtendimentoModal(' + this.id + ', ' + "'" + this.numero_nf + "'" + ')" data-toggle="modal" data-target="#modal-status" ><i class="ace-icon fa fa-bolt bigger-110"></i>Atender<i class="ace-icon fa fa-arrow-right icon-on-right"></i></button>';
                    } else if (this.data_atendimento != null && this.data_encerramento == null) {
                        table_data += '<button type="button" onclick="ModalFinalizaChamado(' + this.id + ',' + this.idAlocado + ',' + "'" + this.data_atendimento + "'" + ', ' + "'" + this.nome_tecnico + "'" + ', ' + "'" + (this.laudo_tecnico != null ? this.laudo_tecnico : '') + "'" + ')" data-toggle="modal" data-target="#finalizarChamado" class="btn btn-xs btn-success">Encerrar<i title="Encerrar" class="ace-icon fa fa-share bigger-110"></i></button>';
                    } else if (this.data_encerramento != null) {
                        table_data += '<span class="label label-danger arrowed-in">Encerrado</span>';
                    }
                    table_data += '</td>';
                    table_data += '<td>' + this.numero_nf + '</td>';
                    table_data += '<td>' + this.data_abertura + '</td>';
                    table_data += '<td>' + this.nome_funcionario + '</td>';
                    table_data += '<td>' + status + '</td>';
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

function FiltrarOsNf(valordigitado) {

    let filtro_chamado = valordigitado;
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var dados = {
        buscar_nf: filtro_chamado,
        endpoint: 'FiltrarPorNF',
        empresa_id: dadosAPI.empresa_id
    };
    $.ajax({
        type: "POST",
        // url: BASE_URL_AJAX("funcionario_api"),
        url: BASE_URL_AJAX("tecnico_api"),
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
                table_head += '<th>Ver mais</th>';
                table_head += '<th>Ação</th>';
                table_head += '<th>NF</th>';
                table_head += '<th>Data Abertura</th>';
                table_head += '<th>Funcionário</th>';
                table_head += '<th>Status</th>';
                table_head += '<th>Problema</th>';
                table_head += '</tr></thead><tbody>';

                $(resultado).each(function () {
                    var status = '';
                    table_data += '<tr>';
                    table_data += '<td>';
                    if (this.data_abertura != null && this.data_atendimento == null) {
                        status = '<span class="label label-info arrowed-right arrowed-in">Em aberto</span>';
                    } else if (this.data_atendimento != null && this.data_encerramento == null) {
                        status = '<span class="label label-warning arrowed arrowed-right">Em atendimento</span>';
                    } else if (this.data_encerramento != null) {
                        status = '<span class="label label-success arrowed-in arrowed-in-right">Concluída</span>';
                    }



                    table_data += '<button type="button" class="btn btn-info" onclick="ModalMais(' + "'" + this.id + "'" + ',' + "'" + this.data_abertura + "'" + ',' + "'" + this.numero_nf + "'" + ',' + "'" + this.data_atendimento + "'" + ', ' + "'" + (this.data_encerramento != null ? this.data_encerramento : '') + "'" + ', ' + "'" + this.nome_tecnico + "'" + ', ' + "'" + (this.tecnico_encerramento != null ? this.tecnico_encerramento : '') + "'" + ',' + "'" + (this.laudo_tecnico != null ? this.laudo_tecnico : 'sem laudo') + "'" + ')" data-toggle="modal" data-target="#verMais"><i class="ace-icon fa fa-info  align-top bigger-125 icon-on-right"></i></button>';


                    table_data += '</td>';
                    table_data += '<td>';
                    if (this.data_atendimento == null) {
                        table_data += '<button type="button" class="btn btn-xs btn-purple" onclick="CarregarAtendimentoModal(' + this.id + ', ' + "'" + this.numero_nf + "'" + ')" data-toggle="modal" data-target="#modal-status" ><i class="ace-icon fa fa-bolt bigger-110"></i>Atender<i class="ace-icon fa fa-arrow-right icon-on-right"></i></button>';
                    } else if (this.data_atendimento != null && this.data_encerramento == null) {
                        table_data += '<button type="button" onclick="ModalFinalizaChamado(' + this.id + ',' + this.idAlocado + ',' + "'" + this.data_atendimento + "'" + ', ' + "'" + this.nome_tecnico + "'" + ', ' + "'" + (this.laudo_tecnico != null ? this.laudo_tecnico : '') + "'" + ')" data-toggle="modal" data-target="#finalizarChamado" class="btn btn-xs btn-success">Encerrar<i title="Encerrar" class="ace-icon fa fa-share bigger-110"></i></button>';
                    } else if (this.data_encerramento != null) {
                        table_data += '<span class="label label-danger arrowed-in">Encerrado</span>';
                    }
                    table_data += '</td>';

                    table_data += '<td>' + this.numero_nf + '</td>';
                    table_data += '<td>' + this.data_abertura + '</td>';
                    table_data += '<td>' + this.nome_funcionario + '</td>';
                    table_data += '<td>' + status + '</td>';
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
    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    let id_user_tec = dadosAPI.tecnico_id;
    var dados = {
        endpoint: 'VerificarSenhaAtual',
        id: id_user_tec,
        senha: $("#senha").val()
    };
    $.ajax({
        type: "POST",
        // url: BASE_URL_AJAX("funcionario_api"),
        url: BASE_URL_AJAX("tecnico_api"),
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
    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    let id_user_tec = dadosAPI.tecnico_id;
    var dados = {
        endpoint: "AtualizarSenha",
        id: id_user_tec,
        senha: $("#newsenha").val().trim(),
        repetir_senha: $("#resenha").val().trim()
    };
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
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
        if (!dadosAPI.tecnico_id) {
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
            url: BASE_URL_AJAX("tecnico_api"),
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
                    $("#finalizarChamado").modal('hide');
                } else {
                    MensagemErro();
                }
            }
        })


    }
    return false;
}

function preencherTabedddlaItens(itens) {
    var tabelaItens_os = $("#tabela-itens_os tbody");
    tabelaItens_os.empty(); // Limpa as linhas anteriores da tabela



    if (itens && itens.length > 0) {
        $("#div_listagem_itens_os").show();

        var totalGeral = 0; // Inicializa o total geral como 0

        for (var i = 0; i < itens.length; i++) {
            var item = itens[i];
            var linha_os = $("<tr></tr>");

            // Verifica se é um produto ou serviço
            var tipoItem = item.ProdDescricao ? "Produto" : "ddss";
            var colunaTipo_os = $("<td></td>").text(tipoItem);

            if (item.ProdDescricao) {
                // É um produto
                var colunaDescricao_os = $("<td></td>").text(item.ProdDescricao);
                var colunaQuantidade_os_prod = $("<td></td>").text(item.insumo_quantidade);
                var colunaValorUnitario_os = $("<td></td>").text(formatarValorEmReais(item.insumo_valor));
                var valorTotal = item.insumo_quantidade * item.insumo_valor;
                var colunaValorTotal = $("<td></td>").text(formatarValorEmReais(valorTotal));

                linha_os.append(colunaDescricao_os, colunaTipo_os, colunaQuantidade_os_prod, colunaValorUnitario_os, colunaValorTotal);
            } else {
                // É um serviço
                var quantidadeServico = item.servico_quantidade > 1 ? item.servico_quantidade : 1;
                var colunaDescricao_os = $("<td></td>").text(item.ServNome);
                var colunaQuantidade_os = $("<td></td>").text(quantidadeServico);
                var colunaValorUnitario_os = $("<td></td>").text(formatarValorEmReais(item.servico_valor));
                var valorTotal = 1 * item.servico_valor;
                var colunaValorTotal = $("<td></td>").text(formatarValorEmReais(valorTotal));

                linha_os.append(colunaDescricao_os, colunaTipo_os, colunaQuantidade_os, colunaValorUnitario_os, colunaValorTotal);
            }

            tabelaItens_os.append(linha_os);
            totalGeral += valorTotal;
        }

        // Adicionar a linha do total geral abaixo da tabela
        var linhaTotalGeral = $("<tr style=\"background-color:#ddd\"></tr>");
        var colunaTotalGeral = $("<td></td>").attr("colspan", "4").text("Total Geral:");
        var colunaValorTotalGeral = $("<td></td>").text(formatarValorEmReais(totalGeral));
        linhaTotalGeral.append(colunaTotalGeral, colunaValorTotalGeral);
        tabelaItens_os.append(linhaTotalGeral);
    } else {
        $("#div_listagem_itens_os").hide();
    }
}



function formatarValorEmReais(valor) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return formatter.format(valor);
}

function CarregarEquipamento() {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var combo_equipamento = $("#equipamento");
    combo_equipamento.empty();
    var endpoint_clientes = "ConsultarEquipamento";
    var dados = {
        /* tipo: dadosAPI.tipo,
        empresa_id: dadosAPI.empresa_id,
        id_setor: id_setor_func */
        endpoint: endpoint_clientes,
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            $('<option>').val("").text("Selecione").appendTo(combo_equipamento);

            $(resultado).each(function () {

                $('<option>').val(this.idEquip).text('Identificação: ' + this.identificacao + ' /Descrição: ' + this.descricao).appendTo(combo_equipamento);
            })
        }
    })
    return false;
}

function EncerrarLote() {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var urlParams = new URLSearchParams(window.location.search);
    var id_lote = urlParams.get('id');
    if (verificarCamposPreenchidos()) {


        var dados = {
            endpoint: 'EncerramentoLoteAPI',
            empresa_id: dadosAPI.empresa_id,
            lote_id: parseInt(id_lote)
        };
        $.ajax({
            type: "POST",
            url: BASE_URL_AJAX("tecnico_api"),
            data: JSON.stringify(dados),
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];
                console.log(resultado);
                if (resultado == '1') {
                    MensagemSucesso();
                    FiltrarLote();
                    $("#lote").modal('hide');
                } else {
                    MensagemErro();
                }
            }
        });
    } else {
        MensagemGenerica("Preencha todos os equipamentos com numero de série e versão para encerrar o lote", "warning");
        return false;
    }
}
function FiltrarEquipamentoLote() {// tela de equipamentos do lote
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var urlParams = new URLSearchParams(window.location.search);
    var id_lote = urlParams.get('id');
    var dados = {
        endpoint: 'FiltrarEquipamentoLoteAPI',
        empresa_id: dadosAPI.empresa_id,
        lote_id: parseInt(id_lote)
    };
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret['result'];
            console.log("equipamento:", resultado);
            var QuantidadeAberto = 0;
            if (this.data_atendimento == null) {
                $(resultado).each(function () {
                    QuantidadeAberto = QuantidadeAberto + 1;
                });
            }

            if (resultado.length > 0) {
                var pageSize = 10; // Quantidade de registros por página
                var currentPage = 1; // Página atual (inicialmente a primeira)
                var idEquip = this.equipamento_id;
                console.log("cod:", idEquip);

                // Função para renderizar os dados na tabela
                function renderizarDados(dados, currentPage) {
                    var tableHTML = '<table class="table table-hover" id="dynamic-tables_lotes">';
                    tableHTML += '<thead>';
                    tableHTML += '<tr>';
                    tableHTML += '<th>#</th>';
                    tableHTML += '<th>Equipamento</th>';
                    tableHTML += '<th>Número de Série</th>';
                    tableHTML += '<th>Versão</th>';
                    tableHTML += '<th>Qtd Insumo</th>'; // Nova coluna
                    tableHTML += '<th>Qtd Serviços</th>';
                    tableHTML += '<th>Ações</th>';
                    tableHTML += '</tr>';
                    tableHTML += '</thead>';
                    tableHTML += '<tbody>';
                    var startIndex = (currentPage - 1) * pageSize;
                    $(dados).each(function (index) {
                        var equipmentNumber = startIndex + index + 1; 
                        tableHTML += '<tr>';
                        tableHTML += '<td>' + equipmentNumber + '</td>';
                        tableHTML += '<td>' + this.identificacao + '</td>';
                        tableHTML += '<td><input type="hidden" id="id_lote_equip" class="id_lote_equip" value="' + (this.id_lote_equip) + '"><input type="text" id="numero-serie" class="numero-serie" value="' + (this.numero_serie || '') + '" readonly></td>';
                        tableHTML += '<td><input type="text" id="versao" class="versao" value="' + (this.numero_versao || '') + '" readonly></td>';
                        tableHTML += '<td>' + this.num_insumos + '</td>';
                        tableHTML += '<td>' + this.num_servicos + '</td>';
                        tableHTML += '<td><a href="#" class="green editar" title="inserir ñ serie e versão" data-equipamento-id="' + this.id_lote_equip + '"><i class="ace-icon fa fa-pencil bigger-130"></i></a> ';
                        tableHTML += '<a href="#" class="blue gravar" style="display: none;"><i class="ace-icon fa fa-save bigger-130"></i></a> ';
                        tableHTML += '<a href="#dadosLote" role="button" data-toggle="modal" onclick="CarregarDadosLote(\'' + this.id_lote_equip + '\', \'' + this.equipamento_id + '\', \'' + this.identificacao + '\', \'' + this.numero_lote + '\', \'' + this.lote_id + '\')" class="blue abrir-modal" data-equipamento-id="' + this.id_lote_equip + '"><i class="ace-icon fa fa-search-plus bigger-130"></i></a></td>';


                        tableHTML += '</tr>';
                    });

                    tableHTML += '</tbody>';
                    tableHTML += '</table>';

                    $("#dynamic-tables_lotes").html(tableHTML);
                }

               

                // Função para exibir os dados da página atual
                function exibirPaginaAtual() {
                    var start = (currentPage - 1) * pageSize;
                    var end = start + pageSize;
                    var dadosPagina = resultado.slice(start, end);

                    renderizarDados(dadosPagina, currentPage);
                }

                // Função para atualizar a exibição da tabela com base na página atual
                function atualizarTabela(currentPage) {
                    exibirPaginaAtual(currentPage);
                    document.getElementById("current-page").textContent = currentPage; // Atualiza o número da página atual

                    // Calcula as informações de exibição de entradas
                    var startEntry = (currentPage - 1) * pageSize + 1;
                    var endEntry = Math.min(startEntry + pageSize - 1, resultado.length);
                    var totalEntries = resultado.length;

                    var entriesInfo = "Mostrando " + startEntry + " a " + endEntry + " de " + totalEntries + " entradas";
                    document.getElementById("entries-info").textContent = entriesInfo; // Atualiza a informação de exibição de entradas

                    // ...
                }

                // Inicialize a tabela na primeira página
                atualizarTabela(currentPage);

                // Eventos de clique nos botões de páginação
                $("#previous-page").click(function (e) {
                    console.log("pagina anter:", currentPage);
                    e.preventDefault();
                    if (currentPage > 1) {
                        currentPage--;
                        atualizarTabela(currentPage);
                    }
                });

                $("#next-page").click(function (e) {
                    e.preventDefault();
                    console.log("pagina proxima:", currentPage);
                    var totalPages = Math.ceil(resultado.length / pageSize);
                    if (currentPage < totalPages) {
                        currentPage++;
                        atualizarTabela(currentPage);
                    }
                });

                // Evento de clique no link "Editar"
                $(document).on("click", ".editar", function (e) {
                    e.preventDefault();
                    var tr = $(this).closest("tr");
                    tr.find(".numero-serie").removeAttr("readonly");
                    tr.find(".versao").removeAttr("readonly");
                    $(this).hide();
                    tr.find(".gravar").show();
                });

                $(document).on("click", ".gravar", function (e) {
                    e.preventDefault(); // Impede que a página seja recarregada
                    var tr = $(this).closest("tr");
                    var equipamentoId = $(this).data("equipamento-id");
                    var id_lote_equip = tr.find("#id_lote_equip").val();
                    var numeroSerie = tr.find(".numero-serie").val().trim();
                    var versao = tr.find(".versao").val().trim();

                    if (!numeroSerie) {
                        MensagemGenerica("Campo numero de série é obrigatório", "warning");
                        tr.find(".numero-serie").val('');
                        tr.find(".numero-serie").focus();
                    } else if (!versao) {
                        MensagemGenerica("Campo versão é obrigatório", "warning");
                        tr.find(".versao").val('');
                        tr.find(".versao").focus();
                    } else {
                        // Chame a função para gravar os dados usando o equipamentoId, numeroSerie e versao
                        GravarDadosEquipamento(id_lote_equip, numeroSerie, versao, currentPage);

                        // Depois de gravar os dados, desabilite os campos novamente
                        tr.find(".numero-serie").attr("readonly", true);
                        tr.find(".versao").attr("readonly", true);
                        $(this).hide();
                        tr.find(".editar").show();
                    }
                });

            } else {
                MensagemGenerica("Nenhum chamado encontrado");
                $("#dynamic-tables_lotes").html('');
            }
        }
    });
}

//função para verificar se tem equipamento sem numero de serie e versão preenchidos

function verificarCamposPreenchidos() {
    var todosPreenchidos = true;

    $("#dynamic-tables_lotes tbody tr").each(function () {
        var numeroSerie = $(this).find(".numero-serie");
        var versao = $(this).find(".versao");

        var numeroSerieValue = numeroSerie.val().trim();
        var versaoValue = versao.val().trim();

        if (!numeroSerieValue || !versaoValue) {
            todosPreenchidos = false;

            // Destacar a linha inteira
            $(this).addClass("linha-incompleta");
        } else {
            // Remover o destaque da linha se estiver completa
            $(this).removeClass("linha-incompleta");
        }
    });

    return todosPreenchidos;
}


function GravarDadosEquipamento(id_lote_equip, numeroSerie, versao, currentPage) {// grava os dados de numero de serie e versão do equipamento
    console.log("paginal atual:", currentPage);
    console.log("equipamentoId:", id_lote_equip);
    console.log("numeroSerie:", numeroSerie);
    console.log("versao:", versao);

    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    let id_user_tec = dadosAPI.tecnico_id;

    let dados = {
        endpoint: 'EditarEquipamentoLoteAPI',
        empresa_id: dadosAPI.empresa_id,
        equipamento_id: id_lote_equip,
        numeroSerie: numeroSerie,
        versao: versao,
    };
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            if (resultado == '1') {
                MensagemSucesso();
                FiltrarEquipamentoLote(currentPage);
                $("#lote").modal('hide');
            } else {
                MensagemErro();
            }

            // Remover destaque dos campos após a gravação dos dados
            var tr = $("#dynamic-tables_lotes tbody").find("[data-equipamento-id='" + id_lote_equip + "']").closest("tr");
            tr.find(".numero-serie").removeClass("campo-vazio");
            tr.find(".versao").removeClass("campo-vazio");
        }
    });
}

function CarregarClientes() {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var combo_clientes = $("#cliente");
    combo_clientes.empty();
    var endpoint_clientes = "RetornarClientes";
    var dados = {
        tipo: dadosAPI.tipo,
        empresa_id: dadosAPI.empresa_id,
        endpoint: endpoint_clientes,
       
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log("cliente:"+resultado);
            $('<option>').val("").text("Selecione").appendTo(combo_clientes);

            $(resultado).each(function () {

                $('<option>').val(this.CliID).text(this.CliNome).appendTo(combo_clientes);
            })
        }
    })
    return false;
}

function AbrirChamado() {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
   
        console.log("Log:"+$("#cliente").val());
        var id_user_func = dadosAPI.tecnico_id;
        var id_emp_func = dadosAPI.empresa_id;
        var dados = {
            endpoint: "AbrirChamado",
            id_user: id_user_func,
            empresa_id: id_emp_func,
            numero_nf: $("#numero_nf").val(),
            cliente_id: $("#cliente").val(),
            problema: $("#descricao_problema").val().trim(),
            defeito: $("#defeito").val().trim(),
            observacao: $("#observacao").val().trim()

        }

        $.ajax({
            type: "POST",
            // url: BASE_URL_AJAX("funcionario_api"),
            url: BASE_URL_AJAX("tecnico_api"),
            data: JSON.stringify(dados),
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
                'Content-Type': 'application/json'
            },
            success: function (dados_ret) {
                var resultado = dados_ret["result"];
                console.log(resultado);
                /* $("#novoChamado").modal("hide"); */
                if (resultado == '1') {
                   console.log('volto:'+resultado);
                }
            }


        })

   return false;

}


function FiltrarLote(val, status='A') {
    console.log(val);
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var dados = {
        endpoint: 'FiltrarLote',
        empresa_id: dadosAPI.empresa_id,
        filtro: val,
        status: status
    };
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret['result'];
            console.log("resultado:", resultado);
            var QuantidadeAberto = 0;
            if (this.data_atendimento == null) {
                $(resultado).each(function () {
                    QuantidadeAberto = QuantidadeAberto + 1;
                });
            }

            if (resultado) {
                var pageSize = 50; // Quantidade de registros por página
                var currentPage = 1; // Página atual (inicialmente a primeira)

                // Função para renderizar os dados na tabela
                function renderizarDados(dados) {
                    let table_start = '<table class="table table-hover" id="dynamic-tables_lotes"><thead>';
                    let table_head = '<tr>';
                    table_head += '<th>Nomero do lote</th>';
                    table_head += '<th>Data criação</th>';
                    table_head += '<th class="hidden-480">Status</th>';
                    table_head += '<th>Ações</th>';
                    table_head += '</tr></thead><tbody>';

                    let table_data = '';
                    $(dados).each(function () {
                        var dataCriacao = exibirDataBr(this.data_criacao);
                        var statusHtml = '';

                        if (this.status === 'A') {
                            statusHtml = '<span class="label label-sm label-success">Ativo</span>';
                        } else if (this.status === 'N') {
                            statusHtml = '<span class="label label-sm label-warning">Inativo</span>';
                        } else {
                            statusHtml = '<span class="label label-sm label-purple">Encerrado</span>';
                        }

                        table_data += '<tr>';
                        table_data += '<td>' + this.numero_lote + '</td>';
                        table_data += '<td>' + (dataCriacao || '') + '</td>';
                        table_data += '<td class="hidden-480">';
                        table_data += statusHtml;
                        table_data += '</td>';
                        table_data += '<td>';
                        table_data += '<div class="hidden-sm hidden-xs action-buttons">';
                        table_data += '<a class="blue insert-insumos" href="#" data-dt-criacao="' + dataCriacao + '" data-id-lote="' + this.id + '"><i class="ace-icon fa fa-search-plus bigger-130"></i></a>';
                        table_data += '<a class="red" href="#" onclick="inativarLote(\'' + this.id + '\', \'' + this.status + '\')"><i class="ace-icon fa fa-trash-o bigger-130"></i></a>';
                        table_data += '</div>';
                        table_data += '</td>';
                        table_data += '</tr>';
                    });

                    let table_end = '</tbody></table>';
                    let vaso = table_start + table_head + table_data + table_end;

                    $("#dynamic-tables_lotes").html(vaso);
                }




                // Função para exibir os dados da página atual
                function exibirPaginaAtual() {
                    var start = (currentPage - 1) * pageSize;
                    var end = start + pageSize;
                    var dadosPagina = resultado.slice(start, end);

                    renderizarDados(dadosPagina);
                }

                // Função para atualizar a exibição da tabela com base na página atual
                function atualizarTabela() {
                    exibirPaginaAtual();
                    // Atualize os elementos da interface da páginação, como os botões de navegação
                    // e a exibição do número da página atual, conforme necessário.
                }

                // Inicialize a tabela na primeira página
                atualizarTabela();

                // Eventos de clique nos botões de páginação
                $("#previous-page").click(function (e) {
                    e.preventDefault();
                    if (currentPage > 1) {
                        currentPage--;
                        atualizarTabela();
                    }
                });

                $("#next-page").click(function (e) {
                    e.preventDefault();
                    var totalPages = Math.ceil(resultado.length / pageSize);
                    if (currentPage < totalPages) {
                        currentPage++;
                        atualizarTabela();
                    }
                });
            } else {
                MensagemGenerica("Nenhum chamado encontrado");
                $("#dynamic-tables_lotes").html('');
            }
        }
    });
}

function inativarLote(idLote, status) {

    if (status == 'A') {
        status = 'N';
    } else if (status == 'N') {
        status = 'A';
    }
    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    let id_user_tec = dadosAPI.tecnico_id;

    let dados = {
        endpoint: 'InativarLoteAPI',
        status: status,
        lote_id: idLote,
        empresa: dadosAPI.empresa_id,

    }
    $.ajax({

        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log(resultado);
            if (resultado == '1') {
                MensagemSucesso();
                FiltrarLote();
                $("#lote").modal('hide');
            } else {
                MensagemErro();
            }
        }
    })
}
$(document).on("click", ".insert-insumos", function (e) {
    e.preventDefault();
    var idLote = $(this).data("id-lote");
    var dtCriacao = $(this).data("dt-criacao");
    $("#lote_id").html(idLote);
    // Redirecione para a página de edição de lote com o ID do lote e a data de criação como parâmetros
    window.location.href = "editar_lote.php?id=" + idLote + "&dtCriacao=" + dtCriacao;
});



function CriarLote() {

    let dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    let id_user_tec = dadosAPI.tecnico_id;

    let dados = {
        endpoint: 'InserirLoteAPI',
        empresa_id: dadosAPI.empresa_id,
        equipamento_id: $("#equipamento").val(),
        qtd_equip: $("#qtd_equip").val(),
        numero_lote: $("#numero_lote").val(),
        data_lote: $('#data_lote').val()

    }
    $.ajax({

        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log(resultado);
            if (resultado == '1') {
                MensagemSucesso();
                FiltrarLote();
                $("#lote").modal('hide');
            } else {
                MensagemErro();
            }
        }
    })


}


function FiltrarSetor(nome_filtro) {
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("setor_dataview"),
        data: {
            btnFiltrar: 'ajx',
            FiltrarNome: nome_filtro
        }, success: function (dados) {
            $("#table_result_Setor").html(dados);
        }
    })
}


function CarregarProdutosOS(id_equipamento) {

    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var dados = {
        endpoint: 'BuscarProdutosLoteAPI',
        lote_equip_id: id_equipamento,
    };
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var itens = dados_ret['result'];

            preencherTabelaProdutos(itens);


        }
    })
    return false;
}


function preencherTabelaProdutos(produtos) {
    var tabelaProdutos = $("#tabela-produtos-lista tbody");
    tabelaProdutos.empty(); // Limpa as linhas anteriores da tabela

    for (var i = 0; i < produtos.length; i++) {
        var produto = produtos[i];

        // Crie as colunas da tabela para exibir os dados do produto
        var colunaDescricao = $("<td></td>").text(produto.ProdDescricao);
        var colunaValor = $("<td></td>").text(produto.insumo_valor);
        var colunaQuantidade = $("<td></td>").text(produto.insumo_quantidade);

        // Crie uma linha da tabela com as colunas
        var linhaProduto = $("<tr></tr>");
        linhaProduto.append(colunaDescricao, colunaValor, colunaQuantidade);

        // Adicione a linha na tabela
        tabelaProdutos.append(linhaProduto);
    }
}



function CarregarServicosOS(id_equipamento) {

    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var dados = {
        endpoint: 'BuscarServicosLoteAPI',
        lote_equip_id: id_equipamento,
    };
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var itens = dados_ret['result'];

            preencherTabelaServicos(itens);


        }
    })
    return false;
}


function preencherTabelaServicos(servicos) {
    var tabelaServicos = $("#tabela-servicos-lista tbody");
    tabelaServicos.empty(); // Limpa as linhas anteriores da tabela

    for (var i = 0; i < servicos.length; i++) {
        var servico = servicos[i];

        // Crie as colunas da tabela para exibir os dados do serviço
        var colunaNome = $("<td></td>").text(servico.ServNome);
        var colunaValor = $("<td></td>").text(servico.servico_valor);
        var colunaQuantidade = $("<td></td>").text(servico.servico_quantidade);

        // Crie uma linha da tabela com as colunas
        var linhaServico = $("<tr></tr>");
        linhaServico.append(colunaNome, colunaValor, colunaQuantidade);

        // Adicione a linha na tabela
        tabelaServicos.append(linhaServico);
    }
}








function preencherTabelaItens(itens) {

    console.log(itens);
    if (itens && itens.length > 0) {

        $("#div_listagem_itens_os").show();
        var tabelaItens_os = $("#tabela-itens_os tbody");
        tabelaItens_os.empty(); // Limpa as linhas anteriores da tabela

        var totalGeral = 0; // Inicializa o total geral como 0
        var valorTotal;
        for (var i = 0; i < itens.length; i++) {
            var item = itens[i];
            var linha_os = $("<tr></tr>");

            // Verifica se é um produto ou serviço
            var tipoItem = item.ProdDescricao ? "Produto" : "Serviço";
            var colunaTipo_os = $("<td></td>").text(tipoItem);

            if (item.ProdDescricao) {
                // É um produto
                var colunaDescricao_os = $("<td></td>").text(item.ProdDescricao);
                var colunaQuantidade_os_prod = $("<td></td>").text(item.quantidade);
                var colunaValorUnitario_os = $("<td></td>").text(formatarValorEmReais(item.valor));
                var valorTotal = item.quantidade * item.valor;
                var colunaValorTotal = $("<td></td>").text(formatarValorEmReais(valorTotal));
                var botaoExcluir = $("<button class=\"red\"><i title=\"Excluir\" class=\"ace-icon fa fa-trash-o bigger-120\"></i></button>");
                botaoExcluir.attr("data-referencia-id", item.referencia_id);
                botaoExcluir.attr("data-produto-id", item.produto_ProdID);
                botaoExcluir.attr("data-quantidade", item.quantidade);

                botaoExcluir.click(function () {
                    if ($("#status").val() == 0) {
                        var referenciaId = $(this).attr("data-referencia-id");
                        var produtoId = $(this).attr("data-produto-id");
                        var quantidade = $(this).attr("data-quantidade");

                        RemoveProdOS(referenciaId, quantidade, produtoId);
                    } else {
                        MensagemGenerica("Ordem de serviço concluída, exclusão não permitida", "warning");
                    }
                });

                var colunaExcluir = $("<td></td>").append(botaoExcluir);

                linha_os.append(colunaDescricao_os, colunaTipo_os, colunaQuantidade_os_prod, colunaValorUnitario_os, colunaValorTotal, colunaExcluir);
            } else {
                // É um serviço
                var quantidadeServico;
                if (item.quantidade > 1) {
                    quantidadeServico = item.quantidade;
                } else {
                    quantidadeServico = 1;
                }
                var colunaDescricao_os = $("<td></td>").text(item.ServNome);
                var colunaQuantidade_os = $("<td></td>").text(quantidadeServico);
                var colunaValorUnitario_os = $("<td></td>").text(formatarValorEmReais(item.valor));
                var valorTotal = 1 * item.valor;
                var colunaValorTotal = $("<td></td>").text(formatarValorEmReais(valorTotal));

                var botaoExcluir = $("<button class=\"red\"><i title=\"Excluir\" class=\"ace-icon fa fa-trash-o bigger-120\"></i></button>");
                botaoExcluir.attr("data-referencia-id", item.referencia_id);
                botaoExcluir.attr("data-servico-id", item.servico_ProdID);

                botaoExcluir.click(function () {
                    if ($("#status").val() == 0) {
                        var referenciaId = $(this).attr("data-referencia-id");
                        var servicoId = $(this).attr("data-servico-id");
                        RemoveServOS(referenciaId, servicoId);
                    } else {
                        MensagemGenerica("Ordem de serviço concluída, exclusão não permitida", "warning");
                    }
                });

                var colunaExcluir = $("<td></td>").append(botaoExcluir);

                linha_os.append(colunaDescricao_os, colunaTipo_os, colunaQuantidade_os, colunaValorUnitario_os, colunaValorTotal, colunaExcluir);
            }

            tabelaItens_os.append(linha_os);
            totalGeral += valorTotal;
        }

        // Adicionar a linha do total geral abaixo da tabela
        var linhaTotalGeral = $("<tr style=\"background-color:#ddd\"></tr>");
        var colunaTotalGeral = $("<td></td>").attr("colspan", "5").text("Total Geral:");
        var colunaValorTotalGeral = $("<td></td>").text(formatarValorEmReais(totalGeral));
        linhaTotalGeral.append(colunaTotalGeral, colunaValorTotalGeral);
        tabelaItens_os.append(linhaTotalGeral);
    } else {
        $("#div_listagem_itens_os").hide();
    }
}

function formatarValorEmReais(valor) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return formatter.format(valor);
}


function ListarProdutos(equipamento_id) {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var combo_produto = $("#produto");
    var id_empresa = dadosAPI.empresa_id;
    combo_produto.empty();
    var endpoint_produtos = "BuscarInsumoServico";
    var dados = {
        endpoint: endpoint_produtos,
        id_emp_func: id_empresa,
        equipamento_id: equipamento_id,
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret) {
            var resultado = dados_ret["result"];
            console.log('prod:', resultado);

            var tabelaProdutos = $("#tabela-produtos tbody");
            tabelaProdutos.empty(); // Limpa as linhas anteriores da tabela

            for (var i = 0; i < resultado.length; i++) {
                var produto = resultado[i];
                var linha = $("<tr></tr>");

                // Coluna do nome do produto
                var colunaNome = $("<td></td>").text(produto.ProdDescricao);
                linha.append(colunaNome);

                // Coluna do nome do produto
                var colunaEstoque = $("<td></td>").text(produto.ProdEstoque);
                linha.append(colunaEstoque);

                // Coluna do valor do produto
                var colunaValor = $("<td id=\"valor\"></td>");
                var inputValor = $("<input class=\"form-control\" type='text' readonly>").attr("name", "valor[]").val(produto.ProdValorVenda);
                colunaValor.append(inputValor);
                linha.append(colunaValor);

                // Coluna da quantidade (campo de input)
                var colunaQuantidade = $("<td></td>");
                var inputQuantidade = $("<input class=\"form-control\" type='number' min='0' value='0'>").attr("name", "quantidade[]");
                colunaQuantidade.append(inputQuantidade);
                linha.append(colunaQuantidade);

                // Coluna do checkbox
                if (produto.ProdEstoque > 0) {
                    var colunaCheckbox = $("<td></td>");
                    var checkbox = $("<input type='checkbox'>").attr("name", "produto_id[]").val(produto.ProdID);
                    colunaCheckbox.append(checkbox);
                    linha.append(colunaCheckbox);

                } else {
                    var colunaSemSaldo = $("<td style=\"color:red\"></td>").text("item sem saldo");
                    linha.append(colunaSemSaldo);

                }

                tabelaProdutos.append(linha);
            }
        }
    });
    return false;
}


function ListarServicos(equipamento_id) {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var combo_servico = $("#servicos");
    var id_empresa = dadosAPI.empresa_id;
    combo_servico.empty();
    var endpoint_servicos = "BuscarServicoLote";
    var dados = {
        endpoint: endpoint_servicos,
        id_emp_func: id_empresa,
        equipamento_id: equipamento_id
    }
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (dados_ret_serv) {
            var resultado_serv = dados_ret_serv["result"];
            console.log('servic:', resultado_serv);

            var tabelaServicos = $("#tabela-servicos tbody");
            tabelaServicos.empty(); // Limpa as linhas anteriores da tabela

            for (var i = 0; i < resultado_serv.length; i++) {
                var servico = resultado_serv[i];
                var linha = $("<tr></tr>");

                // Coluna do nome do servico
                var colunaNome = $("<td></td>").text(servico.ServNome);
                linha.append(colunaNome);


                // Coluna do valor do produto
                var colunaValor = $("<td id=\"valor\"></td>");
                var inputValor = $("<input class=\"form-control\" type='text' readonly>").attr("name", "valor[]").val(servico.ServValor);
                colunaValor.append(inputValor);
                linha.append(colunaValor);

                // Coluna do checkbox

                var colunaCheckbox = $("<td></td>");
                var checkbox = $("<input type='checkbox'>").attr("name", "servico_id[]").val(servico.ServID);
                colunaCheckbox.append(checkbox);
                linha.append(colunaCheckbox);



                tabelaServicos.append(linha);
            }
        }
    });
    return false;
}



$("#btn-gravar").click(function () {// grando insumo no lote
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    // if (NotificarCampos(id_form)) {
    var id_emp_func = dadosAPI.empresa_id;

    // Obter os valores selecionados dos checkboxes e as quantidades dos inputs
    var Produtos = [];

    var produtosSelecionados = $("input[name='produto_id[]']:checked").each(function () {
        var row = $(this).closest("tr")[0];
        var quantidade = $(row).find("input[name='quantidade[]']").val();
        if (quantidade > 0) {

            Produtos.push({
                "produto_id": $(row).find("input[name='produto_id[]']").val(),
                "valor": $(row).find("input[name='valor[]']").val(),
                "qtd": quantidade,
            });
        } else {
            MensagemGenerica("Inserir quantidade", 'warning');
            return;
        }
    });

    if (Produtos.length === 0) {
        MensagemGenerica("Para gravar, adicione algum produto", 'warning');
        return;
    }

    let dados = {
        endpoint: 'GravarDadosLoteGeral',
        lote_equip_id: $("#id_lote_equip_dados").val(),
        Produtos: Produtos
    }

    // Montar os dados para enviar na requisição AJAX
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (response) {
            if (response['result'] == -2) {
                MensagemGenerica("Produto com saldo insulficiente", "warning");
            } else {
                MensagemGenerica("Produto Adicionado com sucesso", 'success');
                ListarProdutos($("#id_equipamento").val());
                CarregarProdutosOS($("#id_lote_equip_dados").val());
                FiltrarEquipamentoLote();

            }

            // Processar a resposta da requisição
        },
        error: function (xhr, status, error) {
            // Tratar erros na requisição
            console.error(error);
        }
    });

})

$("#btn-gravar-serv").click(function () {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    // if (NotificarCampos(id_form)) {
    var id_emp_func = dadosAPI.empresa_id;

    // Obter os valores selecionados dos checkboxes e as quantidades dos inputs
    var Servicos = [];

    var servicosSelecionados = $("input[name='servico_id[]']:checked").each(function () {
        var row = $(this).closest("tr")[0];
        //var quantidade = $(row).find("input[name='quantidade[]']").val();

        Servicos.push({
            "servico_id": $(row).find("input[name='servico_id[]']").val(),
            "valor": $(row).find("input[name='valor[]']").val(),
        });

    });

    if (Servicos.length === 0) {
        MensagemGenerica("Para gravar, adicione algum serviço", 'warning');
        return;
    }

    let dados = {
        endpoint: 'GravarDadosServLoteGeral',
        lote_equip_id: $("#id_lote_equip_dados").val(),
        Servicos: Servicos
    }

    // Montar os dados para enviar na requisição AJAX
    $.ajax({
        type: "POST",
        url: BASE_URL_AJAX("tecnico_api"),
        data: JSON.stringify(dados),
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            'Content-Type': 'application/json'
        },
        success: function (response) {
            console.log(response);
            if (response['result'] == -2) {
                MensagemGenerica("Produto com saldo insulficiente", "warning");
            } else {
                MensagemGenerica("Serviço Adicionado com sucesso", 'success');
                ListarServicos($("#id_equipamento").val());
                CarregarServicosOS($("#id_lote_equip_dados").val());
                FiltrarEquipamentoLote();


            }

            // Processar a resposta da requisição
        },
        error: function (xhr, status, error) {
            // Tratar erros na requisição
            console.error(error);
        }
    });

})


