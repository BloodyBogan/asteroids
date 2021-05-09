import { TValueOfLocalStorage } from '../typescript/types';
import { IScore, ISettings } from '../typescript/interfaces';

export const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180);

export const getRandomNumber = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const mapRangeToRange = (
    value: number,
    inputMin: number,
    inputMax: number,
    outputMin: number,
    outputMax: number,
): number => ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin;

export const setItem = (key: TValueOfLocalStorage, value: IScore[] | ISettings): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: TValueOfLocalStorage): IScore[] | ISettings => {
    const value = window.localStorage.getItem(key);

    return value && JSON.parse(value);
};
