import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../Services/user.service';
import {Observable} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';
import {User} from '../Observables/User';
import {PricetowinService} from '../Services/pricetowin.service';


@Component({
  selector: 'app-choix',
  templateUrl: './choix.component.html',
  styleUrls: ['./choix.component.css']
})
export class ChoixComponent implements OnInit {
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

  constructor(private builder: FormBuilder, private Users: UserService) {
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
    if(this.formConnexionStreamer.valid){
      this.submittedConnectionStreamer = true;
      console.log(this.formConnexionStreamer.value.pseudoStreamer);
    }
    // stop here if form is invalid
    else{
      this.submittedConnectionStreamer = false;
    }
  }
  onSubmitInscriptionStreamer() {

    if(this.formInscriptionStreamer.valid){
      this.submittedInscriptionStreamer = true;
    }
    // stop here if form is invalid
    else{
      this.submittedInscriptionStreamer = false;
    }
  }
  onSubmitConnexionViewer() {

    if(this.formConnexionViewer.valid){
      this.submittedConnectionViewer = true;
  }
    // stop here if form is invalid
    else{
      this.submittedConnectionViewer = false;
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
        console.log(u + 'FG');
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
    console.log('Formulaire de connexion Viewer Valeur = ' + this.viewer);
  }
  formStreamer(value) {
    this.streamer = value;
    this.viewer = 0;
    console.log('Formulaire de connexion Streamer Valeur = ' + this.streamer);
  }
  streamerInscription(value){
    this.streamer = value;
  }
  viewerInscription(value){
    this.viewer = value;
  }

}
