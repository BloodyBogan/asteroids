const createMarkup = () => {
    const help = document.createElement('section');
    help.classList.add('b-help');

    const helpTitle = document.createElement('h1');
    helpTitle.classList.add('b-help__title');
    helpTitle.textContent = 'Help';

    const helpList = document.createElement('ul');
    helpList.classList.add('b-help__keys');

    const helpListRotateLeftItem = document.createElement('li');

    const helpListRotateLeftItemKey = document.createElement('kbd');
    helpListRotateLeftItemKey.textContent = '<';

    helpListRotateLeftItem.innerHTML += 'Rotate left';

    const helpListRotateRightItem = document.createElement('li');

    const helpListRotateRightItemKey = document.createElement('kbd');
    helpListRotateRightItemKey.textContent = '>';

    helpListRotateRightItem.innerHTML += 'Rotate right';

    const helpListBoostItem = document.createElement('li');

    const helpListBoostItemKey = document.createElement('kbd');
    helpListBoostItemKey.innerHTML = '&uarr;';

    helpListBoostItem.innerHTML += 'Boost';

    const helpListShootItem = document.createElement('li');

    const helpListShootItemKey = document.createElement('kbd');
    helpListShootItemKey.textContent = 'Space / X';

    helpListShootItem.innerHTML += 'Shoot';

    const helpListPauseItem = document.createElement('li');

    const helpListPauseItemKey = document.createElement('kbd');
    helpListPauseItemKey.textContent = 'P / ||';

    helpListPauseItem.innerHTML += 'Pause';

    const helpBackToMainMenuButton = document.createElement('button');
    helpBackToMainMenuButton.classList.add('c-btn');
    helpBackToMainMenuButton.textContent = 'Back to Main Menu';

    help.appendChild(helpTitle);

    helpListRotateLeftItem.appendChild(helpListRotateLeftItemKey);
    helpListRotateRightItem.appendChild(helpListRotateRightItemKey);
    helpListBoostItem.appendChild(helpListBoostItemKey);
    helpListShootItem.appendChild(helpListShootItemKey);
    helpListPauseItem.appendChild(helpListPauseItemKey);

    helpList.appendChild(helpListRotateLeftItem);
    helpList.appendChild(helpListRotateRightItem);
    helpList.appendChild(helpListBoostItem);
    helpList.appendChild(helpListShootItem);
    helpList.appendChild(helpListPauseItem);

    help.appendChild(helpList);
    help.appendChild(helpBackToMainMenuButton);

    return {
        node: help,
        backToMainMenuButton: helpBackToMainMenuButton,
    };
};

export default createMarkup;
