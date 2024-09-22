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
  filteredEpisode: IAllResultEpisode[] = [];
  paginatedEpisode: IAllResultEpisode[] = [];

  displayedColumns: string[] = ['id', 'name', 'create', 'Characters of the episode'];


  public currentPage: number = 1; // Página inicial
  public pageSize: number = 8; // Cantidad de Pokémon por página
  public totalPages: number = 1;

  constructor(
    private sRAndMService: ServiceRickAndMortyService,
    public dialog: MatDialog
  ) {
    for (let i = 0; i < 4; i++) {
      this.sRAndMService.getAllEpisodes(i).subscribe((episodes: IEpisodes) => {
        episodes.results.forEach((element: any) => {
          this.allEpisodes.push(element);
        });
        this.allEpisodes = Array.from(
          new Map(
            this.allEpisodes.map((episode) => [episode.id, episode])
          ).values()
        ).sort((a, b) => a.id - b.id);
        this.filterEpisode();
      });
    }
  }

  allCharacter(allUrl: string[]) {
    const dialogRef = this.dialog.open(DialogAllCharactersComponent, {
      width: '100%',
      height: '35rem',
      data: allUrl,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  filterEpisode(search?: string): void {
    if (search) {
      const searchLower = search?.toLowerCase();
      this.filteredEpisode = this.allEpisodes.filter((episode) =>
        episode.name.toLowerCase().includes(searchLower ?? '')
      );
    } else this.filteredEpisode = [...this.allEpisodes];
    this.totalPages = Math.ceil(this.filteredEpisode.length / this.pageSize);
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEpisode = this.filteredEpisode.slice(startIndex, endIndex);
  }
}
