import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../Services/user.service';
import {Observable} from 'rxjs';
import {User} from '../Observables/User';
import {Router} from '@angular/router';
import {Currency} from '../Observables/Currency';
import * as $ from 'jquery';
import * as JWT from 'jwt-decode';

@Component({
    selector: 'app-choix',
    templateUrl: './choix.component.html',
    styleUrls: ['./choix.component.css']
})
export class ChoixComponent implements OnInit {


    IsPseudoStreamer;
    IsMdpStreamer;
    IsPseudoAndMailViewerUnique;
    IsPseudoAndMailStreamerUnique;
    IsMdpAndCheckedMdpStreamer;
    IsMdpAndCheckedMdpViewer;
    maxId = 999999;
    ident;
    private u: User;
    private _user$: Observable<User[]>;
    private _user: User[];
    private _tokenString$: Observable<string>;
    panelOpenState = false;
    streamer;
    viewer;

    // Form Connexion Streamer
    private _formConnexionStreamer: FormGroup;
    private _outputConnexionStreamer: {
        pseudoStreamer: string,
        mdpStreamer: string,
    };

    // Form inscription Streamer
    private _formInscriptionStreamer: FormGroup;
    private _outputInscriptionStreamer: {
        prenom: string,
        nom: string,
        mail: string,
        pseudo: string,
        mdp: string,
        mdpValidation: string,
        pseudoTwitch: string,
        lienTwitch: string,
    };

    // Form Connexion Viewer
    private _formConnexionViewer: FormGroup;
    private _outputConnexionViewer: {
        pseudoViewer: string,
        mdpViewer: string,
    };

    // Form Inscription Viewer
    private _formInscriptionViewer: FormGroup;
    private _outputInscriptionViewer: {
        prenomViewer: string,
        nomViewer: string,
        mailViewer: string,
        pseudoVew: string,
        mdpVew: string,
        mdpValidationVew: string,
    };

    users;
    submittedConnectionStreamer;
    submittedInscriptionStreamer;
    submittedConnectionViewer;
    submittedInscriptionViewer;

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

    get tokenString$(): Observable<string> {
        return this._tokenString$;
    }

    set tokenString$(value: Observable<string>) {
        this._tokenString$ = value;
    }

    get formConnexionStreamer(): FormGroup {
        return this._formConnexionStreamer;
    }
    set formConnexionStreamer(value: FormGroup) {
        this._formConnexionStreamer = value;
    }
    get outputConnexionStreamer(): { pseudoStreamer: string; mdpStreamer: string; } {
        return this._outputConnexionStreamer;
    }
    set outputConnexionStreamer(value: { pseudoStreamer: string; mdpStreamer: string; }) {
        this._outputConnexionStreamer = value;
    }
    get formInscriptionStreamer(): FormGroup {
        return this._formInscriptionStreamer;
    }
    set formInscriptionStreamer(value: FormGroup) {
        this._formInscriptionStreamer = value;
    }
    get outputInscriptionStreamer(): { prenom: string; nom: string; mail: string; pseudo: string; mdp: string, mdpValidation: string;
        pseudoTwitch: string; lienTwitch: string; } {
        return this._outputInscriptionStreamer;
    }
    set outputInscriptionStreamer(value: { prenom: string; nom: string; mail: string; pseudo: string; mdp: string, mdpValidation: string;
        pseudoTwitch: string; lienTwitch: string; }) {
        this._outputInscriptionStreamer = value;
    }
    get formConnexionViewer(): FormGroup {
        return this._formConnexionViewer;
    }
    set formConnexionViewer(value: FormGroup) {
        this._formConnexionViewer = value;
    }
    get outputConnexionViewer(): { pseudoViewer: string; mdpViewer: string; } {
        return this._outputConnexionViewer;
    }
    set outputConnexionViewer(value: { pseudoViewer: string; mdpViewer: string; }) {
        this._outputConnexionViewer = value;
    }
    get formInscriptionViewer(): FormGroup {
        return this._formInscriptionViewer;
    }
    set formInscriptionViewer(value: FormGroup) {
        this._formInscriptionViewer = value;
    }
    get outputInscriptionViewer(): { prenomViewer: string; nomViewer: string; mailViewer: string; pseudoVew: string; mdpVew: string; mdpValidationVew: string} {
        return this._outputInscriptionViewer;
    }
    set outputInscriptionViewer(value: { prenomViewer: string; nomViewer: string; mailViewer: string; pseudoVew: string; mdpVew: string; mdpValidationVew: string }) {
        this._outputInscriptionViewer = value;
    }

    constructor(private builder: FormBuilder, private Users: UserService, private router: Router) {
        this.formConnexionStreamer = this.builder.group({
            'pseudoStreamer': ['', [
                Validators.required,
            ]
            ],
            'mdpStreamer': ['', [
                Validators.required,
            ]],
        });

        this.formInscriptionStreamer = this.builder.group({
            'prenom': ['', [
                Validators.required,
            ]
            ],
            'nom': ['', [
                Validators.required,
            ]],
            'mail': ['', [
                Validators.required,
                Validators.email,
            ]],
            'pseudo': ['', [
                Validators.required,
            ]],
            'mdp': ['', [
                Validators.required,
                Validators.minLength(6),
            ]],
            'mdpValidation': ['', [
                Validators.required,
            ]],
            'pseudoTwitch': ['', [
                Validators.required,
            ]],
            'lienTwitch': ['', [
                Validators.required,
            ]]
        });

        this.formConnexionViewer = this.builder.group({
            'pseudoViewer': ['', [
                Validators.required,
            ]
            ],
            'mdpViewer': ['', [
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
                Validators.email,
            ]
            ],
            'pseudoVew': ['', [
                Validators.required,
            ]
            ],
            'mdpVew': ['', [
                Validators.required,
                Validators.minLength(6),
            ]
            ],
            'mdpValidationVew': ['', [
                Validators.required,
            ]
            ],
        });
    }

    onSubmitConnexionStreamer() {
        if (this.formConnexionStreamer.valid) {
            let tokenString: string;
            const tokenObj = {
                'Pseudo': this.formConnexionStreamer.value.pseudoStreamer,
                'Password': this.formConnexionStreamer.value.mdpStreamer
            };
            this._tokenString$ = this.Users.getToken(tokenObj);
            this._tokenString$.subscribe(
                t => {
                    sessionStorage.setItem('currentUser', t);
                    tokenString = t;
                    console.log(tokenString);
                    console.log(t);
                    window.location.href = 'http://localhost:4200/AllOffers';
                },
                (err) => {
                    console.log('erreur' + err);
                }
            );
        } else {
            this.submittedConnectionStreamer = false;
        }
    }

    onSubmitConnexionViewer() {
        if (this.formConnexionViewer.valid) {
            let tokenString: string;
            const tokenObj = {
                'Pseudo': this.formConnexionViewer.value.pseudoViewer,
                'Password': this.formConnexionViewer.value.mdpViewer
            };
            this._tokenString$ = this.Users.getToken(tokenObj);
            this._tokenString$.subscribe(
                t => {
                    sessionStorage.setItem('currentUser', t);
                    tokenString = t;
                    console.log(tokenString);
                    console.log(t);
                    window.location.href = 'http://localhost:4200/AllOffers';
                },
                (err) => {
                    console.log('erreur' + err);
                }
            );
        } else {
            this.submittedConnectionViewer = false;
        }
        // for (let i = 0; i < this.user.length; i++) {
        //     if (this.formConnexionViewer.valid) {
        //         if (this.user[i].Pseudo === this.formConnexionViewer.value.pseudoViewer) {
        //             console.log('Pseudo correct');
        //             this.ident = i;
        //             i = this.user.length;
        //             if (this.user[this.ident].Pswd === this.formConnexionViewer.value.mdpViewer) {
        //                 console.log('mdp correct, Connexion ok');
        //                 this.submittedConnectionViewer = true;
        //                 this.router.navigate(['AllOffers']);
        //             } else {
        //                 console.log('Mauvais mot de passe');
        //             }
        //         } else {
        //             console.log('Pseudo faux');
        //         }
        //     } else {
        //         this.submittedConnectionViewer = false;
        //     }
        // }
    }

    onSubmitInscriptionStreamer() {
        let exists: boolean;
        this.Users.check(this.formInscriptionStreamer.value.pseudoStreamer, this.formInscriptionStreamer.value.mail.replace('@', '%40').replace('.', 'x')).subscribe(
            data => {
                exists = data;
                console.log(data);
                console.log(exists);
                if (this.formInscriptionStreamer.value.mdp === this.formInscriptionStreamer.value.mdpValidation) {
                    this.IsMdpAndCheckedMdpStreamer = true;
                } else {
                    this.IsMdpAndCheckedMdpStreamer = false;
                }
                if (this.formInscriptionStreamer.valid && !exists && this.IsMdpAndCheckedMdpStreamer === true) {
                    this.submittedInscriptionStreamer = true;
                    console.log('Inscription ok');
                    this.u = new User();
                    this.u.FirstName = this.formInscriptionStreamer.value.prenom;
                    this.u.LastName = this.formInscriptionStreamer.value.nom;
                    this.u.Pseudo = this.formInscriptionStreamer.value.pseudo;
                    this.u.Pswd = this.formInscriptionStreamer.value.mdp;
                    this.u.Email = this.formInscriptionStreamer.value.mail;
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
                } else {
                    this.submittedInscriptionStreamer = false;
                    console.log('formulaire invalide');
                }
            },
            (err) => {
                console.log(JSON.stringify(err));
            }
        );
    }

    onSubmitInscriptionViewer() {
        let exists: boolean;
        this.Users.check(this.formInscriptionViewer.value.pseudoVew, this.formInscriptionViewer.value.mailViewer.replace('@', '%40').replace('.', 'x')).subscribe(
            data => {
                exists = data;
                console.log(data);
                console.log(exists);
                if (this.formInscriptionViewer.value.mdpVew === this.formInscriptionViewer.value.mdpValidationVew) {
                    this.IsMdpAndCheckedMdpViewer = true;
                } else {
                    this.IsMdpAndCheckedMdpViewer = false;
                }
                if (this.formInscriptionViewer.valid && !exists && this.IsMdpAndCheckedMdpViewer === true) {
                    this.submittedInscriptionViewer = true;
                    console.log('Inscription ok');
                    this.u = new User();
                    this.u.FirstName = this.formInscriptionViewer.value.prenomViewer;
                    this.u.LastName = this.formInscriptionViewer.value.nomViewer;
                    this.u.Pseudo = this.formInscriptionViewer.value.pseudoVew;
                    this.u.Pswd = this.formInscriptionViewer.value.mdpVew;
                    this.u.Email = this.formInscriptionViewer.value.mailViewer;
                    this.u.Role = 1;
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
                } else {
                    this.submittedInscriptionViewer = false;
                    console.log('teub');
                }
            },
            (err) => {
                console.log(JSON.stringify(err));
            }
        );

        // if (exists) {
        //     this._user$ = this.Users.insert()
        //     this._user$.subscribe(
        //         u => {
        //             sessionStorage.setItem('test', JSON.stringify(u));
        //             this.user = u;
        //         },
        //         (err) => {
        //             console.log('erreur' + err);
        //         }
        //     );
        // }

        // this.getAllOnPage();
        // for (let i = 0; i < this.user.length; i++) {
        //     if (this.user[i].Pseudo === this.formInscriptionViewer.value.pseudoVew ||
        //         this.user[i].Email === this.formInscriptionViewer.value.mailViewer) {
        //         this.maxId = i;
        //     }
        // }
        // if (this.maxId !== 999999) {
        //     this.IsPseudoAndMailViewerUnique = false;
        //     console.log('false');
        // }
        // else{
        //     this.IsPseudoAndMailViewerUnique = true;
        //     console.log('true');
        // }
        // if(this.formInscriptionViewer.value.mdpVew === this.formInscriptionViewer.value.mdpValidationVew){
        //     this.IsMdpAndCheckedMdpViewer = true;
        // }
        // else {
        //     this.IsMdpAndCheckedMdpViewer = false;
        // }

    }
    ngOnInit() {
        // this._user$ = this.Users.getAll();
        // this._user$.subscribe(
        //     u => {
        //         sessionStorage.setItem("test", JSON.stringify(u))
        //         this.user = u;
        //     },
        //     (err) => {
        //         console.log('erreur' + err);
        //     }
        // );
    }

    getAllOnPage() {
        this._user$ = this.Users.getAll();
        this._user$.subscribe(
            u => {
                sessionStorage.setItem('test', JSON.stringify(u));
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
        $('#blueorange').toggleClass('iconSmall iconBig');
        $('#buttonViewer').attr('disabled', 'disabled');
        $('#buttonStreamer').removeAttr('disabled');
        $('#buttonStreamer').attr('enabled', 'enabled');

        if ($('#orangeblue').hasClass('iconSmall')) {
            $('#orangeblue').toggleClass('iconSmall iconBig');
        }

        $('#viewer').toggleClass('resizeTitle viewerTitle');
        if ($('#streamer').hasClass('resizeTitle')) {
            $('#streamer').toggleClass('resizeTitle streamerTitle');
        }

        $('#img-screen').toggleClass('logo-screen logo-screen-resize');
        if ($('#img-manette').hasClass('logo-manette-resize')) {
            $('#img-manette').toggleClass('logo-manette-resize logo-manette');
        }

        this.viewer = value;
        this.streamer = 0;
    }

    formStreamer(value) {
        $('#orangeblue').toggleClass('iconSmall iconBig');
        $('#buttonStreamer').attr('disabled', 'disabled');
        $('#buttonViewer').removeAttr('disabled');
        $('#buttonViewer').attr('enabled', 'enabled');

        if ($('#blueorange').hasClass('iconSmall')) {
            $('#blueorange').toggleClass('iconSmall iconBig');
        }

        $('#streamer').toggleClass('resizeTitle streamerTitle');
        if ($('#viewer').hasClass('resizeTitle')) {
            $('#viewer').toggleClass('resizeTitle viewerTitle');
        }

        $('#img-manette').toggleClass('logo-manette logo-manette-resize');
        if ($('#img-screen').hasClass('logo-screen-resize')) {
            $('#img-screen').toggleClass('logo-screen-resize logo-screen');
        }

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
