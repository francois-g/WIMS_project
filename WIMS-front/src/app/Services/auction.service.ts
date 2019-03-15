import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../Observables/Game';
import {Auction} from '../Observables/Auction';


@Injectable({
    providedIn: 'root'
})
export class AuctionService {
    // Auctions = [
    //     {
    //         Id: 1,
    //         UserId: 1,
    //         CurrentAuction: 300,
    //         AuctionDate: '07/03/2019',
    //         AuctionValidation: true,
    //         OfferId: 1,
    //     },
    //     {
    //         Id: 2,
    //         UserId: 1,
    //         CurrentAuction: 600,
    //         AuctionDate: '07/03/2019',
    //         AuctionValidation: true,
    //         OfferId: 4,
    //     },
    //     {
    //         Id: 3,
    //         UserId: 2,
    //         CurrentAuction: 500,
    //         AuctionDate: '07/03/2019',
    //         AuctionValidation: true,
    //         OfferId: 3,
    //     },
    //     {
    //         Id: 4,
    //         UserId: 2,
    //         CurrentAuction: 500,
    //         AuctionDate: '07/03/2019',
    //         AuctionValidation: true,
    //         OfferId: 4,
    //     },
    //     {
    //         Id: 5,
    //         UserId: 2,
    //         CurrentAuction: 500,
    //         AuctionDate: '07/03/2019',
    //         AuctionValidation: true,
    //         OfferId: 2,
    //     },
    // ];
    // getAuctions() {
    //     return this.Auctions;
    // }
    private _url = 'http://localhost:50946/api/auction';
    // private _url = 'http://mini.techni.local/badges';


    get url(): string {
        return this._url;
    }

    constructor(private _httpClient: HttpClient) {
    }

    getAll(): Observable<Auction[]> {
        return this._httpClient.get<Auction[]>(this.url);
    }

    getById(value: number): Observable<Auction[]> {
        return this._httpClient.get<Auction[]>(this.url + '/' + value);
    }

    insert(value: object): Observable<Auction[]> {
        return this._httpClient.post<Auction[]>(this.url, value);
    }
}
