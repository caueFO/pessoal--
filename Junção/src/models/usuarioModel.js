var database = require("../database/config");

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario, nome, usuario, email, fkPersonagem AS Personagem 
        FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

function cadastrar(nome, usuario, email, senha, fkPersonagem) {
    var instrucaoSql = `
        INSERT INTO usuario 
        (nome, usuario, email, senha, fkPersonagem) 
        VALUES ('${nome}', '${usuario}', '${email}', '${senha}', '${fkPersonagem}');
    `;
    return database.executar(instrucaoSql);
}

function listarInfo(email) {
    var instrucaoSql = `
        SELECT 
            usuario.idUsuario, 
            usuario.usuario, 
            usuario.email, 
            imagens.imagem, 
            personagem.idPersonagem, 
            personagem.nome, 
            imagens.fkPersonagem 
        FROM usuario 
        INNER JOIN personagem ON usuario.fkPersonagem = personagem.idPersonagem 
        INNER JOIN imagens ON imagens.fkPersonagem = personagem.idPersonagem 
        WHERE usuario.email = '${email}';
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    listarInfo
};
