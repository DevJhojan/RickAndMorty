import { Component, OnInit, ViewChild } from '@angular/core';
import { IResult, IRickAndMorty } from '../Models/rick-and-morty,models';
import { ServiceRickAndMortyService } from '../service/service-rick-and-morty.service';
@Component({
  selector: 'pages-characters',
  template: `
    <shared-search (filtered)="filterCharacter($event)"></shared-search>
    <main>
      <ng-container *ngFor="let character of this.paginatedCharacter">
        <shared-card-character [character]="character" [sw]="1"></shared-card-character>
      </ng-container>
    </main>
    <shared-paginator
      [currentPage]="this.currentPage"
      [pageSize]="this.pageSize"
      [totalPages]="this.totalPages"
      (loadPageGo)="loadPage($event)"
    ></shared-paginator>
  `,

  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent {
  public allCharacters: IResult[] = [];
  public filteredCharacters: IResult[] = [];
  public paginatedCharacter: IResult[] = [];
  public currentPage: number = 1; // Página inicial
  public pageSize: number = 6; // Cantidad de Pokémon por página
  public totalPages: number = 1;
  constructor(private sRAndMService: ServiceRickAndMortyService) {
    this.loadAllCharacters();
  }
  loadAllCharacters() {
    for (let i = 0; i < 42; i++) {
      this.sRAndMService
        .getAllCharacters(i)
        .subscribe((characters: IRickAndMorty) => {
          characters.results.forEach((character) => {
            this.allCharacters.push(character);
          });
          this.allCharacters = Array.from(
            new Map(
              this.allCharacters.map((character) => [character.id, character])
            ).values()
          ).sort((a, b) => a.id - b.id);

          this.filterCharacter();
        });
    }
  }

  filterCharacter(search?: string): void {
    if (search) {
      const searchLower = search?.toLowerCase();
      this.filteredCharacters = this.allCharacters.filter((character) =>
        character.name.toLowerCase().includes(searchLower ?? '')
      );
    } else this.filteredCharacters = [...this.allCharacters];
    this.totalPages = Math.ceil(this.filteredCharacters.length / this.pageSize);
    this.loadPage(this.currentPage);
  }
  loadPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCharacter = this.filteredCharacters.slice(
      startIndex,
      endIndex
    );
  }
}
