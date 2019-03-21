import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../Observables/User';
import {tokenKey} from '@angular/core/src/view';
import {Encoding} from 'tslint/lib/utils';



@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _url = 'http://localhost:50946/api/user';
    // private _url = 'http://mini.techni.local/badges';
    private _token: {

    };

    get url(): string {
        return this._url;
    }

    get token(): object {
        return this._token;
    }

    set token(value: object) {
        this._token = value;
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

    check(value1: string, value2: string): Observable<boolean> {
        return this._httpClient.get<boolean>(this.url + '/usercheck/' + value1 + '/' + value2);
    }

    getToken(value1: string, value2: string): Observable<string> {
        console.log('service' , [value1, value2]);
        return this._httpClient.post<string>(this.url + '/token/' , value1 + '/' + value2, {headers: {   "Accept": "application/json",

                "Content-Type": "application/x-www-form-urlencoded"}} );

    }

    update(value: User): Observable<User> {
        return this._httpClient.put<User>(this.url + '/' + 1, value);
    }
    getByPseudo(value: string): Observable<User[]> {
        return this._httpClient.get<User[]>(this.url + '/login/' + value);
    }
}
