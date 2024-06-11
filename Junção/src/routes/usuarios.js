var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

// Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listarInfo", function (req, res) {
    usuarioController.listarInfo(req, res);
});

router.get("/listarInfo/:email", function (req, res) {
    usuarioController.listarInfo(req, res);
});

module.exports = router;
