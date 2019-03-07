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
    offers;
    encherir = false;

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

    constructor(private builder: FormBuilder, private Offers: PricetowinService) {
        this.formNewAuction = this.builder.group({
            'newEnchere': ['', [
                Validators.required,
            ]],
        });
    }

    ngOnInit() {
        this.offers = this.Offers.getOffers();
    }
<<<<<<< HEAD
=======

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

    // getOffer(value) {
    //     this._price$ = this.pricesToWin.getById(value);
    //     console.log(value);
    //     this._price$.subscribe(
    //         pp => {
    //             console.log(pp);
    //             // this.price = p;
    //         },
    //         (err) => {
    //             console.log(err + ' error');
    //         }
    //     );
    //     // this.price.forEach(prop => {
    //     //     console.log(prop);
    //     // });
    // }

>>>>>>> 465fe86137d413104dd0624302ad13a04a0655d8
    Encherir(value) {
        this.encherir = value;
    }
    onSubmitNewEnchere() {

        if (this.formNewAuction.valid) {
            this.submittedNewEnchere = true;
        }
        // stop here if form is invalid
        else {
            this.submittedNewEnchere = false;
        }
    }
}
