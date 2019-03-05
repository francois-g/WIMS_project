import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../Services/user.service';
import {Observable} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';
import {User} from '../Observables/User';
import {PricetowinService} from '../Services/pricetowin.service';
import {Router} from '@angular/router';
import {Currency} from '../Observables/Currency';
import {Role} from '../Observables/Role';


@Component({
    selector: 'app-choix',
    templateUrl: './choix.component.html',
    styleUrls: ['./choix.component.css']
})
export class ChoixComponent implements OnInit {
    IsPseudoStreamer;
    IsMdpStreamer;
    ident;
    private u : User;
    private _user$: Observable<User[]>;
    private _user: User[];

    get user$(): Observable<User[]> {
        return this._user$;
    }

    set user$(value: Observable<User[]>) {
        this._user$ = value;
    }

    get user(): User[] {
        return this._user;
    }

    set user(value: User[]) {
        this._user = value;
    }
    panelOpenState = false;
    streamer;
    viewer;

    //Form Connexion Streamer
    private _formConnexionStreamer: FormGroup;
    get formConnexionStreamer(): FormGroup{
        return this._formConnexionStreamer;
    }
    set formConnexionStreamer(value : FormGroup){
        this._formConnexionStreamer = value;
    }
    private _outputConnexionStreamer : {
        pseudoStreamer: string,
        mdpStreamer: string,
    };
    get outputConnexionStreamer(): { pseudoStreamer: string; mdpStreamer: string; } {
        return this._outputConnexionStreamer;
    }
    set outputConnexionStreamer(value: { pseudoStreamer: string; mdpStreamer: string; }) {
        this._outputConnexionStreamer = value;
    }

    //Form inscription Streamer
    private _formInscriptionStreamer: FormGroup;
    get formInscriptionStreamer(): FormGroup{
        return this._formInscriptionStreamer;
    }
    set formInscriptionStreamer(value : FormGroup){
        this._formInscriptionStreamer = value;
    }
    private _outputInscriptionStreamer : {
        prenom: string,
        nom: string,
        mail: string,
        pseudo: string,
        mdp: string,
        mdpValidation: string,
        pseudoTwitch: string,
        lienTwitch: string,
    };
    get outputInscriptionStreamer(): { prenom: string; nom: string; mail: string; pseudo: string; mdp: string, mdpValidation: string;
        pseudoTwitch: string; lienTwitch: string; } {
        return this._outputInscriptionStreamer;
    }
    set outputInscriptionStreamer(value: { prenom: string; nom: string; mail: string; pseudo: string; mdp: string, mdpValidation: string;
        pseudoTwitch: string; lienTwitch: string; }) {
        this._outputInscriptionStreamer = value;
    }

    // Form Connexion Viewer
    private _formConnexionViewer: FormGroup;
    get formConnexionViewer(): FormGroup{
        return this._formConnexionViewer;
    }
    set formConnexionViewer(value : FormGroup){
        this._formConnexionViewer = value;
    }
    private _outputConnexionViewer : {
        pseudoViewer: string,
        mdpViewer: string,
    };
    get outputConnexionViewer(): { pseudoViewer: string; mdpViewer: string; } {
        return this._outputConnexionViewer;
    }
    set outputConnexionViewer(value: { pseudoViewer: string; mdpViewer: string; }) {
        this._outputConnexionViewer = value;
    }

    //Form Inscription Viewer
    private _formInscriptionViewer: FormGroup;
    get formInscriptionViewer(): FormGroup{
        return this._formInscriptionViewer;
    }
    set formInscriptionViewer(value : FormGroup){
        this._formInscriptionViewer = value;
    }
    private _outputInscriptionViewer : {
        prenomViewer: string,
        nomViewer: string,
        mailViewer: string,
        adresse: string,
        ville: string,
        cdp: string,
        pays: string,
        pseudoVew: string,
        mdpVew: string,
        mdpValidationVew: string,
    };
    get outputInscriptionViewer(): { prenomViewer: string; nomViewer: string; mailViewer: string; adresse: string; ville: string; cdp: string;
        pays: string; pseudoVew: string; mdpVew: string; mdpValidationVew: string} {
        return this._outputInscriptionViewer;
    }
    set outputInscriptionViewer(value: { prenomViewer: string; nomViewer: string; mailViewer: string; adresse: string; ville: string; cdp: string;
        pays: string; pseudoVew: string; mdpVew: string; mdpValidationVew: string }) {
        this._outputInscriptionViewer = value;
    }

    users;
    getUsers(): void {
        this.users = this.Users.getAll();
    }

    constructor(private builder: FormBuilder, private Users: UserService, private router: Router) {
        this.formConnexionStreamer = this.builder.group({
            'pseudoStreamer': ['', [
                Validators.required,
            ]
            ],
            'mdpStreamer':['',[
                Validators.required,
            ]],
        });

        this.formInscriptionStreamer = this.builder.group({
            'prenom': ['', [
                Validators.required,
            ]
            ],
            'nom':['',[
                Validators.required,
            ]],
            'mail':['',[
                Validators.required,
            ]],
            'pseudo':['',[
                Validators.required,
            ]],
            'mdp':['',[
                Validators.required,
            ]],
            'mdpValidation':['',[
                Validators.required,
            ]],
            'pseudoTwitch':['',[
                Validators.required,
            ]],
            'lienTwitch': ['',[
                Validators.required,
            ]]
        });

        this.formConnexionViewer = this.builder.group({
            'pseudoViewer': ['', [
                Validators.required,
            ]
            ],
            'mdpViewer':['',[
                Validators.required,
            ]],
        });

        this.formInscriptionViewer = this.builder.group({
            'prenomViewer': ['', [
                Validators.required,
            ]
            ],
            'nomViewer': ['', [
                Validators.required,
            ]],
            'mailViewer': ['', [
                Validators.required,
            ]
            ],
            'adresse': ['', [
                Validators.required,
            ]
            ],
            'ville': ['', [
                Validators.required,
            ]
            ],
            'cdp': ['', [
                Validators.required,
            ]
            ],
            'pays': ['', [
                Validators.required,
            ]
            ],
            'pseudoVew': ['', [
                Validators.required,
            ]
            ],
            'mdpVew': ['', [
                Validators.required,
            ]
            ],
            'mdpValidationVew': ['', [
                Validators.required,
            ]
            ],
        });
    }
    submittedConnectionStreamer;
    submittedInscriptionStreamer;
    submittedConnectionViewer;
    submittedInscriptionViewer;
    onSubmitConnexionStreamer() {
        if (this.formConnexionStreamer.valid) {
            for (let i = 0; i < this.user.length; i++) {
                if (this.user[i].Pseudo === this.formConnexionStreamer.value.pseudoStreamer) {
                    console.log('Pseudo correct');
                    this.ident = i;
                    i = this.user.length;
                    if (this.user[this.ident].Pswd === this.formConnexionStreamer.value.mdpStreamer) {
                        console.log('mdp correct, Connexion ok');
                        this.submittedConnectionStreamer = true;
                        this.router.navigate(['AllOffers']);
                    } else {
                        console.log('Mauvais mot de passe');
                        this.IsMdpStreamer = false;
                    }
                }
                else {
                    console.log('Pseudo faux');
                    this.IsPseudoStreamer = false;
                }
            }
        }
        // stop here if form is invalid
        else {
            this.submittedConnectionStreamer = false;
        }
    }
    onSubmitInscriptionStreamer() {

        if(this.formInscriptionStreamer.valid){
            this.submittedInscriptionStreamer = true;
            console.log('Inscription ok');
            this.u = new User(
                this.formInscriptionStreamer.value.prenom,
                this.formInscriptionStreamer.value.nom,
                this.formInscriptionStreamer.value.pseudo,
                this.formInscriptionStreamer.value.mdp,
                this.formInscriptionStreamer.value.mail
            );
            this.u.Role = 2;
            this.u.Currency = new Currency(1);
            console.log(this.u);
            this.Users.insert(this.u).subscribe(
                () => {

                    console.log('Enregistrement fait');

                },

                (error) => {

                    console.log('erreur ' + error);

                }
                );

            // console.log(this.u);
            // this.Users.insert(this.u);
        }
        // stop here if form is invalid
        else{
            this.submittedInscriptionStreamer = false;
        }
    }
    onSubmitConnexionViewer() {

        for (let i = 0; i < this.user.length; i++) {
            if (this.formConnexionViewer.valid) {
                if (this.user[i].Pseudo === this.formConnexionViewer.value.pseudoViewer) {
                    console.log('Pseudo correct');
                    this.ident = i;
                    i = this.user.length;
                    if(this.user[this.ident].Pswd === this.formConnexionViewer.value.mdpViewer){
                        console.log('mdp correct, Connexion ok');
                        this.submittedConnectionViewer = true;
                        this.router.navigate(['AllOffers']);
                    }
                    else {
                        console.log('Mauvais mot de passe');
                    }
                } else {
                    console.log('Pseudo faux');
                }
            }
            // stop here if form is invalid
            else {
                this.submittedConnectionViewer = false;
            }
        }
    }
    onSubmitInscriptionViewer() {

        if(this.formInscriptionViewer.valid){
            this.submittedInscriptionViewer = true;
        }
        // stop here if form is invalid
        else{
            this.submittedInscriptionViewer = false;
        }
    }
    ngOnInit() {
        this._user$ = this.Users.getAll();
        this._user$.subscribe(
            u => {
                this.user = u;
            },
            (err) => {
                console.log('erreur' + err);
            }
        );
    }

    blueOver() {
        const orange =  document.getElementById('orange');
        orange.style.opacity = ('0.3');
    }
    blueOut() {
        const orange = document.getElementById('orange');
        orange.style.opacity = ('1');
    }
    orangeOver() {
        const blue =  document.getElementById('blue');
        blue.style.opacity = ('0.3');
    }
    orangeOut() {
        const blue = document.getElementById('blue');
        blue.style.opacity = ('1');
    }
    formViewer(value) {
        this.viewer = value;
        this.streamer = 0;
    }
    formStreamer(value) {
        this.streamer = value;
        this.viewer = 0;
    }
    streamerInscription(value) {
        this.streamer = value;
    }
    viewerInscription(value) {
        this.viewer = value;
    }

}
