import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PricetowinService} from '../Services/pricetowin.service';
import {Observable} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';
import {AuctionService} from '../Services/auction.service';
import {Auction} from '../Observables/Auction';
import {GameService} from '../Services/game.service';
import {User} from '../Observables/User';
import {Game} from '../Observables/Game';
import {DataService} from '../Services/data.service';
import {isUndefined} from 'util';
import * as JWT from 'jwt-decode';
import {UserService} from '../Services/user.service';

@Component({
    selector: 'app-all-offers',
    templateUrl: './all-offers.component.html',
    styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent implements OnInit {

    submittedNewEnchere;
    avatar;

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
    private _currentUser: User;
    private _currentBalance: number;
    private _bestUser: string;

    tableAuctions = [];


    get offer$(): Observable<PriceToWin[]> {
        return this._offer$;
    }

    set offer$(value: Observable<PriceToWin[]>) {
        this._offer$ = value;
    }

    get offer(): PriceToWin[] {
        if (this.data.currentPrintedOffers.length === 0) {
            return this._offer;
        } else {
            return this.data.currentPrintedOffers;
        }
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

    get currentUser(): User {
        return this._currentUser;
    }

    set currentUser(value: User) {
        this._currentUser = value;
    }

    get currentBalance(): number {
        return this._currentBalance;
    }

    set currentBalance(value: number) {
        this._currentBalance = value;
    }

    get bestUser(): string {
        return this._bestUser;
    }

    set bestUser(value: string) {
        this._bestUser = value;
    }

    constructor(private Users: UserService, private builder: FormBuilder, private Offers: PricetowinService, private data: DataService, private Games: GameService, private Auctions: AuctionService) {
        this.formNewAuction = this.builder.group({
            'auctionValue': ['', [
                Validators.required,
            ]
            ],
        });
    }

    tri(value: string) {
        if (value === 'GameId') {
            this.offer = [];
            this._offer$ = this.Offers.orderBy(value);
            this._offer$.subscribe(
                o => {
                    o.forEach(one => {
                        if (Date.parse(one.OfferEnd) > Date.now()) {
                            this.offer.push(one);
                        }
                    });
                },
                (err) => {
                    console.log('erreur' + err);
                });
        } else if (value === 'TwitcherId') {
            this.offer = [];
            this._offer$ = this.Offers.orderBy(value);
            this._offer$.subscribe(
                o => {
                    o.forEach(one => {
                        if (Date.parse(one.OfferEnd) > Date.now()) {
                            this.offer.push(one);
                        }
                    });
                },
                (err) => {
                    console.log('erreur' + err);
                });
        }
    }

    ngOnInit() {
        this.offer = [];
        this._offer$ = this.Offers.getAll();
        this._offer$.subscribe(
            o => {
                o.forEach(one => {
                    if (Date.parse(one.OfferEnd) > Date.now()) {
                        this.offer.push(one);
                    }
                });
                this.data.changeOffers(this.offer);
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
                console.log('erreur' + err);
            }
        );

        this.editMode = false;

        if (sessionStorage.getItem('currentUser') != null) {
            this.currentUser = JWT(sessionStorage.getItem('currentUser'));
            console.log(this.currentUser);
            this.Users.getBalance(this.currentUser.Id)
                .subscribe(
                    t => {
                        this.currentBalance = t;
                    },
                    (err) => {
                        console.log('erreur' + err);
                    }
                );
        }
    }

    // getBestAuction(value is Column Id in PriceToWin)
    getBestAuction(IdOfPrice: number) {
        if (this.auction !== undefined) {
            let tabOfFilteredAuctions: Auction[];

            // on ne prend les enchères qu'avec un IdPrice égal au paramètre de la fonction
            tabOfFilteredAuctions = this.auction.filter(a => a.IdPrice === IdOfPrice);

            // on a un tableau de valeurs, de nombres. Il va devenir le map du tableau filtré précédemment, en retournant uniquement la CurrentAuction
            this.tabOfValues = tabOfFilteredAuctions.map(a => {
                return a.CurrentAuction;
            });

            let userPseudos = tabOfFilteredAuctions.map(a => {
                return a.User.Pseudo;
            });

            this.bestUser = userPseudos[userPseudos.length - 1];

            let max = 0;
            this.tabOfValues.map(v => {
                if (v > max) {
                    max = v;
                }
            });

            // et on le retourne
            return max;
        }
    }

    modifyDesc(index: number) {
        this.editMode = true;
        this.editableId = index;
    }

    editModeOff(value: number) {
        this.editMode = false;
        document.getElementById('descToEdit-' + value).remove();
        // console.log('c\'est bon' + this.editMode(value));
    }

    encherir(value: number) {
        let u = new User();
        u = JWT(sessionStorage.getItem('currentUser'));
        let uId = u.Id;
        console.log(uId);

        this.postedAuction = new Auction (
            u,
            this.formNewAuction.value.auctionValue,
            value
        );

        if (this.formNewAuction.value.auctionValue > this.getBestAuction(value) && this.currentBalance > this.formNewAuction.value.auctionValue) {
            this._auction$ = this.Auctions.insert(this.postedAuction);
            this._auction$.subscribe(
                () => {
                    console.log(this.postedAuction);
                    console.log('enregistrement fait');
                    window.location.reload();
                },
                (err) => {
                    console.log('erreur' + JSON.stringify(err));
                }
            );
        } else {
            alert('Vérifiez que votre solde soit suffisant et que vous soyez bien au dessus de la dernière offre');
        }
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
