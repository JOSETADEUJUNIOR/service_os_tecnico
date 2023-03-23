function ValidarCampos(n_tela) {

    var ret = true;

    switch (n_tela) {
        case 1: // tela Setor// tela tipo Equipamento

            if ($("#nome").val().trim() == "")
                ret = false;

                NotificarCampo('nome');
            break;

        case 2: // tela AlocarEquipamento
            if ($("#equipamento").val().trim() == "") {

                ret = false;
                break;
            } else if ($("#setor").val().trim() == "") {

                ret = false;
                break;
            }
        case 3: // tela Cidade

            if ($("#nome_cidade").val().trim() == "")
                ret = false;

            break;

        case 4: // tela Equipamento

            if ($("#identificacao").val().trim() == "") {
                ret = false;
            } else if ($("#descricao").val().trim() == "") {
                ret = false;

            } else if ($("#tipo").val().trim() == "") {
                ret = false;
            } else if ($("#modelo").val().trim() == "") {
                ret = false;
            }
        case 5: // tela Estado

            if ($("#estado").val().trim() == "")
                ret = false;

            break;
        case 6: // tela Estado

            if ($("#tipo").val().trim() == ""){
                ret = false;

            }
            else if ($("#setor").val().trim() == ""){
                ret = false;

            }
            else if ($("#nome").val().trim() == ""){
                ret = false;

            }
           else if ($("#sobrenome").val().trim() == ""){
                ret = false;

            }
            else if ($("#email").val().trim() == ""){
                ret = false;

            }
            else if ($("#telefone").val().trim() == ""){
                ret = false;

            }
            else if ($("#endereco").val().trim() == ""){
                ret = false;

            }
            break;
            case 7: // tela Modelo

            if ($("#nome").val().trim() == "")
                ret = false;

            break;
    }

    if (!ret)
        MensagemCamposObrigatorios();

    else{
        load();
    }

    return ret;
}