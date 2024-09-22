import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAllResultEpisode } from 'src/app/pages/Models/episodes.models';
import { IResult } from 'src/app/pages/Models/rick-and-morty,models';
import { ServiceRickAndMortyService } from 'src/app/pages/service/service-rick-and-morty.service';
import { Status } from '../../../pages/Models/rick-and-morty,models';

@Component({
  selector: 'shared-all-characters',
  templateUrl: './dialog-all-characters.component.html',
  styleUrls: ['./dialog-all-characters.component.css'],
})
export class DialogAllCharactersComponent {
  characters: IResult[] = [];
  addingCharacters: IResult[] =[];
  public filteredCharacters: IResult[] = [];
  public paginatedCharacter: IResult[] = [];
  public currentPage: number = 1; // Página inicial
  public pageSize: number = 6; // Cantidad de Pokémon por página
  public totalPages: number = 1;
  constructor(
    public dialogRef: MatDialogRef<DialogAllCharactersComponent>,
    private sRAndMservice: ServiceRickAndMortyService,
    @Inject(MAT_DIALOG_DATA) public data: String[],
  ) {
    data.forEach((url) => {
      const array  = url.match(/\d/g);
      const numberEpisode = array!.join('')
      this.sRAndMservice.getSingleCharacter(parseInt(numberEpisode))
      .subscribe((character)=>{
        this.characters.push(character);
        this.characters = Array.from(
            new Map(
              this.characters.map((character) => [character.id, character])
            ).values()
          ).sort((a, b) => a.id - b.id);
          this.filterCharacter();
      });
    })
  }
  filterCharacter(search?: string): void {
    if (search) {
      const searchLower = search?.toLowerCase();
      this.filteredCharacters = this.characters.filter((character) =>
        character.name.toLowerCase().includes(searchLower ?? '')
      );
    } else this.filteredCharacters = [...this.characters];
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
