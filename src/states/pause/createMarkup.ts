const createMarkup = () => {
    const pause = document.createElement('section');
    pause.classList.add('l-content');

    const pauseTitle = document.createElement('h1');
    pauseTitle.classList.add('l-content__title');
    pauseTitle.textContent = 'Paused';

    const pauseButtonsContainer = document.createElement('section');
    pauseButtonsContainer.classList.add('l-content__container');

    const pauseResumeButton = document.createElement('button');
    pauseResumeButton.classList.add('c-btn');
    pauseResumeButton.textContent = 'Resume';

    const pauseQuitGameButton = document.createElement('button');
    pauseQuitGameButton.classList.add('c-btn');
    pauseQuitGameButton.textContent = 'Quit game';

    const pauseCheckboxesContainer = document.createElement('section');
    pauseCheckboxesContainer.classList.add('l-content__container');

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

    const settingsBackToMainMenuButton = document.createElement('button');
    settingsBackToMainMenuButton.classList.add('c-btn');
    settingsBackToMainMenuButton.textContent = 'Back to Main Menu';

    pause.appendChild(pauseTitle);

    pauseButtonsContainer.appendChild(pauseResumeButton);
    pauseButtonsContainer.appendChild(pauseQuitGameButton);

    pause.appendChild(pauseButtonsContainer);

    mobileControlsCheckboxInputContainer.appendChild(mobileControlsCheckboxInput);
    mobileControlsCheckboxInputContainer.appendChild(mobileControlsCheckboxControl);

    mobileControlsCheckbox.appendChild(mobileControlsCheckboxInputContainer);
    mobileControlsCheckbox.appendChild(mobileControlsCheckboxLabel);

    muteCheckboxInputContainer.appendChild(muteCheckboxInput);
    muteCheckboxInputContainer.appendChild(muteCheckboxControl);

    muteCheckbox.appendChild(muteCheckboxInputContainer);
    muteCheckbox.appendChild(muteCheckboxLabel);

    pauseCheckboxesContainer.appendChild(mobileControlsCheckbox);
    pauseCheckboxesContainer.appendChild(muteCheckbox);

    pause.appendChild(pauseCheckboxesContainer);

    return {
        pause,
        mobileControlsCheckbox,
        muteCheckbox,
        mobileControlsCheckboxInput,
        muteCheckboxInput,
        resumeButton: pauseResumeButton,
        quitGameButton: pauseQuitGameButton,
    };
};

export default createMarkup;
