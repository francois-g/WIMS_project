import { Injectable } from '@angular/core';
import {PriceToWin} from '../Observables/PriceToWin';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private _currentPrintedOffers: PriceToWin[];

    constructor() {
        this.currentPrintedOffers = [];
    }

    get currentPrintedOffers(): PriceToWin[] {
        return this._currentPrintedOffers;
    }

    set currentPrintedOffers(value: PriceToWin[]) {
        this._currentPrintedOffers = value;
    }

    changeOffers(value: PriceToWin[]) {
        this._currentPrintedOffers = value;
    }

}
