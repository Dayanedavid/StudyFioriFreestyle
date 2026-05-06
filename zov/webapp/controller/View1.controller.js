sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("zov.controller.View1", {
            onInit: function () {
            },

            digaOla: function () {
                alert("Olá");
            },

            onTest: function () {
                const oModel = this.getOwnerComponent().getModel();

                const oBinding = oModel.bindContext("/ZC_DD_CAB");

                oBinding.requestObject()
                    .then((oData) => {
                        console.log(oData);
                        this.digaOla();
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            }
        });
    });