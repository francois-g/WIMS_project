import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {PriceToWin} from '../Observables/PriceToWin';
import {PricetowinService} from '../Services/pricetowin.service';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  private _price$: Observable<PriceToWin[]>;
  private _price: PriceToWin[];

  get price$(): Observable<PriceToWin[]> {
    return this._price$;
  }

  set price$(value: Observable<PriceToWin[]>) {
    this._price$ = value;
  }

  get price(): PriceToWin[] {
    return this._price;
  }

  set price(value: PriceToWin[]) {
    this._price = value;
  }
constructor(private priceToWin: PricetowinService) {
}

  ngOnInit() {
    this._price$ = this.priceToWin.getAll();
    this._price$.subscribe(
      u => {
        console.log(u + 'FG');
        this.price = u;
      },
      (err) => {
        console.log('erreur' + err);
      }
    );
  }
}
