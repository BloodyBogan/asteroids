const createMarkup = () => {
    const highScores = document.createElement('section');
    highScores.classList.add('l-content');

    const highScoresTitle = document.createElement('h1');
    highScoresTitle.classList.add('l-content__title');
    highScoresTitle.textContent = 'High scores';

    const highScoresScoresContainer = document.createElement('section');
    highScoresScoresContainer.classList.add('l-content__container');

    const highScoresScoresList = document.createElement('ul');

    const highScoresBackToMainMenuButton = document.createElement('button');
    highScoresBackToMainMenuButton.classList.add('c-btn');
    highScoresBackToMainMenuButton.textContent = 'Back to Main Menu';

    highScores.appendChild(highScoresTitle);

    highScoresScoresContainer.appendChild(highScoresScoresList);

    highScores.appendChild(highScoresScoresContainer);
    highScores.appendChild(highScoresBackToMainMenuButton);

    return {
        node: highScores,
        highScoresScoresList,
        backToMainMenuButton: highScoresBackToMainMenuButton,
    };
};

export default createMarkup;
