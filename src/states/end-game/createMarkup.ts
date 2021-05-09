const createMarkup = () => {
    const endGame = document.createElement('section');
    endGame.classList.add('l-content');

    const endGameTitle = document.createElement('h1');
    endGameTitle.classList.add('l-content__title');
    endGameTitle.textContent = 'Game over!';

    const endGameScore = document.createElement('p');
    endGameScore.classList.add('l-content__subtitle');
    endGameScore.textContent = 'Your final score is: ';

    const endGameScoreDisplay = document.createElement('span');

    const endGameButtonsContainer = document.createElement('section');
    endGameButtonsContainer.classList.add('l-content__container');

    const endGameRestartButton = document.createElement('button');
    endGameRestartButton.classList.add('c-btn');
    endGameRestartButton.textContent = 'Restart';

    const endGameQuitGameButton = document.createElement('button');
    endGameQuitGameButton.classList.add('c-btn');
    endGameQuitGameButton.textContent = 'Quit game';

    endGame.appendChild(endGameTitle);

    endGameScore.appendChild(endGameScoreDisplay);

    endGame.appendChild(endGameScore);

    endGameButtonsContainer.appendChild(endGameRestartButton);
    endGameButtonsContainer.appendChild(endGameQuitGameButton);

    endGame.appendChild(endGameButtonsContainer);

    return {
        endGame,
        endGameScoreDisplay,
        restartButton: endGameRestartButton,
        quitGameButton: endGameQuitGameButton,
    };
};

export default createMarkup;
