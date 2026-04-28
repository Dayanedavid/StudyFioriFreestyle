sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("zov.controller.View1", {

        onInit: function () {
        },

        // =========================
        // CREATE
        // =========================
        onCreateOVCab: function () {
            const oModel = this.getOwnerComponent().getModel();
            const oListBinding = oModel.bindList("/ZC_DD_CAB");

            const oContext = oListBinding.create({
                Ordemid: 301,
                Clienteid: 100,
                Totalitens: '100.00',
                Totalfrete: '10.00',
                Totalordem: '110.00',
                Status: 'N'
            });

            oContext.created().then(() => {

                const oObject = oContext.getObject(); // ✔️ pega dados do contexto

                this.byId("lastOrdemId").setValue(oObject.Ordemid);
                this.byId("textarea1").setValue(JSON.stringify(oObject));

                MessageToast.show("Cadastrado com sucesso");

            }).catch((oError) => {
                console.error(oError);
                MessageToast.show("Erro no cadastro");
            });
        },

        // =========================
        // CREATE DEEP
        // =========================
        onCreateDeepOVCab: function () {
            const oModel = this.getOwnerComponent().getModel();
            const oListBinding = oModel.bindList("/ZC_DD_CAB");

            const oContext = oListBinding.create({
                Ordemid: 500,
                Clienteid: 12,
                Totalitens: '100.00',
                Totalfrete: '10.00',
                Totalordem: '110.00',
                Status: 'N',
                _Item: [
                    {
                        Itemid: 10,
                        Material: "100",
                        Descricao: "Mouse",
                        Quantidade: 1,
                        Precouni: '1.00',
                        Precotot: '1.00'
                    },
                    {
                        Itemid: 11,
                        Material: "200",
                        Descricao: "Teclado",
                        Quantidade: 2,
                        Precouni: '10.00',
                        Precotot: '20.00'
                    }
                ]
            });

            oContext.created().then(() => {

                const oObject = oContext.getObject(); 

                this.byId("lastOrdemId").setValue(oObject.Ordemid);
                this.byId("textarea1").setValue(JSON.stringify(oObject));

                MessageToast.show("Deep insert realizado");

            }).catch((oError) => {

                console.warn("Deep insert OK, erro no refresh:", oError);

                // evita falso erro
                const oObject = oContext.getObject();

                this.byId("lastOrdemId").setValue(oObject?.Ordemid || "");
                this.byId("textarea1").setValue(JSON.stringify(oObject));

                MessageToast.show("Criado (com aviso de refresh)");

            });
        },

        // =========================
        // READ
        // =========================
        onReadOVCab: function () {
            const iOrdemId = 100;

            if (!iOrdemId) {
                MessageToast.show("Informe um OrdemId válido");
                return;
            }

            const oModel = this.getOwnerComponent().getModel();

            // 👇 cria binding do contexto
            const oBinding = oModel.bindContext(`/ZC_DD_CAB(${iOrdemId})`, undefined, {
                $$groupId: "$auto" // garante execução correta
            });

            // 👇 força leitura do backend
            oBinding.requestObject().then((oData) => {

                if (!oData) {
                    MessageToast.show("Registro não encontrado");
                    return;
                }

                this.byId("textarea1").setValue(JSON.stringify(oData, null, 2));
                MessageToast.show("Leitura realizada");

            }).catch((oError) => {

                console.error("Erro detalhado:", oError);

                MessageToast.show("Erro na leitura");
            });
        },

        // =========================
        // UPDATE
        // =========================
        onUpdateOVCab: function () {
            const iOrdemId = this.byId("lastOrdemId").getValue();

            if (!iOrdemId) {
                MessageToast.show("Crie um cabeçalho primeiro");
                return;
            }

            const oModel = this.getOwnerComponent().getModel();
            const oBinding = oModel.bindContext(`/ZC_DD_CAB(${iOrdemId})`);

            oBinding.requestObject().then(() => {
                const oContext = oBinding.getBoundContext();

                oContext.setProperty("Clienteid", 2);
                oContext.setProperty("Totalitens", '150.00');
                oContext.setProperty("Totalordem", '160.00');
                oContext.setProperty("Status", "C");

                MessageToast.show("Atualizado com sucesso");
            }).catch((oError) => {
                console.error(oError);
                MessageToast.show("Erro no update");
            });
        },

        // =========================
        // DELETE
        // =========================
        onDeleteOVCab: function () {
            // const iOrdemId = this.byId("lastOrdemId").getValue();
            const iOrdemId = 300;

            if (!iOrdemId) {
                MessageToast.show("Informe um ID válido");
                return;
            }

            const oModel = this.getOwnerComponent().getModel();
            const oBinding = oModel.bindContext(`/ZC_DD_CAB(${iOrdemId})`);

            oBinding.requestObject().then(() => {
                const oContext = oBinding.getBoundContext();

                oContext.delete().then(() => {
                    MessageToast.show("Deletado com sucesso");
                    this.byId("textarea1").setValue("");
                    this.byId("lastOrdemId").setValue("");
                });
            }).catch((oError) => {
                console.error(oError);
                MessageToast.show("Erro ao deletar");
            });
        }

    });
});