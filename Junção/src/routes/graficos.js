var express = require('express');
var router = express.Router();

var graficoController = require('../controllers/graficoController');

router.post("/registrarTentativa", function (req, res) {
    graficoController.registrarTentativa(req, res);
});

router.get('/verificarTentativas/:idUsuario/:tipoQuiz', function (req, res) {
    graficoController.verificarTentativas(req, res);
});

router.get('/listarTentativas/:idUsuario/:tipoQuiz', function (req, res) {
    graficoController.listarTentativas(req, res);
});

module.exports = router;