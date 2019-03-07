import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';


@Injectable({
  providedIn: 'root'
})
export class PricetowinService {
    Offers = [

<<<<<<< HEAD
        {
            id: 1,
            twitcherId: 1,
            end: '05/05/2019',
            gameName: 'fortnite',
            gameImg: 'fortniteImg',
            gameDescription: 'Viens jouer 2 heures avec moi vendredi de 20 à 22h',
            start: '01/01/2019',
            value: 100,
        },
        {
            id: 2,
            twitcherId: 2,
            end: '05/05/2019',
            gameName: 'Lol',
            gameImg: 'LolImg',
            gameDescription: 'Viens jouer 2 heures avec moi vendredi de 20 à 22h',
            start: '01/01/2019',
            value: 250,
        },
        {
            id: 3,
            twitcherId: 4,
            end: '05/05/2019',
            gameName: 'Apex',
            gameImg: 'ApexImg',
            gameDescription: 'Viens jouer 2 heures avec moi vendredi de 20 à 22h',
            start: '01/01/2019',
            value: 250,
        },
        {
            id: 4,
            twitcherId: 4,
            end: '05/05/2019',
            gameName: 'Apex',
            gameImg: 'ApexImg',
            gameDescription: 'Viens jouer 2 heures avec moi vendredi de 20 à 22h',
            start: '01/01/2019',
            value: 250,
        },
        {
            id: 3,
            twitcherId: 4,
            end: '05/05/2019',
            gameName: 'Apex',
            gameImg: 'ApexImg',
            gameDescription: 'Viens jouer 2 heures avec moi vendredi de 20 à 22h',
            start: '01/01/2019',
            value: 250,
        },
    ];
    getOffers() {
        return this.Offers;
    }
=======
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
>>>>>>> 465fe86137d413104dd0624302ad13a04a0655d8
}
