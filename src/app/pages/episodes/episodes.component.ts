import { Component, ViewChild } from '@angular/core';
import { ServiceRickAndMortyService } from '../service/service-rick-and-morty.service';
import { MatDialog } from '@angular/material/dialog';
import { IAllResultEpisode, IEpisodes } from '../Models/episodes.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DialogAllCharactersComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css'],
})
export class EpisodesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  allEpisodes: IAllResultEpisode[] = [];
  addingEpisodes: IAllResultEpisode[] = [];
  displayedColumns: string[] = ['id', 'name', 'create', 'characters'];

  length = this.allEpisodes.length;
  pageSize = 6;
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
    for (let i = 0; i < 3; i++) {
      this.sRAndMService.getAllEpisodes(i).subscribe((episodes: IEpisodes) => {
        episodes.results.forEach((episode) => {
          this.addingEpisodes.push(episode);
        });
        this.allEpisodes = this.addingEpisodes;
        this.dataSource = new MatTableDataSource(this.allEpisodes);
        this.updatePaginator();
      });
    }
  }
  ngAfterViewInit() {
    try{
      this.dataSource.paginator = this.paginator;
    }catch (e){
      console.warn(`Error: ${e}`)
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    const startIndex = e.pageIndex * e.pageSize;
    const endIndex = startIndex + e.pageSize;
    const dataSlice = this.allEpisodes.slice(startIndex, endIndex);
    // Asignar los datos correspondientes a la página actual a la fuente de datos
    this.dataSource.data = dataSlice;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
  allCharacter(allUrl: string[]) {
    const dialogRef = this.dialog.open(DialogAllCharactersComponent, {
      data: allUrl,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  updatePaginator() {
    // Actualizar la longitud de la fuente de datos
    this.length = this.dataSource.data.length;
    // Actualizar el paginador
    this.paginator.length = this.length;
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = this.pageIndex;
    this.handlePageEvent(this.paginator);
  }
}
