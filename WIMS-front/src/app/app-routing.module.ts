import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InscriptionComponent} from './inscription/inscription.component';
import {ChoixComponent} from './choix/choix.component';
import {AllOffersComponent} from './all-offers/all-offers.component';
import {NavComponent} from './nav/nav.component';
import {OffreComponent} from './offre/offre.component';
import {ContactComponent} from './contact/contact.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {SearchBoxComponent} from './search-box/search-box.component';
import {AboutComponent} from './about/about.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'Choice', component: ChoixComponent },
    { path: 'AllOffers', component: AllOffersComponent },
    { path: 'Menu', component: NavComponent },
    { path: 'Offer', component: OffreComponent },
    { path: 'Contact', component: ContactComponent },
    { path: 'Profile', component: ProfileComponent },
    { path: 'searchbox', component: SearchBoxComponent},
    { path: 'A propos', component: AboutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
