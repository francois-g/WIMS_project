import {Game} from './Game';
import {Twitcher} from './Twitcher';

export class PriceToWin {

    private id: number;
    private twitcher: Twitcher;
    private active: boolean;
    private game: Game;
    constructor(

        private offerEnd: string,

        // private _GameId: number,
        private auctionStartValue: number,
        private description: string,

    ) {}
    private restantTotal: any;
    get RestantTotal(): any {
        return this.restantTotal;
    }

    set RestantTotal(value: any) {
        this.restantTotal = value;
    }
    get Id(): number {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
    }

    get Twitcher(): Twitcher {
        return this.twitcher;
    }

    set Twitcher(value: Twitcher) {
        this.twitcher = value;
    }

    get OfferEnd(): string {
        return this.offerEnd;
    }

    set OfferEnd(value: string) {
        this.offerEnd = value;
    }

    get Game(): Game {
        return this.game;
    }

    set Game(value: Game) {
        this.game = value;
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
}
