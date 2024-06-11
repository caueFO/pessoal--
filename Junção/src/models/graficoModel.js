var database = require("../database/config")

function registrarTentativa(idUsuario, qtPontos, tempo, tipoQuiz, tentativa) {
    console.log("ACESSEI O quiz MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrarTentativa():");

    var instrucaoSql = `
    INSERT INTO quiz (fkUsuario, qtPontos, tempo, tipoQuiz, tentativa) VALUES ('${idUsuario}', '${qtPontos}', '${tempo}', '${tipoQuiz}', '${tentativa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarTentativas(idUsuario, tipoQuiz) {
    var instrucaoSql = `
        SELECT COUNT(*) AS tentativas
        FROM quiz
        WHERE fkUsuario = ${idUsuario} AND tipoQuiz = '${tipoQuiz}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTentativas(idUsuario, tipoQuiz) {
    const instrucaoSql = `
        SELECT qtPontos, tempo
        FROM quiz join usuario on fkUsuario = idUsuario
        WHERE idUsuario = ${idUsuario} AND tipoQuiz = '${tipoQuiz}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrarTentativa,
    verificarTentativas,
    listarTentativas
};

