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
}
