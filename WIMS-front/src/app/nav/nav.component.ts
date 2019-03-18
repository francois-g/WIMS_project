import { Component, OnInit } from '@angular/core';
import {UserService} from '../Services/user.service';
import {Observable} from 'rxjs';
import {User} from '../Observables/User';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    private _searchIsOpen: boolean;
    private _inputText: string;

    get searchIsOpen(): boolean {
        return this._searchIsOpen;
    }

    set searchIsOpen(value: boolean) {
        this._searchIsOpen = value;
    }

    get inputText(): string {
        return this._inputText;
    }

    set inputText(value: string) {
        this._inputText = value;
    }

    constructor() { }

    ngOnInit() {
        this.searchIsOpen = false;

    }

    openSearchBar() {
        this.searchIsOpen = true;
    }

    searchQuery() {
        this.inputText = ((document.getElementById('search-input') as HTMLInputElement).value);
        console.log(this.inputText);
        
    }
}
