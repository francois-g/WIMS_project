import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../Services/user.service';
import {User} from '../Observables/User';
import {Observable} from 'rxjs';
import * as JWT from 'jwt-decode';
import {log} from 'util';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    get openInp(): boolean {
        return this._openInp;
    }

    set openInp(value: boolean) {
        this._openInp = value;
    }

    u;
    private _userCurrent = new User();
    private _openInp: boolean;

    get userCurrent(): User {
        return this._userCurrent;
    }

    set userCurrent(value: User) {
        this._userCurrent = value;
    }

    private _formProfile: FormGroup;

    get formProfile(): FormGroup {
        return this._formProfile;
    }
    set formProfile(value: FormGroup) {
        this._formProfile = value;
    }
    private _outputProfile: {
        FirstName: string,
        LastName: string,
        Pseudo: string,
        Pswd: string,
        Email: string,
    };
    get outputProfile(): { FirstName: string; LastName: string; Pseudo: string; Pswd: string; Email: string;} {
        return this._outputProfile;
    }
    set outputProfile(value: { FirstName: string; LastName: string; Pseudo: string; Pswd: string; Email: string; }) {
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
        });
    }
    onSubmitProfile() {
        // if (this.formProfile.valid) {
        this.u = new User();
        if (this.formProfile.value.FirstName !== '') {
            this.u.FirstName = this.formProfile.value.FirstName;
        }
        if (this.formProfile.value.LastName !== '') {
            this.u.LastName = this.formProfile.value.LastName;
        }
        if (this.formProfile.value.Pseudo !== '') {
            this.u.Pseudo = this.formProfile.value.Pseudo;
        }
        if (this.formProfile.value.Pswd !== '') {
            this.u.Pswd = this.formProfile.value.Pswd;
        }
        if (this.formProfile.value.Email !== '') {
            this.u.Email = this.formProfile.value.Email;
        }
        console.log(this.formProfile.value.FirstName);
        console.log(this.u);
        this.Users.update(this.userCurrent.Id, this.u).subscribe(
            () => {
                console.log('coucou' + this.u);
            },
            (err) => {
                console.log('erreur' + JSON.stringify(err));
            }
        );
        // }
        // stop here if form is invalid
        // else {
        //     this.submittedConnectionStreamer = false;
        // }
    }

    ngOnInit() {
        this.openInp = false;
        this.userCurrent = JWT(sessionStorage.getItem('currentUser'));
        console.log(this.userCurrent);
        console.log(this.userCurrent.Id);
        this.Users.getById(this.userCurrent.Id)
            .subscribe(
                u => {
                    console.log(u);
                    this.userCurrent = u;
                },
                (err) => {
                    console.log('error' + JSON.stringify(err));
                }
            );
    }

    openInput() {
        this.openInp = true;
    }

    closeInput() {
        this.openInp = false;
    }
}
