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
    avatar;
    u;

    private _offer$: Observable<PriceToWin[]>;
    private _offer: PriceToWin[];
    private _game$: Observable<Game[]>;
    private _game: Game[];
    private _auction$: Observable<Auction[]>;
    private _auction: Auction[];
    private _tabOfValues: number[];
    private _editMode: boolean;
    private _editableId: number;
    private _formNewAuction: FormGroup;
    private _outputNewAuction: {
        newAuction: Auction,
    };
    private _postedAuction: Auction;

    tableAuctions = [];
    Id;

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

    get auction$(): Observable<Auction[]> {
        return this._auction$;
    }

    set auction$(value: Observable<Auction[]>) {
        this._auction$ = value;
    }

    get auction(): Auction[] {
        return this._auction;
    }

    set auction(value: Auction[]) {
        this._auction = value;
    }

    get tabOfValues(): number[] {
        return this._tabOfValues;
    }

    set tabOfValues(value: number[]) {
        this._tabOfValues = value;
    }

    get editMode(): boolean {
        return this._editMode;
    }

    set editMode(value: boolean) {
        this._editMode = value;
    }

    get editableId(): number {
        return this._editableId;
    }

    set editableId(value: number) {
        this._editableId = value;
    }

    get formNewAuction(): FormGroup {
        return this._formNewAuction;
    }
    set formNewAuction(value: FormGroup) {
        this._formNewAuction = value;
    }

    get outputNewAuction(): { newAuction: Auction } {
        return this._outputNewAuction;
    }
    set outputNewEnchere(value: { newAuction: Auction }) {
        this._outputNewAuction = value;
    }

    get postedAuction(): Auction {
        return this._postedAuction;
    }

    set postedAuction(value: Auction) {
        this._postedAuction = value;
    }

    constructor(private builder: FormBuilder, private Offers: PricetowinService, private Games: GameService, private Auctions: AuctionService) {
        this.formNewAuction = this.builder.group({
            'auctionValue': ['', [
                Validators.required,
            ]
            ],
        });
    }

    ngOnInit() {
        this._offer$ = this.Offers.getAll();
        this._offer$.subscribe(
            o => {
                this.offer = o;
            },
            (err) => {
                console.log('erreur' + err);
            }
        );

        this.avatar = document.getElementsByClassName('avatar');
        // console.log('offres');
        // console.log(this.Offers);
        // console.log(this.offer);

        this._auction$ = this.Auctions.getAll();
        this._auction$.subscribe(
            a => {
                this.auction = a;
                // console.log('get all');
                // console.log(this.auction);
                // console.log('service ');
                // console.log(this.Auctions);
            },
            (err) => {
                console.log('erreur' + err );
            }
        );

        this.editMode = false;
        // console.log(this.avatar);
        // .style.backgroundImage = 'url(this.offer[0].Twitcher.avatar)';

    }

    // getGame(value: number) {
    //     this._game$ = this.Games.getById(value);
    //     this._game$.subscribe(
    //         g => {
    //             console.log(this.game);
    //             this._game = g;
    //             console.log(g);
    //         },
    //         (err) => {
    //             console.log('erreur ' + err);
    //         }
    //     );
    // }

    // getBestAuction(value is Column Id in PriceToWin)
    getBestAuction(IdOfPrice: number) {
        if (this.auction !== undefined) {
            let tabOfFilteredAuctions: Auction[];
            // console.log(this.auction);
            // on ne prend les enchères qu'avec un IdPrice égal au paramètre de la fonction
            tabOfFilteredAuctions = this.auction.filter(a => a.IdPrice === IdOfPrice);
            // console.log('filtré');
            // console.log(tabOfFilteredAuctions);

            // on a un tableau de valeurs, de nombres. Il va devenir le map du tableau filtré précédemment, en retournant uniquement la CurrentAuction
            this.tabOfValues = tabOfFilteredAuctions.map(a => {
                return a.CurrentAuction;
            });
            // console.log('juste les valeurs');
            // console.log(this.tabOfValues);

            // on trouve le maximum
            let max = 0;
            this.tabOfValues.map(v => {
                if (v > max) {
                    max = v;
                }
            });

            // if (max === 0) {
            //     this.Offers[IdOfPrice].AuctionStartValue = max;
            // }

            // console.log('maximum');
            // console.log(max);
            // et on le retourne
            return max;
        }



    }

    modifyDesc(index: number) {
        this.editMode = true;
        this.editableId = index;

        // let offerToModify = this.offer[index];
        // offerToModify.Description = document.getElementById('descToEdit-' + index);

        // let inputDiv = document.createElement('input');
        // inputDiv.setAttribute('id', 'descToEdit');
        // inputDiv.setAttribute('value', document.getElementById('descOffer').innerHTML);
        // document.getElementById('descOffer-' + index).after(inputDiv);

    }

    editModeOff(value: number) {
        this.editMode = false;
        document.getElementById('descToEdit-' + value).remove();
        // console.log('c\'est bon' + this.editMode(value));
    }

    encherir(value: number) {
        this.u = new User();
        this.u.id = 2;
        // document.getElementById('buttonAuction');
        this.postedAuction = new Auction (
            this.u.id,
            this.formNewAuction.value.auctionValue,
            value
        );

        this._auction$ = this.Auctions.insert(this.postedAuction);
        this._auction$.subscribe(
            () => {
                console.log(this.postedAuction);
                console.log('enregistrement fait');
            },
            (err) => {
                console.log('erreur' + err );
            }
        );
        // console.log(this.tableAuctions);
    }
    onSubmitNewEnchere() {

        if (this.formNewAuction.valid) {
            this.submittedNewEnchere = true;
        } else {
            this.submittedNewEnchere = false;
        }
    }
}
