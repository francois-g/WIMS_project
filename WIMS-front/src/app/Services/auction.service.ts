import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AuctionService {
    Auctions = [
        {
            Id: 1,
            UserId: 1,
            CurrentAuction: 300,
            AuctionDate: '07/03/2019',
            AuctionValidation: true,
            OfferId: 1,
        },
        {
            Id: 2,
            UserId: 1,
            CurrentAuction: 600,
            AuctionDate: '07/03/2019',
            AuctionValidation: true,
            OfferId: 4,
        },
        {
            Id: 3,
            UserId: 2,
            CurrentAuction: 500,
            AuctionDate: '07/03/2019',
            AuctionValidation: true,
            OfferId: 3,
        },
    ];
    getAuctions() {
        return this.Auctions;
    }
}
