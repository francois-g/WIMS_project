export class Auction {
    get Id(): number {
        return this._Id;
    }

    set Id(value: number) {
        this._Id = value;
    }

    get UserId(): number {
        return this._UserId;
    }

    set UserId(value: number) {
        this._UserId = value;
    }

    get MinAuction(): number {
        return this._MinAuction;
    }

    set MinAuction(value: number) {
        this._MinAuction = value;
    }

    get MaxAuction(): number {
        return this._MaxAuction;
    }

    set MaxAuction(value: number) {
        this._MaxAuction = value;
    }

    get CurrentAuction(): number {
        return this._CurrentAuction;
    }

    set CurrentAuction(value: number) {
        this._CurrentAuction = value;
    }

    get AuctionDate(): string {
        return this._AuctionDate;
    }

    set AuctionDate(value: string) {
        this._AuctionDate = value;
    }

    get AuctionValidation(): boolean {
        return this._AuctionValidation;
    }

    set AuctionValidation(value: boolean) {
        this._AuctionValidation = value;
    }

    get IdPrice(): number {
        return this._IdPrice;
    }

    set IdPrice(value: number) {
        this._IdPrice = value;
    }
    private _MinAuction: number;
    private _MaxAuction: number;
    constructor(
        private _Id: number,
        private _UserId: number,
        private _CurrentAuction: number,
        private _AuctionDate: string,
        private _AuctionValidation: boolean,
        private _IdPrice: number,
    ) {}

}
