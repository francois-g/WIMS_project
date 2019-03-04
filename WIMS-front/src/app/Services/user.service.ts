import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = [{
      id: 1,
      firstName: 'François',
      lastName: 'Genot',
      mail: 'genot.françois@gmail.com',
      pseudo: 'FrançoisDu18',
      mdp: '123456',
      active: 0,
      role: 0,
    },
    {
      id: 2,
      firstName: 'Robin',
      lastName: 'Heinz',
      mail: 'heinz.robin@gmail.com',
      pseudo: 'RobinDesBois',
      mdp: '123456789',
      active: 0,
      role: 1,
    }];
    getUsers() {
      return this.user;
    }

  constructor() { }
}
