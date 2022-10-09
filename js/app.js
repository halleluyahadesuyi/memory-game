/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const deckOfCards = document.querySelector('.deck')
let cardClickCount = 0
let evenCount = 0
let cardIcon = []


function toggleCard(event) {
    event.target.classList.toggle('open')
    event.target.classList.toggle('show')
}

function cardsMatchTest(card1, card2, event) {
    if (card1 !== card2) {
        console.log('not match')
        event.target.classList.remove('open', 'show')
    }
}

deckOfCards.addEventListener('click', function(event) {
    const eventTargetChild = event.target.firstElementChild
    const childClassName = eventTargetChild.className
    cardIcon.push(childClassName)

    console.log(cardIcon)

    for (let i = 0; i < 2; i++) {
        
    }
    
    cardClickCount++
    let previousClick = cardClickCount - 1
    evenCount = cardClickCount % 2

    if (evenCount === 0) {
        // if (cardIcon[0] === cardIcon[1]) {
        //     console.log('match')
        // }
        // if (cardIcon[2] === cardIcon[3]) {
        //     console.log('match')
        // }
        cardsMatchTest(cardIcon[previousClick], cardIcon[cardClickCount], event)
        console.log('yayyyy')
    }
    // if (cardClickCount >= 3 && cardClickCount < 5 && evenCount === 0) {
    //     cardsMatchTest(cardIcon[2], cardIcon[3])
    // }

    toggleCard(event)
    // console.log(event.target.firstElementChild)


    // console.log(cardClickCount)

    // if (toggleCard) {           
    //     cardIcon[0] = event.target.firstElementChild
    //     console.log(cardIcon[0])
    // }
    
})