var graficoModel = require("../models/graficoModel");

function registrarTentativa(req, res) {
    var idUsuario = req.body.idUsuario;
    var qtPontos = req.body.qtPontos;
    var tentativa = req.body.tentativa;
    var tempo = req.body.tempo;
    var tipoQuiz = req.body.tipoQuiz;

    if (idUsuario == undefined) {
        res.status(400).send("O id do usuário está indefinido!");
        return;
    }
    if (tentativa == undefined) {
        res.status(400).send("O id do usuário está indefinido!");
        return;
    }
    if (qtPontos == undefined) {
        res.status(400).send("O número de pontos está indefinido!");
        return;
    }
    if (tempo == undefined) {
        res.status(400).send("O tempo está indefinido!");
        return;
    }
    if (tipoQuiz == undefined) {
        res.status(400).send("O tipo de quiz está indefinido!");
        return;
    }


    graficoModel.registrarTentativa(idUsuario, qtPontos, tempo, tipoQuiz, tentativa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao registrar a tentativa! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function verificarTentativas(req, res) {
    var idUsuario = req.params.idUsuario;
    var tipoQuiz = req.params.tipoQuiz;

    if (idUsuario == undefined) {
        res.status(400).send("O id do usuário está indefinido!");
        return;
    }
    if (tipoQuiz == undefined) {
        res.status(400).send("O tipo de quiz está indefinido!");
        return;
    }
    
    graficoModel.verificarTentativas(idUsuario, tipoQuiz)
        .then(
            function (resultado) {
                var tentativas = resultado[0].tentativas || 0;
                res.json({ tentativas: tentativas });
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao verificar as tentativas! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarTentativas(req, res) {
    const idUsuario = req.params.idUsuario;
    const tipoQuiz = req.params.tipoQuiz;

    if (idUsuario === undefined) {
        res.status(400).send("O id do usuário está indefinido!");
        return;
    }
    if (tipoQuiz === undefined) {
        res.status(400).send("O tipo de quiz está indefinido!");
        return;
    }

    graficoModel.listarTentativas(idUsuario, tipoQuiz)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.error(erro);
                res.status(500).json({ error: "Erro ao listar as tentativas do usuário" });
            }
        );
}

module.exports = {
    registrarTentativa,
    verificarTentativas,
    listarTentativas
};