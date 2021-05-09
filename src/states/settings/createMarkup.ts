const createMarkup = () => {
    const settings = document.createElement('section');
    settings.classList.add('l-content');

    const settingsTitle = document.createElement('h1');
    settingsTitle.classList.add('l-content__title');
    settingsTitle.textContent = 'Settings';

    const settingsCheckboxesContainer = document.createElement('section');
    settingsCheckboxesContainer.classList.add('l-content__container');

    const mobileControlsCheckbox = document.createElement('label');
    mobileControlsCheckbox.classList.add('c-checkbox');
    mobileControlsCheckbox.tabIndex = 0;

    const mobileControlsCheckboxInputContainer = document.createElement('span');
    mobileControlsCheckboxInputContainer.classList.add('c-checkbox__container');

    const mobileControlsCheckboxInput = document.createElement('input');
    mobileControlsCheckboxInput.classList.add('c-checkbox__container-input');
    mobileControlsCheckboxInput.type = 'checkbox';
    mobileControlsCheckboxInput.tabIndex = -1;

    const mobileControlsCheckboxControl = document.createElement('span');
    mobileControlsCheckboxControl.classList.add('c-checkbox__container-control');

    const mobileControlsCheckboxLabel = document.createElement('span');
    mobileControlsCheckboxLabel.classList.add('c-checkbox__label');
    mobileControlsCheckboxLabel.textContent = 'Mobile controls';

    const muteCheckbox = document.createElement('label');
    muteCheckbox.classList.add('c-checkbox');
    muteCheckbox.tabIndex = 0;

    const muteCheckboxInputContainer = document.createElement('span');
    muteCheckboxInputContainer.classList.add('c-checkbox__container');

    const muteCheckboxInput = document.createElement('input');
    muteCheckboxInput.classList.add('c-checkbox__container-input');
    muteCheckboxInput.type = 'checkbox';
    muteCheckboxInput.tabIndex = -1;

    const muteCheckboxControl = document.createElement('span');
    muteCheckboxControl.classList.add('c-checkbox__container-control');

    const muteCheckboxLabel = document.createElement('span');
    muteCheckboxLabel.classList.add('c-checkbox__label');
    muteCheckboxLabel.textContent = 'Mute';

    const settingsButtonsContainer = document.createElement('section');
    settingsButtonsContainer.classList.add('l-content__container');

    const settingsResetHighScoresButton = document.createElement('button');
    settingsResetHighScoresButton.classList.add('c-btn');
    settingsResetHighScoresButton.textContent = 'Reset high scores';

    const settingsBackToMainMenuButton = document.createElement('button');
    settingsBackToMainMenuButton.classList.add('c-btn');
    settingsBackToMainMenuButton.textContent = 'Back to Main Menu';

    settings.appendChild(settingsTitle);

    mobileControlsCheckboxInputContainer.appendChild(mobileControlsCheckboxInput);
    mobileControlsCheckboxInputContainer.appendChild(mobileControlsCheckboxControl);

    mobileControlsCheckbox.appendChild(mobileControlsCheckboxInputContainer);
    mobileControlsCheckbox.appendChild(mobileControlsCheckboxLabel);

    muteCheckboxInputContainer.appendChild(muteCheckboxInput);
    muteCheckboxInputContainer.appendChild(muteCheckboxControl);

    muteCheckbox.appendChild(muteCheckboxInputContainer);
    muteCheckbox.appendChild(muteCheckboxLabel);

    settingsCheckboxesContainer.appendChild(mobileControlsCheckbox);
    settingsCheckboxesContainer.appendChild(muteCheckbox);

    settingsButtonsContainer.appendChild(settingsResetHighScoresButton);

    settings.appendChild(settingsCheckboxesContainer);
    settings.appendChild(settingsButtonsContainer);
    settings.appendChild(settingsBackToMainMenuButton);

    return {
        node: settings,
        mobileControlsCheckbox,
        muteCheckbox,
        mobileControlsCheckboxInput,
        muteCheckboxInput,
        resetHighScoresButton: settingsResetHighScoresButton,
        backToMainMenuButton: settingsBackToMainMenuButton,
    };
};

export default createMarkup;
