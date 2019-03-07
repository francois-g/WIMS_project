import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../Observables/User';



@Injectable({
    providedIn: 'root'
})
export class UserService {
<<<<<<< HEAD
<<<<<<< HEAD

  private _url = 'http://localhost:50946/api/user';
  // private _url = 'http://mini.techni.local/badges';

=======
=======

>>>>>>> a88fc40a863289e4577dc4636eec791cd87aaec6
  private _url = 'http://localhost:50946/api/user';
  // private _url = 'http://mini.techni.local/badges';
>>>>>>> 600d07b3e45184bc859de6eb24b192aaa2011ecd


    get url(): string {
        return this._url;
    }

  constructor(private _httpClient: HttpClient) {
  }
  getAll(): Observable<User[]> {
    return this._httpClient.get<User[]>(this.url);
  }
  insert(value: object): Observable<User> {
      return this._httpClient.post<User>(this.url, value);
  }
}
