sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("brasileirao.controller.Primeira_tela", {
            onInit: function () {

                // inicio
                //Definicao dos objetos
                let dadosGerais = {};
                let Classificacao = {};
                let partidas = {};
                // Modelo
                let dadosModel = new JSONModel();
                let ClassificacaoModel = new JSONModel();
                let partidasModel = new JSONModel();
                // colocar os dados dentro dos modelos
                dadosModel.setData(dadosGerais);
                ClassificacaoModel.setData(Classificacao);
                partidasModel.setData(partidas);
                // atribuir modelos a tela
                let tela = this.getView();
                tela.setModel(dadosModel, "ModeloDadosGerais");
                tela.setModel(ClassificacaoModel, "ModeloTabela");
                tela.setModel(partidasModel, "ModeloPartidas");

                // Chamada da funcao
                this.onBuscarClassificacao();
                this.onBuscarDadosGerais();
            },

            onBuscarClassificacao: function () {
                let oModeloTabela = this.getView().getModel("ModeloTabela");
                let configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization": "Bearer live_9cf4266d9d58f093d281ec0aef8ec3"
                    }
                };

                // Chama API usando AJAX
                $.ajax(configuracoes).done(
                    function (response) {
                        //mudar os dados do modelo
                        oModeloTabela.setData(
                            {
                                "Classificacao": response
                            }
                        );

                    }.bind(this)
                );
            },

            onBuscarDadosGerais: function () {
                let oModeloDadosGerais = this.getView().getModel("ModeloDadosGerais");
                let configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization": "Bearer live_9cf4266d9d58f093d281ec0aef8ec3"
                    }
                };

                // Chama API usando AJAX
                $.ajax(configuracoes).done(
                    function (response) {
                        //mudar os dados do modelo
                        oModeloDadosGerais.setData(response);
                       let rodadaAtual = response.rodada_atual.rodada;
                        this.onBuscarPartidas(rodadaAtual);
                    }.bind(this)
                );
            },

            onBuscarPartidas: function (rodadaAtual) {
                let oModeloPartidas = this.getView().getModel("ModeloPartidas");
                let configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodadaAtual,
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization": "Bearer live_9cf4266d9d58f093d281ec0aef8ec3"
                    }
                };

                // Chama API usando AJAX
                $.ajax(configuracoes).done(
                    function (response) {
                        //mudar os dados do modelo
                        oModeloPartidas.setData(response);
                    }.bind(this)
                );
            },
                // fim 

        });
    });