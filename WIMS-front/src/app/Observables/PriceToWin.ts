import {Game} from './Game';

export class PriceToWin {

    get Id(): number {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
    }

    get TwitcherId(): number {
        return this.twitcherId;
    }

    set TwitcherId(value: number) {
        this.twitcherId = value;
    }

    get OfferEnd(): string {
        return this.offerEnd;
    }

    set OfferEnd(value: string) {
        this.offerEnd = value;
    }

    get Game(): Game {
        return this.offerGame;
    }

    set Game(value: Game) {
        this.offerGame = value;
    }

    // get GameId(): number {
    //     return this._GameId;
    // }
    //
    // set GameId(value: number) {
    //     this._GameId = value;
    // }

    get AuctionStartValue(): number {
        return this.auctionStartValue;
    }

    set AuctionStartValue(value: number) {
        this.auctionStartValue = value;
    }

    get Description(): string {
        return this.description;
    }

    set Description(value: string) {
        this.description = value;
    }

    get Active(): boolean {
        return this.active;
    }

    set Active(value: boolean) {
        this.active = value;
    }
    private id: number;
    private twitcherId: number;
    private active: boolean;
    constructor(

       private offerEnd: string,
       private offerGame: Game,
       // private _GameId: number,
       private auctionStartValue: number,
       private description: string,

    ) {}
}
