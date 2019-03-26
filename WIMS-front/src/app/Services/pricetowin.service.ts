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

    private header = new HttpHeaders().append('Authorization', 'Bearer ' + sessionStorage.getItem('currentUser'));

    get url(): string {
        return this._url;
    }

    constructor(private _httpClient: HttpClient) {
    }

    getAll(): Observable<PriceToWin[]> {
        return this._httpClient.get<PriceToWin[]>(this.url, { headers : this.header });
    }

    getById(value: number): Observable<PriceToWin[]> {
        return this._httpClient.get<PriceToWin[]>(this.url + '/' + value, { headers : this.header });
    }

    insert(value: object): Observable<PriceToWin> {
        // return this._httpClient.post<PriceToWin>(this.url, value, { headers : new HttpHeaders().append('Authorization', 'Bearer ' + sessionStorage.getItem('currentUser'))}
        return this._httpClient.post<PriceToWin>(this.url, value, { headers : this.header });
    }

    orderBy(value: string): Observable<PriceToWin[]> {
        return this._httpClient.get<PriceToWin[]>(this.url + '/order/' + value, { headers : this.header });
    }


    //
    // getOffers() {
    //     return this.Offers;
    // }

}
