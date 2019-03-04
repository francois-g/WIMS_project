import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  private _formContact: FormGroup;
  get formContact(): FormGroup{
    return this._formContact;
  }
  set formContact(value : FormGroup){
    this._formContact = value;
  }
  private _outputContact: {
    sujet: string,
    message: string,
  };
  get outputContact(): { sujet: string; message: string; } {
    return this._outputContact;
  }
  set outputConatct(value: { sujet: string; message: string; }) {
    this._outputContact = value;
  }
  constructor(private builder: FormBuilder) {
    this.formContact = this.builder.group({
      'sujet': ['', [
        Validators.required,
      ]
      ],
      'message': ['', [
        Validators.required,
      ]
      ],
    });
  }

  ngOnInit() {
  }

}
