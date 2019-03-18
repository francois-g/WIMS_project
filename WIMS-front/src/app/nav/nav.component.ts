import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {PricetowinService} from '../Services/pricetowin.service';
import {PriceToWin} from '../Observables/PriceToWin';
import {DataService} from '../Services/data.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    private _searchIsOpen: boolean;
    private _inputText: string;
    private _offersQueried: PriceToWin[];
    private _offersQueried$: Observable<PriceToWin[]>;

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

    get offersQueried(): PriceToWin[] {
        return this._offersQueried;
    }

    set offersQueried(value: PriceToWin[]) {
        this._offersQueried = value;
    }

    get offersQueried$(): Observable<PriceToWin[]> {
        return this._offersQueried$;
    }

    set offersQueried$(value: Observable<PriceToWin[]>) {
        this._offersQueried$ = value;
    }


    constructor(private Offers: PricetowinService, private data: DataService) { }

    ngOnInit() {
        this.searchIsOpen = false;
    }

    openSearchBar() {
        this._offersQueried$ = this.Offers.getAll();
        this._offersQueried$.subscribe(
            tab => {
                this.offersQueried = tab;
            },
            (err) => {
                console.log('erreur ' + err);
            }
        );
        this.searchIsOpen = true;
    }

    searchQuery() {
        this.inputText = ((document.getElementById('search-input') as HTMLInputElement).value);
        console.log(this.inputText);
        const result = this.offersQueried.filter(o => o.Twitcher.Pseudo.includes(this.inputText));
        result.forEach(i => {
            console.log(i.Twitcher.Pseudo);
        });
        console.log(result);
        this.data.changeOffers(result);
    }
}
