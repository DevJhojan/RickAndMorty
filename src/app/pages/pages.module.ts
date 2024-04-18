import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { RickAndMortyComponent } from './rick-and-morty/rick-and-morty.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CharactersComponent } from './characters/characters.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceRickAndMortyService } from './service/service-rick-and-morty.service';
import { LocationsComponent } from './locations/locations.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutComponent,
    RickAndMortyComponent,
    CharactersComponent,
    EpisodesComponent,
    LocationsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[
    ServiceRickAndMortyService
  ]
})
export class PagesModule { }
