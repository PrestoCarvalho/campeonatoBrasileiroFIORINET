/*global QUnit*/

sap.ui.define([
	"brasileirao/controller/Primeira_tela.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Primeira_tela Controller");

	QUnit.test("I should test the Primeira_tela controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
