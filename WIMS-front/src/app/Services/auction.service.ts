import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../Observables/Game';
import {Auction} from '../Observables/Auction';


@Injectable({
    providedIn: 'root'
})
export class AuctionService {

    private _url = 'http://localhost:50946/api/auction';
    // private _url = 'http://mini.techni.local/badges';

    private header = new HttpHeaders().append('Authorization', 'Bearer ' + sessionStorage.getItem('currentUser'));

    get url(): string {
        return this._url;
    }

    constructor(private _httpClient: HttpClient) {
    }

    getAll(): Observable<Auction[]> {
        return this._httpClient.get<Auction[]>(this.url, { headers : this.header });
    }

    getById(value: number): Observable<Auction[]> {
        return this._httpClient.get<Auction[]>(this.url + '/' + value, { headers : this.header });
    }

    insert(value: object): Observable<Auction[]> {
        return this._httpClient.post<Auction[]>(this.url, value, { headers : this.header });
    }
}
