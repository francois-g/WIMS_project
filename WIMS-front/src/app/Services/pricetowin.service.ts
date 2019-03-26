import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PricetowinService {

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
        return this._httpClient.post<PriceToWin>(this.url, value, { headers : new HttpHeaders().append('Authorization', 'Bearer ' + sessionStorage.getItem('currentUser'))}
        );
    }

    orderBy(value: string): Observable<PriceToWin[]> {
        return this._httpClient.get<PriceToWin[]>(this.url + '/order/' + value);
    }


    //
    // getOffers() {
    //     return this.Offers;
    // }

}
