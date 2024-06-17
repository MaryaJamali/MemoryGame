document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const levelSelection = document.getElementById('level-selection');
    const messageElement = document.getElementById('message');
    const restartButton = document.getElementById('restart');
    const images = [
        'images/image1.jpg', 'images/image2.jpg',
        'images/image3.jpg', 'images/image4.jpg',
        'images/image5.jpg', 'images/image6.jpg',
        'images/image7.jpg', 'images/image8.jpg',
        'images/image9.jpg', 'images/image10.jpg',
    ];
    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let gameLevel = '';

    function createCards(level) {
        gameLevel = level;
        resetGame();
        const difficulty = getDifficulty(level);
        const doubledImages = [...images.slice(0, difficulty), ...images.slice(0, difficulty)];
        doubledImages.sort(() => 0.5 - Math.random());

        doubledImages.forEach((image, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.image = image;

            const img = document.createElement('img');
            img.src = image;
            card.appendChild(img);

            card.addEventListener('click', () => flipCard(card));
            cards.push(card);
            gameContainer.appendChild(card);
        });

        levelSelection.style.display = 'none';
    }

    function getDifficulty(level) {
        switch (level) {
            case 'easy':
                return 6;
            case 'medium':
                return 8;
            case 'hard':
                return 10;
            default:
                return 6;
        }
    }

    function flipCard(card) {
        if (lockBoard) return;
        if (card === firstCard) return;

        card.classList.add('flipped');

        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.image === secondCard.dataset.image;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();

        if (checkWin()) {
            setTimeout(() => {
                messageElement.innerText = 'congratulations! you win';
                messageElement.style.display = 'block';
                restartButton.style.display = 'block';
            }, 500);
        }
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    function resetGame() {
        cards = [];
        gameContainer.innerHTML = '';
        messageElement.style.display = 'none';
        restartButton.style.display = 'none';
    }

    document.getElementById('easy').addEventListener('click', () => createCards('easy'));
    document.getElementById('medium').addEventListener('click', () => createCards('medium'));
    document.getElementById('hard').addEventListener('click', () => createCards('hard'));
    restartButton.addEventListener('click', () => {
        levelSelection.style.display = 'block';
        resetGame();
    });

    function checkWin() {
        return cards.every(card => card.classList.contains('matched'));
    }
});
