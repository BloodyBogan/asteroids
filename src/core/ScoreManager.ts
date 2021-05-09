import { SCORE, LOCAL_STORAGE } from '../config';

import { getItem, setItem } from '../utils';

import { IScore } from '../typescript/interfaces';

class ScoreManager {
    private _score = 0;

    private readonly _increaseAmount = SCORE.increaseAmount;
    private readonly _bonusAmount = SCORE.maxBonusAmount;

    public initialize = (): void => {
        if (!getItem(LOCAL_STORAGE.highScoresName)) {
            this.resetHighScores();
        }
    };

    public increaseScore = (bonus?: boolean, scoreMultiplier?: number): void => {
        bonus = bonus ?? false;
        scoreMultiplier = scoreMultiplier ?? 1;

        if (bonus) {
            this._score += this._bonusAmount * scoreMultiplier;

            return;
        }

        this._score += this._increaseAmount;
    };

    public updateHighScores = (newScore?: number, highScores?: IScore[], didHighScoresChange?: boolean): void => {
        this.initialize();

        newScore = newScore ?? Math.floor(this._score);
        highScores = highScores ?? (getItem(LOCAL_STORAGE.highScoresName) as IScore[]);
        didHighScoresChange = didHighScoresChange ?? false;

        for (const score of highScores) {
            if (score.score < newScore) {
                const oldScore = score.score;

                score.score = newScore;

                didHighScoresChange = true;

                return this.updateHighScores(oldScore, highScores, didHighScoresChange);
            }
        }

        if (didHighScoresChange) {
            setItem(LOCAL_STORAGE.highScoresName, highScores);
        }
    };

    public resetHighScores = (): void => {
        let highScores: IScore[] = [];

        for (let i = 0; i < SCORE.numberOfHighScores; i++) {
            highScores = [...highScores, { rank: highScores.length + 1, score: 0 }];
        }

        setItem(LOCAL_STORAGE.highScoresName, highScores);
    };

    public getHighScores = (): IScore[] => {
        this.initialize();

        return getItem(LOCAL_STORAGE.highScoresName) as IScore[];
    };

    public resetScore = (): void => {
        this._score = 0;
    };

    public getScore = (): number => Math.floor(this._score);
}

export default new ScoreManager();
