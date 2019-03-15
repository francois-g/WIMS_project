import {User} from './User';

export class Auction {
    get Id(): number {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
    }

    get User(): User {
        return this.user;
    }

    set User(value: User) {
        this.user = value;
    }

    get MinAuction(): number {
        return this.minAuction;
    }

    set MinAuction(value: number) {
        this.minAuction = value;
    }

    get MaxAuction(): number {
        return this.maxAuction;
    }

    set MaxAuction(value: number) {
        this.maxAuction = value;
    }

    get CurrentAuction(): number {
        return this.currentAuction;
    }

    set CurrentAuction(value: number) {
        this.currentAuction = value;
    }

    get AuctionDate(): string {
        return this.auctionDate;
    }

    set AuctionDate(value: string) {
        this.auctionDate = value;
    }

    get AuctionValidation(): boolean {
        return this.auctionValidation;
    }

    set AuctionValidation(value: boolean) {
        this.auctionValidation = value;
    }

    get IdPrice(): number {
        return this.idPrice;
    }

    set IdPrice(value: number) {
        this.idPrice = value;
    }
    private id: number;
    private minAuction: number;
    private maxAuction: number;
    private auctionDate: string;
    private auctionValidation: boolean;
    constructor(
        private user: User,
        private currentAuction: number,
        private idPrice: number
    ) {}

}
