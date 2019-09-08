const cards = document.querySelectorAll('.card');
const container = document.getElementById('cards');
const restart = document.getElementById('restart');
const moveCount = document.getElementById('move-number');
const starCount = document.getElementById('star-number');
const time = document.getElementById('time');
const star1 = document.getElementById('star1');
const star2 = document.getElementById('star2');
const star3 = document.getElementById('star3');
let hour = document.getElementById('hour');
let minute = document.getElementById('min');
let second = document.getElementById('sec');
const modal = document.getElementById('congrats-modal');
const body = document.getElementById('game-body');
const close = document.getElementById('close');
const replay = document.getElementById('replay');

let start;
let score = 0;
let hr = 0, mn = 0, sc = 0;
let openCards = [];
let isMatched = false;

cardsArr = [...cards];

const startBtns = [restart, replay];

const shuffleCards = (arr) => {
    let curr = arr.length;
    let temp;
    let random;

    for (curr = arr.length - 1; curr > 0; curr--) {
        random = Math.floor(Math.random() * (curr + 1));
        temp = arr[curr];
        arr[curr] = arr[random];
        arr[random] = temp;
    }
    return arr;
}

const init = () => {
    const shuffledCards = shuffleCards(cardsArr);
    shuffledCards.forEach(card => container.appendChild(card));
    openCards = [];
}

cards.forEach(card => card.addEventListener('click', () => {
    card.classList.remove('close');
    card.classList.add('flip', 'disabled');
    openCards.push(card);
    if (openCards.length === 2) {
        checkMatch();

    }
}));

const checkMatch = () => {

    if (openCards[0].getAttribute('name') === openCards[1].getAttribute('name')) {
        openCards[0].classList.add('match', 'disabled', 'large');
        openCards[1].classList.add('match', 'disabled', 'large');
        disableBtns();
        setTimeout(() => {
            openCards[0].classList.remove('flip', 'large');
            openCards[1].classList.remove('flip', 'large');

            removeDisabled();

            openCards = [];

        }, 600)

        isMatched = true;

    } else {
        openCards[0].classList.add('unmatch', 'large');
        openCards[1].classList.add('unmatch', 'large');
        disableBtns();
        setTimeout(() => {
            openCards[0].classList.remove('flip', 'unmatch', 'disabled', 'large');
            openCards[1].classList.remove('flip', 'unmatch', 'disabled', 'large');

            removeDisabled();

            openCards = [];
        }, 600)

        openCards[0].classList.add('close');
        openCards[1].classList.add('close');

        isMatched = false;
    }
    // disableBtns();
    score++;
    if (score == 1) {
        timer();

    }
    document.getElementById('move').textContent = score;
    checkGame();
}

const disableBtns = () => {
    cards.forEach(card => card.classList.add('disabled'));
}


const removeDisabled = () => {
    cards.forEach(card => {
        if (!card.classList.contains('match')) {
            card.classList.remove('disabled');
        }
    })
}


const checkGame = () => {
    if (score < 9) {
        starCount.textContent = '5';
    }
    if (score > 9) {
        star3.style.display = 'none';
        starCount.textContent = '2';
    }
    if (score > 14) {
        star2.style.display = 'none';
        starCount.textContent = '1';
    }
    if (cardsArr.every(card => card.classList.contains('match'))) {
        console.log(true);
        clearInterval(start);

        modal.style.display = 'block';
        body.style.pointerEvents = 'none';
        moveCount.textContent = score;

    }

}

const timer = () => {

    start = setInterval(() => {
        sc++;

        if (sc === 60) {
            sc = 0;
            mn++;
        }
        if (mn == 60) {
            mn = 0;
            hr++;
        }
        // console.log(sc);

        hour.textContent = hr;
        minute.textContent = formatNo(mn);
        second.textContent = formatNo(sc);
    }, 1000)
}

const formatNo = (no) => {
    if (no < 10) {
        return no = '0' + no;
    }
    return no;
}

// restart.addEventListener;

startBtns.forEach(btn => btn.addEventListener('click', () => {
    clearInterval(start);
    hr = 0;
    mn = 0;
    sc = 0;

    hour.textContent = hr;
    minute.textContent = formatNo(mn);
    second.textContent = formatNo(sc);

    score = 0;
    document.getElementById('move').textContent = '0';

    cards.forEach(card => {
        card.classList.remove('flip', 'match', 'unmatch', 'large', 'disabled');
        card.classList.add('close');
    })

    star2.style.display = 'inline';
    star3.style.display = 'inline';
    body.style.pointerEvents = 'auto';
    openCards = [];
    init();
}))

close.addEventListener('click', () => {
    modal.style.display = 'none';
    restart.style.pointerEvents = 'auto';
})

replay.addEventListener('click', () => {
    modal.style.display = 'none';
    restart.style.pointerEvents = 'auto';
})

window.onload = init();