export class PriceToWin {
    get offerDescription(): string {
        return this._offerDescription;
    }

    set offerDescription(value: string) {
        this._offerDescription = value;
    }
    get gameImg(): string {
        return this._gameImg;
    }

    set gameImg(value: string) {
        this._gameImg = value;
    }
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get twitcherId(): number {
        return this._twitcherId;
    }

    set twitcherId(value: number) {
        this._twitcherId = value;
    }

    get end(): string {
        return this._end;
    }

    set end(value: string) {
        this._end = value;
    }

    get game(): string {
        return this._gameName;
    }

    set game(value: string) {
        this._gameName = value;
    }

    get start(): string {
        return this._start;
    }

    set start(value: string) {
        this._start = value;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }
    constructor(
       private _id: number,
       private _twitcherId: number,
       private _end: string,
       private _gameName: string,
       private _start: string,
       private _value: number,
       private _gameImg: string,
       private _offerDescription: string,
    ) {}
}
