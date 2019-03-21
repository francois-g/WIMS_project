import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../Services/user.service';
import {User} from '../Observables/User';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
u;

    private _formProfile: FormGroup;
    get formProfile(): FormGroup{
        return this._formProfile;
    }
    set formProfile(value : FormGroup){
        this._formProfile = value;
    }
    private _outputProfile: {
        FirstName: string,
        LastName: string,
        Pseudo: string,
        Pswd: string,
        Email: string,
        Avatar: string,
    };
    get outputProfile(): { FirstName: string; LastName: string; Pseudo: string; Pswd: string; Email: string; Avatar: string;} {
        return this._outputProfile;
    }
    set outputProfile(value: { FirstName: string; LastName: string; Pseudo: string; Pswd: string; Email: string; Avatar: string; }) {
        this._outputProfile = value;
    }
    constructor(private builder: FormBuilder, private Users: UserService) {
        this.formProfile = this.builder.group({
            'FirstName': ['', [
                Validators.required,
            ]
            ],
            'LastName': ['', [
                Validators.required,
            ]
            ],
            'Pseudo': ['', [
                Validators.required,
            ]
            ],
            'Pswd': ['', [
                Validators.required,
            ]
            ],
            'Email': ['', [
                Validators.required,
            ]
            ],
            'Avatar': ['', [
                Validators.required,
            ]
            ],
        });
    }
    onSubmitProfile() {
        // if (this.formProfile.valid) {
        this.u = new User();
        this.u.FirstName = this.formProfile.value.FirstName;
        console.log(this.formProfile.value.FirstName);
        this.Users.update(this.u).subscribe(
            () => {
                   console.log(this.u);
                },
                (err) => {
                    console.log('erreur' + err);
                }
            );
        // }
        // stop here if form is invalid
        // else {
        //     this.submittedConnectionStreamer = false;
        // }
    }
  ngOnInit() {

  }

}
