import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';
import {Game} from '../Observables/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

    private _url = 'http://localhost:50946/api/game';
    // private _url = 'http://mini.techni.local/badges';

    private header = new HttpHeaders().append('Authorization', 'Bearer ' + sessionStorage.getItem('currentUser'));

    get url(): string {
        return this._url;
    }

    constructor(private _httpClient: HttpClient) {
    }

    getAll(): Observable<Game[]> {
        return this._httpClient.get<Game[]>(this.url, { headers : this.header });
    }

    getById(value: number): Observable<Game[]> {
        return this._httpClient.get<Game[]>(this.url + '/' + value, { headers : this.header });
    }

    insert(value: object): Observable<Game> {
        return this._httpClient.post<Game>(this.url, value, { headers : this.header });
    }
}
