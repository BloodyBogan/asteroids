import SettingsManager from './SettingsManager';

import { EAudioNames } from '../typescript/enums';
import { TAudioAssets, TClassMethod } from '../typescript/types';
import { IAudioAsset } from '../typescript/interfaces';

class AudioManager {
    private _audio = <TAudioAssets>{};

    private _muted = false;

    private _idCounter = 0;
    private _currentlyPlaying: { [key: number]: HTMLAudioElement } = {};

    public initialize = (
        audioAssets: TAudioAssets,
        getMuted: TClassMethod<typeof SettingsManager, 'getMuted'>,
    ): void => {
        this._audio = audioAssets;

        this._muted = getMuted();

        if (this._muted) {
            this.mute();
        }
    };

    public play = (audioName: EAudioNames): void => {
        if (this._muted) {
            return;
        }

        const audio = this._audio[audioName].audio;

        const id = this._idCounter++;

        const currentlyPlayingAudio = (this._currentlyPlaying[id] = <HTMLAudioElement>audio.cloneNode(true));
        currentlyPlayingAudio.currentTime = 0;
        currentlyPlayingAudio.play();

        currentlyPlayingAudio.onended = () => {
            delete this._currentlyPlaying[id];
        };
    };

    public isPlaying = (audioName: EAudioNames) => !this._audio[audioName].audio.paused;

    public mute = (): void => {
        this._muted = true;

        for (const audio in this._audio) {
            const key = audio as EAudioNames;

            this._audio[key].audio.muted = this._muted;
        }
    };

    public unmute = (): void => {
        this._muted = false;

        for (const audio in this._audio) {
            const key = audio as EAudioNames;

            this._audio[key].audio.muted = this._muted;
        }
    };

    public resetCurrentlyPlaying = (): void => {
        this._idCounter = 0;
        this._currentlyPlaying = {};
    };

    public get muted(): boolean {
        return this._muted;
    }
}

export default new AudioManager();
