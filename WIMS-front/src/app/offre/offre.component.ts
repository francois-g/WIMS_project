import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-offre',
    templateUrl: './offre.component.html',
    styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
    heures = [];
    minutes = [];
    submittedOffre;
    private _formOffre: FormGroup;
    get formOffre(): FormGroup{
        return this._formOffre;
    }
    set formOffre(value : FormGroup){
        this._formOffre = value;
    }
    private _outputOffre: {
        gameName: string,
        description: string,
        startValue: number,
        dateFin: string,
        heureFin: string,
    };
    get outputOffre(): { gameName: string; description: string; startValue: number; dateFin: string; heureFin: string } {
        return this._outputOffre;
    }
    set outputOffre(value: { gameName: string; description: string; startValue: number; dateFin: string; heureFin: string }) {
        this._outputOffre = value;
    }
    constructor(private builder: FormBuilder) {
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
            'heureFin': ['', [
                Validators.required,
            ]
            ],
        });
    }
ngOnInit(): void {
    for (let i = 0; i < 24; i++) {
        this.heures[i] = i;
    }
    for (let i = 0; i < 61; i++) {
        this.minutes[i] = i;
    }
}
    onSubmitOffre() {
        if (this.formOffre.valid) {
            this.submittedOffre = true;
        }
        // stop here if form is invalid
        else {
            this.submittedOffre = false;
        }
    }
}
