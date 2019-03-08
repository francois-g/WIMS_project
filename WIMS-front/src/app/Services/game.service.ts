import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';
import {Game} from '../Observables/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
    // Games = [
    //     {
    //         Id: 1,
    //         GameName: 'Fortnite',
    //         GameImg: 'FortniteImg',
    //     },
    //     {
    //         Id: 2,
    //         GameName: 'Lol',
    //         GameImg: 'LolImg',
    //     },
    //     {
    //         Id: 3,
    //         GameName: 'Apex',
    //         GameImg: 'ApexImg',
    //     },
    //     {
    //         Id: 4,
    //         GameName: 'Fifa',
    //         GameImg: 'FifaImg',
    //     },
    // ];
    // getGames() {
    //     return this.Games;
    // }
    // getById(Id: number) {
    //     return this.Games[Id].GameImg;
    // }

    private _url = 'http://localhost:50946/api/game';
    // private _url = 'http://mini.techni.local/badges';


    get url(): string {
        return this._url;
    }

    constructor(private _httpClient: HttpClient) {
    }

    getAll(): Observable<Game[]> {
        return this._httpClient.get<Game[]>(this.url);
    }

    getById(value: number): Observable<Game[]> {
        return this._httpClient.get<Game[]>(this.url + '/' + value);
    }

    insert(value: object): Observable<Game> {
        return this._httpClient.post<Game>(this.url, value);
    }
}
