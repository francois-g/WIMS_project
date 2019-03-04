import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Services} from '@angular/core/src/view';
import {PricetowinService} from '../Services/pricetowin.service';
import {Observable} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';

@Component({
    selector: 'app-all-offers',
    templateUrl: './all-offers.component.html',
    styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent implements OnInit {
    submittedNewEnchere;
    actualPrice = 15;
    enchereId;

    private _price$: Observable<PriceToWin[]>;
    private _price: PriceToWin[];


    private _formNewEnchere: FormGroup;

    get formNewEnchere(): FormGroup{
        return this._formNewEnchere;
    }
    set formNewEnchere(value: FormGroup) {
        this._formNewEnchere = value;
    }
    private _outputNewEnchere: {
        newEnchere: number,
    };
    get outputNewEnchere(): { newEnchere: number } {
        return this._outputNewEnchere;
    }
    set outputNewEnchere(value: { newEnchere: number }) {
        this._outputNewEnchere = value;
    }

    get price(): PriceToWin[] {
        return this._price;
    }

    set price(value: PriceToWin[]) {
        this._price = value;
    }

    constructor(private builder: FormBuilder, private pricesToWin: PricetowinService) {
        this.formNewEnchere = this.builder.group({
            'newEnchere': ['', [
                Validators.required,
            ]],
        });
    }

    ngOnInit() {
        this._price$ = this.pricesToWin.getAll();
        this._price$.subscribe(
            p => {
                console.log(p + 'FG');
                this.price = p;
            },
            (err) => {
                console.log('erreur' + err);
            }
        );

    }
    Encherir(value) {
        this.enchereId = value;
    }

    onSubmitNewEnchere() {

        if(this.formNewEnchere.valid) {
            this.submittedNewEnchere = true;
        }
        // stop here if form is invalid
        else{
            this.submittedNewEnchere = false;
        }
    }
}
