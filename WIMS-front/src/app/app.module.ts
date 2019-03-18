import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChoixComponent } from './choix/choix.component';
import { InscriptionComponent } from './inscription/inscription.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material';
import {MatCardModule, MatCard} from '@angular/material/card';
import { NavComponent } from './nav/nav.component';
import { AllOffersComponent } from './all-offers/all-offers.component';
import { OffreComponent } from './offre/offre.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import {SearchBoxComponent} from './search-box/search-box.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    ChoixComponent,
    InscriptionComponent,
    NavComponent,
    AllOffersComponent,
    OffreComponent,
    ContactComponent,
    FooterComponent,
    ProfileComponent,
    HomeComponent,
    SearchBoxComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
