function customAlert(data) {
    var html = `<div id="customAlert">
        <div class="custom-alert-background">
            <div class="custom-alert">
                <div class="custom-alert-content">
                    <div class="custom-alert-header">
                        <div class="custom-alert-title">
                            ${data.title || ""}
                        </div>
                        <button class="custom-alert-close">&times;</button>
                    </div>
                    <div class="custom-alert-body">
                        ${data.body || "Alerta"}
                    </div>
                    <div class="custom-alert-footer">
                        ${data.btnYes!=undefined ? `
                            <button class="btn-success">
                                ${data.btnYes.text || "Yes"}
                            </button>`
                        : ""}
                        ${data.btnNo!=undefined ? `
                            <button class="btn-danger">
                                ${data.btnNo.text || "No"}
                            </button>`
                        : ""}
                        ${data.btnCancel!=undefined ? `
                            <button class="btn-secondary">
                                ${data.btnCancel.text || "Cancel"}
                            </button>`
                        : ""}
                    </div>
                </div>
                <div class="custom-alert-confirmation">
                    <i class="fas fa-3x fa-check"></i>
                </div>
                <div class="custom-alert-rejection">
                    <i class="fas fa-3x fa-times"></i>
                </div>
            </div>
        </div>
    </div>`;

    $("html").append(html + style);

    $("#customAlert").close = function () {
        $("#customAlert").remove();
    }

    $(".custom-alert-close").on("click", function () {
        closeAlert();
    });

    if (data.btnYes.click) {
        $(".custom-alert .custom-alert-footer .btn-success").on("click", function () {
            data.btnYes.click();

            $(".custom-alert-confirmation").fadeIn(500, closeAlert);
        });
    }
    if (data.btnNo.click) {
        $(".custom-alert .custom-alert-footer .btn-danger").on("click", function () {
            data.btnNo.click();
            $(".custom-alert-rejection").fadeIn(500, closeAlert);
        });
    }
    if (data.onClose) {
        $(".custom-alert .custom-alert-footer .btn-secondary").on("click", function () {
            data.onClose();
            closeAlert();
        });
    }
}

function closeAlert() {
    $("#customAlert").fadeOut(200, function () {
        $("#customAlert").remove();
    });
}

const style = `<style>
    .custom-alert-background {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1000;
    }

    .custom-alert {
        background: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 200px;
        width: 350px;
        position: fixed;
        max-width: 100%;
    }

    .custom-alert-content {
        position: relative;
        height: 100%;
        width: 100%;
    }

    .custom-alert-confirmation {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #28a745;
        line-height: 100%;
        text-align: center;
        color: white;
        display: none;
        padding-top: 77px;
    }

    .custom-alert-rejection {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #dc3545;
        line-height: 100%;
        text-align: center;
        color: white;
        display: none;
        padding-top: 77px;
    }

    .custom-alert-header {
        font-weight: 600;
        font-family: Verdana;
        width: 100%;
        height: 35px;
        line-height: 35px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        padding-left: 10px;
    }

    .custom-alert-close {
        position: absolute;
        top: 0;
        right: 0;
        background: none;
        border: none;
        width: 30px;
        height: 30px;
        padding: 0;
        text-align: center;
        line-height: 30px;
        font-size: 25px;
        outline: none !important;
    }

    .custom-alert-body {
        padding: 10px;
        font-family: Verdana;
    }

    .custom-alert-footer {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 5px;
    }

    .custom-alert-footer>button {
        border: none;
        outline: none !important;
        width: 80px;
        margin: 0;
        padding: 5px 0px;
        font-family: Verdana;
    }
    </style>`;