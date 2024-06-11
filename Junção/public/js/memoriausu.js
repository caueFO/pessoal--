var idUsuario = sessionStorage.ID_USUARIO;

window.onload = async function () {
            validarSessao();
            await carregarInfoUsuario();
        };

let dadosUsuario = {};
    
function obterDadosUsuario(email) {
    return fetch(`/usuarios/listarInfo/${encodeURIComponent(email)}`, {
        method: 'GET',
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error('Erro ao obter dados do usuário');
        }
        return resposta.json();
    })
    .catch(erro => {
        console.error(`Erro ao obter dados do usuário: ${erro}`);
        throw erro;
    });
}

async function carregarInfoUsuario() {
    var email = sessionStorage.EMAIL_USUARIO;

    try {
        let dados = JSON.parse(sessionStorage.getItem('dadosUsuario'));
        console.log("Dados antes de verificar se estão vazios:", dados);

        if (!dados) {
            dados = await obterDadosUsuario(email);
            console.log("Dados obtidos do usuário:", dados);
            sessionStorage.setItem('dadosUsuario', JSON.stringify(dados));
            console.log("Dados armazenados na sessionStorage:", JSON.parse(sessionStorage.getItem('dadosUsuario')));
        }

        if (dados) {
            preencherInformacoesUsuario(dados[0]);
        } else {
            console.error("Dados do usuário não encontrados.");
        }
    } catch (error) {
        console.error("Erro ao carregar informações do usuário:", error);
    }
}

function preencherInformacoesUsuario(dados) {
    const idUsuario = dados.idUsuario;

    // Log para verificar o valor da imagem
    console.log("URL da imagem do usuário:", dados.imagem);

    document.querySelector(".hello").innerHTML = `
        <span>${dados.usuario}</span>!<span>Tempo: <span class="timer">00</span></span>
    `;
}

function limparSessao() {
sessionStorage.removeItem('EMAIL_USUARIO');
sessionStorage.removeItem('dadosUsuario');
}