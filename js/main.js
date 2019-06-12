var response;
var diassemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
diassemana[-1] = "";
var site = "http://pw3.herokuapp.com";
var SESSION = localStorage.getItem("session");

function pesquisar(tabela, pesquisa) {
    $(tabela + " tr").toArray().forEach(function (row) {
        var achou = false;
        $(row).find("td").toArray().forEach(function (col) {
            if ($(col).html().toUpperCase().includes(pesquisa.toUpperCase())) {
                achou = true;
            }
        });
        if (achou) {
            $(row).css("display", "");
        } else {
            $(row).css("display", "none");
        }
    });
}

function toggleMaisInfo(element) {
    $(element).parent().find(".mais-info-tabela").slideToggle();
    $(element).parent().find(".caret").toggleClass("fa-angle-down");
    $(element).parent().find(".caret").toggleClass("fa-angle-right");
    $(element).closest("tr").toggleClass("linha-selecionada");
}