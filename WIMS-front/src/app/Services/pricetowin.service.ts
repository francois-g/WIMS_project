import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';
import {HttpClient} from '@angular/common/http';
import {User} from '../Observables/User';


@Injectable({
  providedIn: 'root'
})
export class PricetowinService {
    // Offers = [
    //     {
    //         Id: 1,
    //         TwitcherId: 1,
    //         OfferEnd: '05/05/2019',
    //         GameId: 1,
    //         Description: 'Viens jouer 2 heures avec moi vendredi de 20 à 22h',
    //         AuctionStartValue: 150,
    //         Active: 1,
    //     },
    //     {
    //         Id: 2,
    //         TwitcherId: 2,
    //         OfferEnd: '05/05/2019',
    //         GameId: 2,
    //         Description: 'Viens jouer 2 heures avec moi vendredi de 20 à 22h',
    //         AuctionStartValue: 100,
    //         Active: 1,
    //     },
    //     {
    //         Id: 3,
    //         TwitcherId: 3,
    //         OfferEnd: '05/05/2019',
    //         GameId: 3,
    //         Description: 'Viens jouer 2 heures avec moi vendredi de 20 à 22h',
    //         AuctionStartValue: 300,
    //         Active: 1,
    //     },
    //     {
    //         Id: 4,
    //         TwitcherId: 4,
    //         OfferEnd: '05/05/2019',
    //         GameId: 4,
    //         Description: 'Viens jouer 2 heures avec moi vendredi de 20 à 22h',
    //         AuctionStartValue: 100,
    //         Active: 1,
    //     },
    //     {
    //         Id: 5,
    //         TwitcherId: 1,
    //         OfferEnd: '05/05/2019',
    //         GameId: 2,
    //         Description: 'Viens jouer 2 heures avec moi vendredi de 20 à 22h',
    //         AuctionStartValue: 200,
    //         Active: 1,
    //     },
    // ];

    private _url = 'http://localhost:50946/api/pricetowin';
    // private _url = 'http://mini.techni.local/badges';


    get url(): string {
        return this._url;
    }

    constructor(private _httpClient: HttpClient) {
    }

    getAll(): Observable<PriceToWin[]> {
        return this._httpClient.get<PriceToWin[]>(this.url);
    }

    getById(value: number): Observable<PriceToWin[]> {
        return this._httpClient.get<PriceToWin[]>(this.url + '/' + value);
    }

    insert(value: object): Observable<PriceToWin> {
        return this._httpClient.post<PriceToWin>(this.url, value);
    }
    orderBy(value: string): Observable<PriceToWin[]> {
        return this._httpClient.get<PriceToWin[]>(this.url + '/group/' + value);
    }


    //
    // getOffers() {
    //     return this.Offers;
    // }

}
