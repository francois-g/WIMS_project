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
import {User} from '../Observables/User';
import {Game} from '../Observables/Game';

@Component({
    selector: 'app-all-offers',
    templateUrl: './all-offers.component.html',
    styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent implements OnInit {

    submittedNewEnchere;

    private _offer$: Observable<PriceToWin[]>;
    private _offer: PriceToWin[];
    private _game$: Observable<Game[]>;
    private _game: Game[];

    // offers;
    // games;
    // auctions;
    tableAuctions = [];
    Id;
    encherir = false;
    NomDuJeu;
    ImageDuJeu;

    private _formNewAuction: FormGroup;

    get offer$(): Observable<PriceToWin[]> {
        return this._offer$;
    }

    set offer$(value: Observable<PriceToWin[]>) {
        this._offer$ = value;
    }

    get offer(): PriceToWin[] {
        return this._offer;
    }

    set offer(value: PriceToWin[]) {
        this._offer = value;
    }

    get game$(): Observable<Game[]> {
        return this._game$;
    }

    set game$(value: Observable<Game[]>) {
        this._game$ = value;
    }

    get game(): Game[] {
        return this._game;
    }

    set game(value: Game[]) {
        this._game = value;
    }

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
        this._offer$ = this.Offers.getAll();
        this._offer$.subscribe(
            o => {
                console.log(this.offer);
                this.offer = o;
                console.log(o);
            },
            (err) => {
                console.log('erreur' + err);
            }
        );
        console.log(this.Offers);
    }

    getGameName(value: number) {
        this._game$ = this.Games.getById(value);
        this._game$.subscribe(
            g => {
                console.log(this.game);
                this.game = g;
                console.log(g);
            },
            (err) => {
                console.log('erreur ' + err);
            }
        );
    }

    // ngOnInit() {
    //     this.offers = this.Offers.getOffers();
    //     this.games = this.Games.getGames();
    //     this.auctions = this.Auctions.getAuctions();
    //     for (let i = 0; i < this.auctions.length; i++) {
    //         for (let j = 0; j < this.games.length; j++) {
    //             if (this.offers[i].GameId === this.games[j].Id) {
    //                 this.NomDuJeu = this.games[j].GameName;
    //                 this.ImageDuJeu = this.games[j].GameImg;
    //             }
    //         }
    //         this.tableAuctions[i] = [
    //             {
    //                 Id: this.offers[i].Id,
    //                 TwitcherId: this.offers[i].TwitcherId,
    //                 GameId: this.offers[i].GameId,
    //                 GameName: this.NomDuJeu,
    //                 Img: this.ImageDuJeu,
    //             }
    //         ];
    //     }
    //
    //     console.log(this.tableAuctions);
    // }

    Encherir(value) {
        this.encherir = value;
        console.log(this.tableAuctions);
    }
    onSubmitNewEnchere() {

        if (this.formNewAuction.valid) {
            this.submittedNewEnchere = true;
        } else {
            this.submittedNewEnchere = false;
        }
    }
}
