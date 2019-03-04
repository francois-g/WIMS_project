import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent implements OnInit {
  submittedNewEnchere;
  actualPrice = 15;
  enchereId;
  private _formNewEnchere: FormGroup;
  get formNewEnchere(): FormGroup{
    return this._formNewEnchere;
  }
  set formNewEnchere(value : FormGroup){
    this._formNewEnchere = value;
  }
  private _outputNewEnchere : {
    newEnchere: number,
  };
  get outputNewEnchere(): { newEnchere: number } {
    return this._outputNewEnchere;
  }
  set outputNewEnchere(value: { newEnchere: number }) {
    this._outputNewEnchere = value;
  }
  constructor(private builder: FormBuilder) {
    this.formNewEnchere = this.builder.group({
      'newEnchere': ['', [
        Validators.required,
      ]
      ],
    });
  }

  ngOnInit() {
  }
  Encherir(value) {
    this.enchereId = value;
  }

  onSubmitNewEnchere() {

    if(this.formNewEnchere.valid){
      this.submittedNewEnchere = true;
    }
    // stop here if form is invalid
    else{
      this.submittedNewEnchere = false;
    }
  }
}
