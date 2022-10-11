// Query selectors refactored as functions for more brevity
function select(documentElement) {
    return document.querySelector(documentElement);
}

function selectAll(documentElements) {
    return document.querySelectorAll(documentElements);
}

const playerStarRating = selectAll('.stars li');
const playerMoves = select('.moves');
const minutes = select('#minutes');
const seconds = select('#seconds');
const cardIcons = selectAll('.card i');

let stars = 3;
let moves = 0;
let timeCount = '';
let minutesCount = 0;
let secondsCount = 0;
let cardsOpened = [];
let clicksCount = 0;
let cardsMatching = 0;
let hasTimeCommenced = false;
let gameInterfaceStatic = false;
let gameEnding = false;

// Game cards array
const cardsArray = [
    'fa-cube',
    'fa-leaf',
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-bicycle',
    'fa-bomb',
    'fa-cube',
    'fa-leaf',
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-bicycle',
    'fa-bomb'
];

// Render Shuffled Cards Array
renderShuffledCardsArray();

// Save game interface container in variable
const gameInterface = select('.container');

gameInterface.addEventListener('click', commenceGamePlay());

// Function to commence the game
function commenceGamePlay() {
    return event => {
        if (gameInterfaceStatic) return;

        displayCard(event);
        cardsMatchTest();
        allGameCardsMatch();
        starsRatingEquivalent();
        restartGamePlay(event);
        closeModalInterface(event);
    };
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Function to render shuffled cards array
function renderShuffledCardsArray() {
    const shuffledCardsDeck = shuffle(cardsArray);
    cardIcons.forEach((card, cardPosition) => {
        if (cardIcons[cardPosition].classList.length > 1) {
            card.classList = 'fa';
        }
        card.classList.add(shuffledCardsDeck[cardPosition]);
    }, shuffledCardsDeck);
}

// Function to store cards when opened
function displayCard(event) {
    const cardSelected = event.target;
    if (cardSelected.className === 'card') {
        commenceTimer();

        cardSelected.classList.add('open', 'show');
        if (
            !cardsOpened.includes(cardSelected) &&
            !cardSelected.classList.contains('match')
        ) {
            cardsOpened.push(cardSelected);
        }
        clicksCount++;
        moves = clicksCount / 2;
        playerMoves.innerHTML = Math.floor(moves);
    }
}

// Function for game timer
function gameTimer() {
    if (secondsCount < 60) {
        secondsCount++;
    }
    if (secondsCount === 60) {
        secondsCount = 0;
        minutesCount++;
    }
    if (secondsCount < 10) {
        seconds.innerHTML = `0${secondsCount}`;
    } else {
        seconds.innerHTML = secondsCount;
    }
    minutes.innerHTML = minutesCount;
}

// Function to commence timer
function commenceTimer() {
    if (!hasTimeCommenced) {
        timeCount = setInterval(gameTimer, 1000);
        hasTimeCommenced = true;
    }
}

// Function for cards match test
function cardsMatchTest() {
    if (cardsOpened.length === 2) {
        const bothCardsMatch =
            cardsOpened[0].firstElementChild.classList[1] ===
            cardsOpened[1].firstElementChild.classList[1];
        bothCardsMatch ? matchTrue() : matchNotTrue();
    }

    function matchTrue() {
        cardsOpened[0].classList.add('match');
        cardsOpened[1].classList.add('match');
        cardsMatching++;
        cardsOpened = [];
    }

    function matchNotTrue() {
        gameInterfaceStatic = true;
        setTimeout(() => {
            cardsOpened[0].classList.remove('open', 'show', 'not-matching');
            cardsOpened[1].classList.remove('open', 'show', 'not-matching');
            cardsOpened = [];
            gameInterfaceStatic = false;
        }, 1000);
        cardsOpened[0].classList.add('not-matching');
        cardsOpened[1].classList.add('not-matching');
    }
}

// Function when all cards in the game match
function allGameCardsMatch() {
    if (cardsMatching === 8) {
        completeGame();
    }

    function completeGame() {
        const gameOverRender = select('.game-over-container');
        const gameOverStarRating = select('#stars');
        const totalMoves = select('#moves');
        const timeUsed = select('#time');
        setTimeout(() => {
            gameOverRender.style.display = 'flex';
            gameOverStarRating.innerHTML = ` ${stars}`;
            totalMoves.innerHTML = ` ${moves}`;
            timeUsed.innerHTML = ` ${minutesCount} min(s) ${secondsCount} secs`;
        }, 1000);
        clearInterval(timeCount);
        gameEnding = true;
        cardsMatching = 0;
    }
}

// Function to display stars rating equivalent
function starsRatingEquivalent() {
    if (moves > 16) {
        const doubleStars = playerStarRating[2];
        starsAcquired(doubleStars);
        stars = 2;
    }
    if (moves > 22) {
        const oneStar = playerStarRating[1];
        starsAcquired(oneStar);
        stars = 1;
    }
    if (moves > 28) {
        const noStar = playerStarRating[0];
        starsAcquired(noStar);
        stars = 0;
    }
    function starsAcquired(totalStars) {
        totalStars.firstElementChild.style = 'visibility:hidden';
    }
}

// Game Over Interface
function restartGamePlay(event) {
    const replay = event.target;
    const givenReplayBtn = replay.className === 'fa fa-repeat';
    const newReplayBtn = replayButton.className === 'replay-btn';
    if (givenReplayBtn || newReplayBtn) {
      gameReset();
    }
}

// Function to close game modal interface
function closeModalInterface(event) {
    const closeBtn = event.target;
    if (closeBtn.className === 'close-btn') {
        removeModal();
    }
}

// Function to remove modal
function removeModal() {
    select('.game-over-container').style.display = 'none';
}

// Function to start game all over again
function gameReset() {
    if (gameEnding) {
        removeModal();
    }

    starsReset();
    movesReset();
    timeReset();
    cardReset();
    renderShuffledCardsArray();
    cardsMatching = 0;
    gameEnding = false;
}

// Function to reset stars
function starsReset() {
    stars = 3;
    playerStarRating.forEach(starRender => {
        starRender.firstElementChild.style.visibility = 'initial';
    });
}

// Function to reset moves
function movesReset() {
    clicksCount = 0;
    moves = 0;
    playerMoves.innerHTML = ` ${moves}`;
}

// Function to reset time
function timeReset() {
    clearInterval(timeCount);
    minutesCount = 0;
    secondsCount = 0;
    minutes.innerHTML = minutesCount;
    seconds.innerHTML = `0${secondsCount}`;
    hasTimeCommenced = false;
}

// Function to reset cards in deck
function cardReset() {
    gameInterfaceStatic = false;
    cardsOpened = [];
    cardIcons.forEach(card => {
        card.parentElement.classList = 'card';
    });
}