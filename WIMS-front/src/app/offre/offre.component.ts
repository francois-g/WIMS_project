import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PricetowinService} from '../Services/pricetowin.service';
import {Observable} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';
import {Game} from '../Observables/Game';
import {User} from '../Observables/User';
import {Currency} from '../Observables/Currency';
import {Twitcher} from '../Observables/Twitcher';
import * as JWT from 'jwt-decode';


@Component({
    selector: 'app-offre',
    templateUrl: './offre.component.html',
    styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {

    hours = [];
    minutes = [];
    submittedOffre;
    heure;
    date;
    minute;
    dateHeure: string;
    finMinute;
    private _formOffre: FormGroup;
    private _offer$: Observable<PriceToWin[]>;
    private _offer: PriceToWin[];
    private _game$: Observable<Game[]>;
    private _game: Game[];
    private _p: PriceToWin;

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
    get formOffre(): FormGroup{
        return this._formOffre;
    }
    set formOffre(value : FormGroup){
        this._formOffre = value;
    }

    get p(): PriceToWin {
        return this._p;
    }

    set p(value: PriceToWin) {
        this._p = value;
    }

    private _outputOffre: {
        gameName: number,
        description: string,
        startValue: number,
        dateFin: Date,
        Fin: number,
        minuteFin: number,
    };
    get outputOffre(): { gameName: number; description: string; startValue: number; dateFin: Date; Fin: number; minuteFin: number } {
        return this._outputOffre;
    }
    set outputOffre(value: { gameName: number; description: string; startValue: number; dateFin: Date; Fin: number; minuteFin: number }) {
        this._outputOffre = value;
    }

    constructor(private builder: FormBuilder, private Offers: PricetowinService) {
        this.formOffre = this.builder.group({
            'gameName': ['', [
                Validators.required,
            ]
            ],
            'description': ['', [
                Validators.required,
            ]
            ],
            'startValue': ['', [
               Validators.required,
            ]
            ],
            'dateFin': ['', [
                Validators.required,
            ]
            ],
            'Fin': ['', [
                Validators.required,
            ]
            ],
            'minuteFin': ['', [
                Validators.required,
            ]]
        });
    }

    ngOnInit(): void {
        for (let i = 0; i < 24; i++) {
            this.hours[i] = i;
        }
        for (let i = 0; i < 61; i++) {
            this.minutes[i] = i;
        }
    }

    onSubmitOffre() {
        // if (this.formOffre.valid) {
        this.submittedOffre = true;

        if (this.formOffre.value.Fin < 10) {
            this.dateHeure = '0' + this.formOffre.value.Fin.toString();
        } else {
            this.dateHeure = this.formOffre.value.Fin.toString();
        }
        if (this.formOffre.value.minuteFin < 10) {
            this.finMinute = '0' + this.formOffre.value.minuteFin.toString();
        } else {
            this.finMinute = this.formOffre.value.minuteFin.toString();
<<<<<<< HEAD
            this.dateHeure = this.date + 'T' + this.dateHeure + ':' + this.finMinute + ':00';
            console.log(this.formOffre.value.Fin);

            this.p = new PriceToWin(
                this.dateHeure,
                this.formOffre.value.startValue,
                this.formOffre.value.description,
            );
            this.p.Game = new Game(this.formOffre.value.gameName);
            let currentU = new User();
            currentU = JWT(sessionStorage.getItem('currentUser'));
            this.p.Twitcher = new Twitcher(currentU.Id);
            this.Offers.insert(this.p).subscribe(
                () => {
                    console.log('Enregistrement fait');

=======
        }

        this.date = this.formOffre.value.dateFin.toString();

        this.dateHeure = this.date + 'T' + this.dateHeure + ':' + this.finMinute + ':00';

        console.log(this.formOffre.value.Fin);
        console.log(this.dateHeure);

        this.p = new PriceToWin(
            this.dateHeure,
            this.formOffre.value.startValue,
            this.formOffre.value.description,
        );
        this.p.Game = new Game(this.formOffre.value.gameName);
        let currentU = new User();
        currentU = JWT(sessionStorage.getItem('currentUser'));
        this.p.Twitcher = new Twitcher(currentU.Id);
        this.Offers.insert(this.p).subscribe(
            () => {
                console.log('Enregistrement fait');
>>>>>>> 7a887435bf66487e7c86f4dc082d3be55329e495
                },
            (err) => {
                console.log('erreur ' + err);
            }
        );
        // stop here if form is invalid
        // else {
        //     this.submittedOffre = false;
        //     console.log('false');
        // }
    // }
    }
}

