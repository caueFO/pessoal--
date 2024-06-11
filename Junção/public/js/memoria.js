const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');
var idUsuario = sessionStorage.ID_USUARIO;
var tipoQuiz = 'memoria';

const characters = [
    'asuto', 'endo', 'fei', 'fubuki', 'goenji', 'hiroto', 'meina', 'nishizono', 'shindo',
    'shinsuke', 'shira', 'tenma', 'tsunami', 'tsurugi'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

let firstCard = '';
let secondCard = '';
let loop;

const formatTime = (seconds) => {
    const date = new Date(0);
    date.setSeconds(seconds);
    const timeString = date.toISOString().substr(11, 8);
};

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');
    if (disableCards.length === 2) {
        clearInterval(loop);
        const tempo = parseInt(timer.innerHTML, 10);
        alert(`Parabéns! O jogo foi concluído em ${tempo}`);

        const dadosQuiz = {
            idUsuario: idUsuario,
            qtPontos: tempo,  // Enviando o tempo como número inteiro
            tipoQuiz: tipoQuiz
        };

        enviarDadosQuiz(dadosQuiz);
    }
};

const enviarDadosQuiz = (dadosQuiz) => {
    fetch('/graficos/registrarTentativa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosQuiz)
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error('Erro ao enviar dados do quiz para o servidor');
        }
        console.log('Dados do quiz enviados com sucesso');
    });
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }
};

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
};

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('css/imagens/cards/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
};

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];
    const shuffled = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffled.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

const startTimer = () => {
    timer.innerHTML = '0'; // Iniciando o timer em 0
    loop = setInterval(() => {
        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;
    }, 1000);
};

window.onload = () => {
    startTimer();
    loadGame();
};