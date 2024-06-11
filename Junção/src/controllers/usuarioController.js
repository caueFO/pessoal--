var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    if (resultadoAutenticar.length == 1) {
                        const usuario = resultadoAutenticar[0];
                        res.json({
                            idUsuario: usuario.idUsuario,
                            email: usuario.email,
                            nome: usuario.nome,
                            usuario: usuario.usuario,
                            senha: usuario.senha,
                            personagem: usuario.fkPersonagem
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.error("Houve um erro ao realizar o login!", erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var usuario = req.body.usuarioServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var personagem = req.body.personagemServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (personagem == undefined) {
        res.status(400).send("Seu personagem está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (usuario == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else {
        usuarioModel.cadastrar(nome, usuario, email, senha, personagem)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.error("Houve um erro ao realizar o cadastro!", erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarInfo(req, res) {
    var email = req.params.email;

    usuarioModel.listarInfo(email)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.error("Houve um erro ao listar informações do usuário!", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    autenticar,
    cadastrar,
    listarInfo
};
