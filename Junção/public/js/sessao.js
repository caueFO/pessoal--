// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var usuario = sessionStorage.USUARIO_NOME;
    var personagem = sessionStorage.ID_PERSONAGEM;
    var b_usuario = document.getElementById("b_usuario");
    var personagem_img = document.getElementById("personagem_img");

    if (email != null && nome != null && usuario != null && personagem != null) {
        b_usuario.innerHTML = usuario;
        personagem_img.style.display = "block";
       
        if (personagem == 1) {
            personagem_img.src = "caminho/para/imagem1.jpg";

    } else {
        window.location = "../login inazuma.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login inazuma.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}
}
