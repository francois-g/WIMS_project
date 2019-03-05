import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';

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

  getById(value: object): Observable<PriceToWin> {
      return this._httpClient.get<PriceToWin>(this.url + '/' + value);
  }
}
