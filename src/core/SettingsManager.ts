import { LOCAL_STORAGE } from '../config';

import { getItem, setItem } from '../utils';

import { ISettings } from '../typescript/interfaces';

class SettingsManager {
    private _showMobileControls = false;
    private _muted = false;

    public initialize = () => {
        if (!getItem(LOCAL_STORAGE.settingsName)) {
            this.saveSettings();
        } else {
            const { showMobileControls, muted } = getItem(LOCAL_STORAGE.settingsName) as ISettings;

            this._showMobileControls = showMobileControls;
            this._muted = muted;
        }
    };

    private saveSettings = () => {
        const settings: ISettings = {
            showMobileControls: this._showMobileControls,
            muted: this._muted,
        };

        setItem(LOCAL_STORAGE.settingsName, settings);
    };

    public getShowMobileControls = (): boolean => this._showMobileControls;

    public setShowMobileControls = (showMobileControls: boolean) => {
        this._showMobileControls = showMobileControls;

        this.saveSettings();
    };

    public setMuted = (muted: boolean) => {
        this._muted = muted;

        this.saveSettings();
    };

    public getMuted = (): boolean => this._muted;
}

export default new SettingsManager();
