import { Component, OnInit, ViewChild } from '@angular/core';
import { IResult, IRickAndMorty } from '../Models/rick-and-morty,models';
import { ServiceRickAndMortyService } from '../service/service-rick-and-morty.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DetailCharacterComponent } from 'src/app/shared/components/detail-character/detail-character.component';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  enablePaginator!: boolean;
  addingCharacters: IResult[];
  public allCharacters: IResult[];
  public filteredCharacters: IResult[] = [];
  public paginatedCharacter: IResult[] = [];
  searchTerm: String = '';
  length = 0;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = true;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent;
  dataSource: any;


  public searchText: string = '';
  public currentPage: number = 1; // Página inicial
  public pageSize: number = 6; // Cantidad de Pokémon por página
  public totalPages: number = 1;
  constructor(
    private sRAndMService: ServiceRickAndMortyService,
    public dialog: MatDialog
  ) {
    this.pageEvent = new PageEvent();
    this.allCharacters = [];
    this.addingCharacters = [];
    this.dataSource = new MatTableDataSource(this.allCharacters);
    this.loadAllCharacters();
  }
  loadAllCharacters() {
    for (let i = 0; i < 42; i++) {
      this.sRAndMService
        .getAllCharacters(i)
        .subscribe((characters: IRickAndMorty) => {
          characters.results.forEach((character) => {
            this.addingCharacters.push(character);
          });
          this.allCharacters = this.addingCharacters;
          this.allCharacters = Array.from(
            new Map(
              this.allCharacters.map((character) => [character.id, character])
            ).values()
          ).sort((a, b) => a.id - b.id);

          this.filterCharacter()
        });
    }
  }
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.paginator ? (this.dataSource.paginator = this.paginator) : '';
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    const startIndex = e.pageIndex * e.pageSize;
    const endIndex = startIndex + e.pageSize;
    const dataSlice = this.allCharacters.slice(startIndex, endIndex);
    this.dataSource.data = dataSlice;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
  applyFilter() {
    if (this.searchTerm == '') {
      this.allCharacters = [];
      this.addingCharacters = [];
      this.loadAllCharacters();
      return;
    }
    this.dataSource = new MatTableDataSource(
      this.allCharacters.filter((character) =>
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
    this.enablePaginator = false;
  }
  allInfo(character: IResult): void {
    const dialogRef = this.dialog.open(DetailCharacterComponent, {
      width: '90%',
      data: character,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  filterCharacter(): void {
    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      this.filteredCharacters = this.allCharacters.filter((character) =>
        character.name.toLowerCase().includes(searchLower)
      );
    } else {
      this.filteredCharacters = [...this.allCharacters];
    }

    this.totalPages = Math.ceil(this.filteredCharacters.length / this.pageSize);
    this.loadPage(this.currentPage);
  }
   loadPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCharacter = this.filteredCharacters.slice(startIndex, endIndex);
  }
   previousPage(): void {
    if (this.currentPage > 1) {
      this.loadPage(this.currentPage - 1);
    }
  }

   nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadPage(this.currentPage + 1);
    }
  }
  goToFirstPage(): void {
    this.loadPage(1);
  }

  // Función para ir a la última página
  goToLastPage(): void {
    this.loadPage(this.totalPages);
  }
}
