import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';
import {Auction} from '../Observables/Auction';

@Injectable({
    providedIn: 'root'
})
export class AuctionService {
    private _url = 'http://localhost:50946/api/pricetowin';
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
}
