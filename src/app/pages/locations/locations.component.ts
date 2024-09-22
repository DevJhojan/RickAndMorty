import { Component } from '@angular/core';
import { ServiceRickAndMortyService } from '../service/service-rick-and-morty.service';
import { ILocation } from '../Models/locations.models';
import { MatDialog } from '@angular/material/dialog';
import { DialogAllCharactersComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent {
  locations: ILocation[] = [];
  filteredLocations: ILocation[] = [];
  paginatedLocation: ILocation[] = [];

  public currentPage: number = 1; // Página inicial
  public pageSize: number = 8; // Cantidad de Pokémon por página
  public totalPages: number = 1;
  constructor(
    private _sRAndMService: ServiceRickAndMortyService,
    public dialog: MatDialog
  ) {
    this.loadAllLocation();
  }
  loadAllLocation(): void {
    for (let i = 0; i < 8; i++) {
      this._sRAndMService.getLocations(i).subscribe((data) => {
        data.results.forEach((element: any) => {
          this.locations.push(element);
        });
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
    this.paginatedLocation = this.filteredLocations.slice(startIndex, endIndex);
  }
  allResidents(allUrl: string[]) {
    const dialogRef = this.dialog.open(DialogAllCharactersComponent, {
      width: '80%',
      height: '35rem',
      data: allUrl,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
