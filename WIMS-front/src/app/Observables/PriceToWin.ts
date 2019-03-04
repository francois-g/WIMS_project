export class PriceToWin {
    constructor (
        private _id: number,
        private _TwitcherId: number,
        private _CurrentBestAuction: number,
        private _OfferEnd: string,
        private _GameId: number,
        private _AuctionStartValue: number,
        private _Active: number
    ) {}

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get TwitcherId(): number {
        return this._TwitcherId;
    }

    set TwitcherId(value: number) {
        this._TwitcherId = value;
    }

    get CurrentBestAuction(): number {
        return this._CurrentBestAuction;
    }

    set CurrentBestAuction(value: number) {
        this._CurrentBestAuction = value;
    }

    get OfferEnd(): string {
        return this._OfferEnd;
    }

    set OfferEnd(value: string) {
        this._OfferEnd = value;
    }

    get GameId(): number {
        return this._GameId;
    }

    set GameId(value: number) {
        this._GameId = value;
    }

    get AuctionStartValue(): number {
        return this._AuctionStartValue;
    }

    set AuctionStartValue(value: number) {
        this._AuctionStartValue = value;
    }

    get Active(): number {
        return this._Active;
    }

    set Active(value: number) {
        this._Active = value;
    }
}
