const createMarkup = () => {
    const play = document.createElement('section');
    play.classList.add('b-play');

    const playCanvasContainer = document.createElement('section');
    playCanvasContainer.classList.add('b-play__canvas');

    play.appendChild(playCanvasContainer);

    return {
        play,
        playCanvasContainer,
    };
};

export default createMarkup;
