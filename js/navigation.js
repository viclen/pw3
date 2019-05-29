var homeData = "";
var executeMap = () => { };
var fnArray = [];
var currentFunction = "";
var currentPage = "home";
var currentId = "";
var navHistory = [];

$(document).ready(() => {
    homeData = $("#content").html();

    navigate(document.location.hash);

    $("nav a").toArray().forEach(function (element) {
        $(element).html($(element).html() + '<i class="fas fa-angle-right"></i>');
    });

    updateListeners();
});

function toggleMenu(open) {
    if (open === false) {
        $(".btn-toggle-menu > i, .btn-toggle-menu > svg").removeClass("fa-times");
        $(".btn-toggle-menu > i, .btn-toggle-menu > svg").addClass("fa-bars");
        $("nav.sidebar").removeClass("show");
        return;
    } else if (open === true) {
        $(".btn-toggle-menu > i, .btn-toggle-menu > svg").addClass("fa-times");
        $(".btn-toggle-menu > i, .btn-toggle-menu > svg").removeClass("fa-bars");
        $("nav.sidebar").addClass("show");
        return;
    }

    $(".btn-toggle-menu > i, .btn-toggle-menu > svg").toggleClass("fa-times");
    $(".btn-toggle-menu > i, .btn-toggle-menu > svg").toggleClass("fa-bars");
    $("nav.sidebar").toggleClass("show");
}

function navigate(page) {
    if (page) {
        page = page.replace(/#/, "");

        var _get = page.split("/");

        page = _get[1] || page;

        currentPage = page;

        if (_get[2] != undefined && _get[2] != "") {
            currentFunction = isNaN(parseInt(_get[2])) ? _get[2] : "";
            currentId = isNaN(parseInt(_get[2])) ? "" : parseInt(_get[2]);
        } else {
            currentFunction = "";
            currentId = "";
        }

        $.ajax({
            url: page + ".html?rq=" + (new Date).getTime(),
            error: () => { alert("Página não encontrada"); }
        }).done((response) => {
            $("#content").fadeOut(200, function () {
                $("#content").html(response);
                $("#content").fadeIn(200);

                executeHashFunction();
                updateListeners();
            });

            document.location.hash = "/" + page + "/" + currentFunction + currentId;
            document.title = "Papillon | " + page.capitalize();
            $(".header").html(page.capitalize());
            
            navHistory.push(document.location.hash);

            $("nav a").removeClass("active");
            $("nav a[href='/" + page + "']").addClass("active");
        });
    } else {
        navigate("/home");
    }
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

function mapFunctions(data) {
    fnArray = data;
    executeMap = () => {
        try {
            data.forEach((item) => {
                if (window.location.hash.replace("#/", "").split("/")[1] == item[0]) {
                    item[1]();
                    return;
                }
            });
        } catch (error) {
            console.log("Mapa inválido: " + error);
        }
    }
}

function executeFunction(fnName) {
    try {
        fnArray.forEach((item) => {
            if (fnName == item[0]) {
                item[1]();
                return;
            }
        });
    } catch (error) {
        console.log("Função inválida: " + error);
    }
}

function executeHashFunction() {
    if (currentFunction) {
        let h = `<script>
                    $(document).ready(function(){
                        try {
                            ${currentFunction.replace("/", "")}()
                        } catch (error) {
                            $("#content").prepend(\`
                                <div class="alert alert-danger" role="alert">
                                    <i class="fas fa-skull-crossbones"></i>
                                    Ops! Algo deu errado. Essa página não existe ou você não tem permissão para acessá-la.
                                </div>
                            \`);
                        }
                    });
                </script>`;
        $("#content").append(h);
    }
}

function goBack() {
    navHistory.pop();
    var pg = navHistory.pop();
    navigate(pg);
    return pg;
};

function updateListeners() {
    // $(".actionButton, .backButton, nav a, .btn-toggle-menu").off("click");
    $("*").off("click");

    $("nav a").on("click", function (e) {
        e.preventDefault();
        navigate($(this).attr("href") + "/listar");
        toggleMenu(false);
    });

    $(".btn-toggle-menu").on("click", function () {
        toggleMenu();
    });

    $(".actionButton").on("click", function (e) {
        e.preventDefault();
        if ($(this).attr("data-target")) {
            navigate(`#/${currentPage}/${$(this).attr("data-target")}`);
        } else if ($(this).attr("href") != undefined) {
            navigate(`#/${currentPage}/${$(this).attr("href")}`);
        }
    });

    $(".anchor").on("click", function (e) {
        e.preventDefault();
        if ($(this).attr("data-target")) {
            navigate(`#/${$(this).attr("data-target")}`);
        } else if ($(this).attr("href") != undefined) {
            navigate(`#/${$(this).attr("href")}`);
        }
    });

    $(".backButton").on("click", (e) => {
        e.preventDefault();
        goBack();
    });
}