document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const spanPlayer = document.querySelector('.player');
    const timer = document.querySelector('.timer');
  
    const characters = [
        { name: 'gato', backImg: '../imagens/card1.png', pairId: 1 },
        { name: 'gata', backImg: '../imagens/fundo1.png', pairId: 1 },
        { name: 'cachorro', backImg: '../imagens/fundo1.png', pairId: 2 },
        { name: 'cadela', backImg: '../imagens/card1.png', pairId: 2 },
        { name: 'gato', backImg: '../imagens/card1.png', pairId: 1 },
        { name: 'gato', backImg: '../imagens/card1.png', pairId: 1 },
    ];
  
    // Função para criar um novo elemento HTML com uma classe CSS específica
    const createElement = (tag, className) => {
        // Primeiro, criamos um novo elemento HTML do tipo especificado (ex: 'div')
        const element = document.createElement(tag);
        // Em seguida, definimos a classe CSS do elemento para a classe fornecida
        element.className = className;
        // Por fim, retornamos o elemento criado para que possa ser usado em outro lugar
        return element;
    };
  
    let firstCard = '';
    let secondCard = '';
  
    const checkEndGame = () => {
        const disabledCards = document.querySelectorAll('.disabled-card');
        if (disabledCards.length === characters.length * 2) {
            clearInterval(timerInterval);
            alert(`Parabéns, ${spanPlayer.textContent}! Seu tempo foi de: ${timer.textContent} segundos`);
        }
    };
  
    const checkCards = () => {
        const firstCharacter = firstCard.getAttribute('data-pairId');
        const secondCharacter = secondCard.getAttribute('data-pairId');
  
        if (firstCharacter === secondCharacter) {
            firstCard.firstChild.classList.add('disabled-card');
            secondCard.firstChild.classList.add('disabled-card');
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
  
        front.style.backgroundImage = `url('../imagens/bio.png')`; 
        back.style.backgroundImage = `url('${character.backImg}')`;
  
        card.appendChild(front);
        card.appendChild(back);
        card.addEventListener('click', revealCard);
        card.setAttribute('data-pairId', character.pairId);
  
        return card;
    };
  
    const loadGame = () => {
        const allCards = [];
        characters.forEach((character) => {
            const card1 = createCard(character);
            const card2 = createCard(character);
            allCards.push(card1, card2);
        });
  
        const shuffledArray = allCards.sort(() => Math.random() - 0.5);
  
        shuffledArray.forEach((card) => {
            grid.appendChild(card);
        });
    };
  
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let timerInterval;
  
    const startTimer = () => {
        timerInterval = setInterval(updateTimer, 1000);
    };
  
    const stopTimer = () => {
        clearInterval(timerInterval);
    };
  
    const updateTimer = () => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        timer.textContent = formattedTime;
    };
  
    const playerName = localStorage.getItem('playerName');
    const gameLevel = localStorage.getItem('gameLevel');
  
    if (!playerName || !gameLevel) {
        alert('Informações do jogador não encontradas. Redirecionando para a página de login.');
        window.location.href = '../index.html';
        return;
    }
  
    spanPlayer.textContent = `Jogador: ${playerName}`;
    document.getElementById('difficulty-level').textContent = `Nível Selecionado: ${gameLevel}`;
  
    startTimer();
    loadGame();
  });
  