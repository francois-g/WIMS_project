import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../Observables/User';



@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _url = 'http://localhost:50946/api/user';
    // private _url = 'http://mini.techni.local/badges';

    get url(): string {
        return this._url;
    }

    constructor(private _httpClient: HttpClient) {
    }

    getAll(): Observable<User[]> {
        return this._httpClient.get<User[]>(this.url);
    }
    getById(value: number): Observable<User> {
        return this._httpClient.get<User>(this.url + '/' + value);
    }
    insert(value: object): Observable<User> {
        return this._httpClient.post<User>(this.url, value);
    }

    check(value: string): any {
        this._httpClient.get<any>(this.url + '/usercheck/' + value);
    }

    update(value: User): Observable<User> {
        return this._httpClient.put<User>(this.url + '/' + 1, value);
    }
    getByPseudo(value: string): Observable<User[]> {
        return this._httpClient.get<User[]>(this.url + '/login/' + value);
    }
}
