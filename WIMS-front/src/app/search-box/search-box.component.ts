import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

    private _filled: boolean;

    get filled(): boolean {
        return this._filled;
    }

    set filled(value: boolean) {
        this._filled = value;
    }

    constructor() { }

    ngOnInit() {
    }


}
