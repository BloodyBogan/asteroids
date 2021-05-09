import { LOCAL_STORAGE } from '../../config/index';

import { EKeyNames, EImageNames, EAudioNames } from '../enums';
import { IKey, IImageAsset, IAudioAsset } from '../interfaces';

export type TComplete<T> = { [P in keyof T]-?: T[P] };

export type TClassMethod<T, M extends keyof T> = T[M] extends (...args: any) => any ? T[M] : never;

export type TWritable<T> = {
    -readonly [K in keyof T]: T[K];
};

export type TValueOfLocalStorage = typeof LOCAL_STORAGE[keyof typeof LOCAL_STORAGE];

export type TKeys = { [key in keyof typeof EKeyNames]: IKey };

export type TImageAssets = { [key in keyof typeof EImageNames]: IImageAsset };

export type TAudioAssets = { [key in keyof typeof EAudioNames]: IAudioAsset };
