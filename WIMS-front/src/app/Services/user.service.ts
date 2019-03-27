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

    private header = new HttpHeaders().append('Authorization', 'Bearer ' + sessionStorage.getItem('currentUser'));
    private headerPost = new HttpHeaders().append('Authorization', '');

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
        return this._httpClient.get<User[]>(this.url, { headers : this.header });
    }

    getById(value: number): Observable<User> {
        // return this._httpClient.get<User>(this.url + '/' + value, { headers : this.header });
        return this._httpClient.get<User>(this.url + '/' + value, { headers : this.header });
    }

    insert(value: object): Observable<User> {
        return this._httpClient.post<User>(this.url, value, { headers : this.headerPost });
    }

    check(value: User): Observable<boolean> {
        return this._httpClient.post<boolean>(this.url + '/usercheck', value, { headers : this.header });
    }

    getToken(value: object): Observable<string> {
        return this._httpClient.post<string>(this.url + '/token', value, { headers : this.header });
    }

    update(id: number, value: User): Observable<User> {
        return this._httpClient.put<User>(this.url + '/' + id, value, { headers : this.header });
    }

    getBalance(value: number): Observable<number> {
        return this._httpClient.get<number>(this.url + '/balance/' + value, { headers : this.header });
    }

    getByPseudo(value: string): Observable<User[]> {
            return this._httpClient.get<User[]>(this.url + '/login/' + value, { headers : this.header });
    }
}
