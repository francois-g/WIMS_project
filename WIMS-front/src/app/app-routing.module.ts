import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InscriptionComponent} from './inscription/inscription.component';
import {ChoixComponent} from './choix/choix.component';
import {AllOffersComponent} from './all-offers/all-offers.component';
import {NavComponent} from './nav/nav.component';
import {OffreComponent} from './offre/offre.component';
import {ContactComponent} from './contact/contact.component';


const routes: Routes = [
  { path: '', component: ChoixComponent },
  { path: 'Choix', component: ChoixComponent },
  { path: 'AllOffers', component: AllOffersComponent },
  { path: 'Menu', component: NavComponent },
  { path: 'Offre', component: OffreComponent },
  { path: 'Contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
