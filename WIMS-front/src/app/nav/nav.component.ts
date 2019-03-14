import { Component, OnInit } from '@angular/core';
import {UserService} from '../Services/user.service';
import {Observable} from 'rxjs';
import {User} from '../Observables/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }

}
