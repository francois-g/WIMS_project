import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Services} from '@angular/core/src/view';
import {PricetowinService} from '../Services/pricetowin.service';
import {Observable} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';
import {forEach} from '@angular/router/src/utils/collection';
import {AuctionService} from '../Services/auction.service';
import {Auction} from '../Observables/Auction';

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
    private _bestAuction$: Observable<Auction[]>;
    private _bestAuction: Auction[];

    private _formNewAuction: FormGroup;

    get formNewAuction(): FormGroup {
        return this._formNewAuction;
    }
    set formNewAuction(value: FormGroup) {
        this._formNewAuction = value;
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

    get bestAuction$(): Observable<Auction[]> {
        return this._bestAuction$;
    }

    set bestAuction$(value: Observable<Auction[]>) {
        this._bestAuction$ = value;
    }

    get bestAuction(): Auction[] {
        return this._bestAuction;
    }

    set bestAuction(value: Auction[]) {
        this._bestAuction = value;
    }

    constructor(private builder: FormBuilder, private pricesToWin: PricetowinService, private bestAuctionOfPrice: AuctionService) {
        this.formNewAuction = this.builder.group({
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
                console.log(this.price);
            },
            (err) => {
                console.log('erreur' + err);
            }
        );
    }

    // getBestAuctionOfPrice(value) {
    //     this._bestAuction$ = this.bestAuctionOfPrice.getById(value);
    //     this._bestAuction$.subscribe(
    //         b => {
    //             console.log(b);
    //         },
    //         (err) => {
    //             console.log('error ' + err);
    //         }
    //     );
    // }

    getOffer(value) {
        this._price$ = this.pricesToWin.getById(value);
        console.log(value);
        this._price$.subscribe(
            pp => {
                console.log(pp);
                // this.price = p;
            },
            (err) => {
                console.log(err + ' error');
            }
        );
        // this.price.forEach(prop => {
        //     console.log(prop);
        // });
    }

    Encherir(value) {
        this.enchereId = value;
    }

    onSubmitNewEnchere() {

        if(this.formNewAuction.valid) {
            this.submittedNewEnchere = true;
        }
        // stop here if form is invalid
        else{
            this.submittedNewEnchere = false;
        }
    }
}
