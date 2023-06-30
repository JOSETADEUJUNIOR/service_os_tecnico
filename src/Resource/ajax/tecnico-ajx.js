
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
                console.log(resultado);
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
            console.log(resultado);
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
    console.log(filtro_chamado);
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
            console.log(resultado);
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
                console.log(resultado);
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

function CarregarProdutosOS(id) {
    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }

    var dados = {
        endpoint: 'CarregarProdServOS',
        chamado_id: id,
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
            console.log(itens);
            preencherTabelaItens(itens);

        }
    })
    return false;
}


function preencherTabelaItens(itens) {

    if (itens != "") {

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
                /* var botaoExcluir = $("<button class=\"red\"><i title=\"Excluir\" class=\"ace-icon fa fa-trash-o bigger-120\"></i></button>");
                botaoExcluir.attr("data-referencia-id", item.referencia_id);
                botaoExcluir.attr("data-produto-id", item.produto_ProdID);
                botaoExcluir.attr("data-quantidade", item.quantidade);

                botaoExcluir.click(function () {
                    var referenciaId = $(this).attr("data-referencia-id");
                    var produtoId = $(this).attr("data-produto-id");
                    var quantidade = $(this).attr("data-quantidade");
                    alert(quantidade);
                    RemoveProdOS(referenciaId, quantidade, produtoId);
                }); */

                /*   var colunaExcluir = $("<td></td>").append(botaoExcluir); */

                linha_os.append(colunaDescricao_os, colunaTipo_os, colunaQuantidade_os_prod, colunaValorUnitario_os, colunaValorTotal);
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
                /*  var botaoExcluir = $("<button class=\"red\"><i title=\"Excluir\" class=\"ace-icon fa fa-trash-o bigger-120\"></i></button>");
                 botaoExcluir.attr("data-referencia-id", item.referencia_id);
                 botaoExcluir.attr("data-servico-id", item.servico_ProdID);
 
                 botaoExcluir.click(function () {
                     var referenciaId = $(this).attr("data-referencia-id");
                     var servicoId = $(this).attr("data-servico-id");
                     RemoveServOS(referenciaId, servicoId);
                 }); */

                /*   var colunaExcluir = $("<td></td>").append(botaoExcluir); */

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
            console.log(resultado);
            $('<option>').val("").text("Selecione").appendTo(combo_equipamento);

            $(resultado).each(function () {

                $('<option>').val(this.idEquip).text(this.descricao).appendTo(combo_equipamento);
            })
        }
    })
    return false;
}


function FiltrarLote() {

    var dadosAPI = GetTnkValue();
    if (!dadosAPI.tecnico_id) {
        Sair();
    }
    var dados = {
        endpoint: 'FiltrarLote',
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
            console.log(resultado);
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

                table_start = '<table class="table table-hover" id="dynamic-tables_lotes"><thead>';
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

                $("#dynamic-tables_lotes").html(vaso);
            } else {
                MensagemGenerica("Nenhum chamado encontrado");
                $("#dynamic-tables_lotes").html('');
            }
        }


    })

}

function CriarLote() {
    alert('chegou');
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