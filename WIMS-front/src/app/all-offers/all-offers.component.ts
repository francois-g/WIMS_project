import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Services} from '@angular/core/src/view';
import {PricetowinService} from '../Services/pricetowin.service';
import {Observable} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';
import {forEach} from '@angular/router/src/utils/collection';
import {AuctionService} from '../Services/auction.service';
import {Auction} from '../Observables/Auction';
import {GameService} from '../Services/game.service';

@Component({
    selector: 'app-all-offers',
    templateUrl: './all-offers.component.html',
    styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent implements OnInit {

    submittedNewEnchere;
    offers;
    games;
    auctions;
    tableAuctions = [];
    Id;
    encherir = false;
    NomDuJeu;
    ImageDuJeu;

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
    constructor(private builder: FormBuilder, private Offers: PricetowinService, private Games: GameService, private Auctions: AuctionService) {
        this.formNewAuction = this.builder.group({
            'newEnchere': ['', [
                Validators.required,
            ]],
        });
    }

    ngOnInit() {
        this.offers = this.Offers.getOffers();
        this.games = this.Games.getGames();
        this.auctions = this.Auctions.getAuctions();
        for (let i = 0; i < this.auctions.length; i++) {
            for (let j = 0; j < this.games.length; j++) {
                if (this.offers[i].GameId === this.games[j].Id) {
                    this.NomDuJeu = this.games[j].GameName;
                    this.ImageDuJeu = this.games[j].GameImg;
                }
            }
            this.tableAuctions[i] = [
                {
                    Id: this.offers[i].Id,
                    TwitcherId: this.offers[i].TwitcherId,
                    GameId: this.offers[i].GameId,
                    GameName: this.NomDuJeu,
                    Img: this.ImageDuJeu,
                }
            ];
        }

        console.log(this.tableAuctions);
    }

    Encherir(value) {
        this.encherir = value;
        console.log(this.tableAuctions);
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
