import { Component } from '@angular/core';
import { ServiceRickAndMortyService } from '../service/service-rick-and-morty.service';
import { ILocation } from '../Models/locations.models';

// todo: hacer lo mismo que en el componente de episodios

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent {
  //todo: configurar paginandor y buscador 
  locations: ILocation[] = [];
  constructor(private _sRAndMService: ServiceRickAndMortyService) {
    _sRAndMService.getLocations(1).subscribe((data) => {
      this.locations = data.results;
      this.locations = Array.from(
        new Map(
          this.locations.map((character) => [character.id, character])
        ).values()
      ).sort((a, b) => a.id - b.id);
      console.log(this.locations);
    });
  }
}
