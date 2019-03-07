export class PriceToWin {
    get Id(): number {
        return this._Id;
    }

    set Id(value: number) {
        this._Id = value;
    }

    get TwitcherId(): number {
        return this._TwitcherId;
    }

    set TwitcherId(value: number) {
        this._TwitcherId = value;
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

    get Description(): string {
        return this._Description;
    }

    set Description(value: string) {
        this._Description = value;
    }

    get Active(): boolean {
        return this._Active;
    }

    set Active(value: boolean) {
        this._Active = value;
    }

    constructor(
       private _Id: number,
       private _TwitcherId: number,
       private _OfferEnd: string,
       private _GameId: number,
       private _AuctionStartValue: number,
       private _Description: string,
       private _Active: boolean,
    ) {}
}
