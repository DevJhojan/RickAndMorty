import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RickAndMortyComponent } from './rick-and-morty/rick-and-morty.component';
import { CharactersComponent } from './characters/characters.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { LocationsComponent } from './locations/locations.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'RickAndMorty', pathMatch: 'full' },
      {
        path: 'RickAndMorty',
        title: 'Rick & Morty',
        component: RickAndMortyComponent,
      },
      {
        path: 'Characters',
        title: 'All Characters',
        component: CharactersComponent,
      },
      { path: 'Episodes', title: 'Episodes', component: EpisodesComponent },
      { path: 'Locations', title: 'Locations', component: LocationsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
