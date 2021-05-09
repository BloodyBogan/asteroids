import Input from '../../constructors/Input';

import { EStates, EKeyNames, EImageNames, EAudioNames } from '../enums';

export interface IState {
    name: EStates;
    activate: () => void;
    deactivate: () => void;
    update?: (timeStamp: number) => void;
    render?: () => void;
}

export interface IStates {
    [EStates.MainMenu]: IState;
    [EStates.HighScores]: IState;
    [EStates.Settings]: IState;
    [EStates.Help]: IState;
    [EStates.Play]: IState;
    [EStates.Pause]: IState;
    [EStates.EndGame]: IState;
}

export interface IKey {
    name: EKeyNames;
    input: Input;
    keyCode: number;
}

export interface IImageAsset {
    name: EImageNames;
    image: HTMLImageElement;
}

export interface IAudioAsset {
    name: EAudioNames;
    audio: HTMLAudioElement;
}

export interface IScore {
    rank: number;
    score: number;
    [key: string]: number;
}

export interface ISettings {
    showMobileControls: boolean;
    muted: boolean;
    [key: string]: boolean;
}
