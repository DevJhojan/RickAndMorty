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
  filteredLocations: ILocation[] = [];
  paginatedLocation: ILocation[] = [];

  public currentPage: number = 1; // Página inicial
  public pageSize: number = 6; // Cantidad de Pokémon por página
  public totalPages: number = 1;
  constructor(private _sRAndMService: ServiceRickAndMortyService) {
    this.loadAllLocation();
  }
  loadAllLocation(): void {
    for (let i = 0; i < 42; i++) {
      this._sRAndMService.getLocations(i).subscribe((data) => {
        data.results.forEach((element:any) => {
          this.locations.push(element)
        });;
        this.locations = Array.from(
          new Map(
            this.locations.map((location) => [location.id, location])
          ).values()
        ).sort((a, b) => a.id - b.id);

        this.filterLocation();
      });
    }
  }

  filterLocation(search?: string): void {
    if (search) {
      const searchLower = search?.toLowerCase();
      this.filteredLocations = this.locations.filter((location) =>
        location.name.toLowerCase().includes(searchLower ?? '')
      );
    } else this.filteredLocations = [...this.locations];
    this.totalPages = Math.ceil(this.filteredLocations.length / this.pageSize);
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedLocation = this.filteredLocations.slice(
      startIndex,
      endIndex
    );
  }
}
