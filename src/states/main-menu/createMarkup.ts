const createMarkup = () => {
    const mainMenu = document.createElement('section');
    mainMenu.classList.add('l-content');

    const mainMenuTitle = document.createElement('h1');
    mainMenuTitle.className = 'l-content__title l-content__title--rotated';
    mainMenuTitle.textContent = 'Asteroids';

    const mainMenuButtonsContainer = document.createElement('section');
    mainMenuButtonsContainer.classList.add('l-content__container');

    const mainMenuPlayButton = document.createElement('button');
    mainMenuPlayButton.classList.add('c-btn');
    mainMenuPlayButton.textContent = 'Play';

    const mainMenuHighScoresButton = document.createElement('button');
    mainMenuHighScoresButton.classList.add('c-btn');
    mainMenuHighScoresButton.textContent = 'High scores';

    const mainMenuSettingsButton = document.createElement('button');
    mainMenuSettingsButton.classList.add('c-btn');
    mainMenuSettingsButton.textContent = 'Settings';

    const mainMenuHelpButton = document.createElement('button');
    mainMenuHelpButton.classList.add('c-btn');
    mainMenuHelpButton.textContent = 'Help';

    mainMenu.appendChild(mainMenuTitle);

    mainMenuButtonsContainer.appendChild(mainMenuPlayButton);
    mainMenuButtonsContainer.appendChild(mainMenuHighScoresButton);
    mainMenuButtonsContainer.appendChild(mainMenuSettingsButton);
    mainMenuButtonsContainer.appendChild(mainMenuHelpButton);

    mainMenu.appendChild(mainMenuButtonsContainer);

    return {
        node: mainMenu,
        playButton: mainMenuPlayButton,
        highScoresButton: mainMenuHighScoresButton,
        settingsButton: mainMenuSettingsButton,
        helpButton: mainMenuHelpButton,
    };
};

export default createMarkup;
