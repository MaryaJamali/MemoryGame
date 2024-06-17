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
}
