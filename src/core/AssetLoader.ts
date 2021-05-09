import { ASSETS } from '../config';

import { EImageNames, EAudioNames } from '../typescript/enums';
import { TWritable, TImageAssets, TAudioAssets } from '../typescript/types';
import { IImageAsset, IAudioAsset } from '../typescript/interfaces';

class AssetLoader {
    private readonly _images = <TWritable<TImageAssets>>{};
    private readonly _audio = <TWritable<TAudioAssets>>{};

    public initialize = async (assets: typeof ASSETS): Promise<void> => {
        await this.loadAudio(assets.audio);
    };

    private loadAudio = ({ path, files }: typeof ASSETS.audio): Promise<void> =>
        new Promise((resolve, reject) => {
            let count = 0;

            files.forEach((file, _, array) => {
                const audio = new Audio();

                audio.addEventListener('canplaythrough', () => {
                    this._audio[file.name] = {
                        name: file.name,
                        audio,
                    };

                    count += 1;

                    if (count === array.length) {
                        resolve();
                    }
                });

                audio.addEventListener('error', err => reject(err));

                audio.src = `${path}${file.fileName}`;
            });
        });

    public getImage = (imageName: EImageNames): IImageAsset => this._images[imageName];

    public getAudio = (audioName: EAudioNames): IAudioAsset => {
        console.log(this._audio[audioName]);

        return this._audio[audioName];
    };

    public get images(): TImageAssets {
        return this._images;
    }

    public get audio(): TAudioAssets {
        return this._audio;
    }
}

export default new AssetLoader();
