export class PriceToWin {
    constructor (
        private _id: number,
        private _twitcherId: number,
        private _currentBestAuction: number,
        private _offerEnd: string,
        private _gameId: number,
        private _auctionStartValue: number,
        private _active: boolean
    ) {}

    get Id(): number {
        return this._id;
    }

    set Id(value: number) {
        this._id = value;
    }

    get TwitcherId(): number {
        return this._twitcherId;
    }

    set TwitcherId(value: number) {
        this._twitcherId = value;
    }

    get CurrentBestAuction(): number {
        return this._currentBestAuction;
    }

    set CurrentBestAuction(value: number) {
        this._currentBestAuction = value;
    }

    get OfferEnd(): string {
        return this._offerEnd;
    }

    set OfferEnd(value: string) {
        this._offerEnd = value;
    }

    get GameId(): number {
        return this._gameId;
    }

    set GameId(value: number) {
        this._gameId = value;
    }

    get AuctionStartValue(): number {
        return this._auctionStartValue;
    }

    set AuctionStartValue(value: number) {
        this._auctionStartValue = value;
    }

    get Active(): boolean {
        return this._active;
    }

    set Active(value: boolean) {
        this._active = value;
    }
}
