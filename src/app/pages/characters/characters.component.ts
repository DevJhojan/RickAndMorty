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
  allCharacters: IResult[] = [];
  addingCharacters: IResult[] = [];
  searchTerm: String = '';
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = true;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent;
  dataSource: any;
  constructor(
    private sRAndMService: ServiceRickAndMortyService,
    public dialog: MatDialog
  ) {
    this.pageEvent = new PageEvent();
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
          this.dataSource = new MatTableDataSource(this.allCharacters);
          try {
            this.updatePaginator();
          } catch (e: any) {
            console.warn('problem length');
          }
          this.enablePaginator = true;
        });
    }
  }
  ngOnInit(): void {
    this.allCharacters = [...this.allCharacters];
    this.applyFilter();
    this.handlePageEvent(this.paginator);
  }

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
      width: '60%',
      data: character,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  updatePaginator() {
    this.length = this.dataSource.data.length;
    this.paginator.length = this.length;
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = this.pageIndex;
    this.handlePageEvent(this.paginator);
  }
}
