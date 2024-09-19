import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { IResult } from 'src/app/pages/Models/rick-and-morty,models';
import { DialogAllCharactersComponent } from '../dialog-all-characters/dialog-all-characters.component';
import { ServiceRickAndMortyService } from 'src/app/pages/service/service-rick-and-morty.service';

@Component({
  selector: 'app-detail-character',
  templateUrl: './detail-character.component.html',
  styleUrls: ['./detail-character.component.css'],
})
export class DetailCharacterComponent {
  episodes: number[] = [];
  constructor(
    public dialogRef: MatDialogRef<DetailCharacterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IResult,
    public dialog: MatDialog,
    public sRAMService: ServiceRickAndMortyService
  ) {
    this.data.episode.forEach((episode) => {
      const array = episode.match(/\d/g);
      const numberEpisode = array!.join('');
      this.episodes.push(parseInt(numberEpisode));
    });
  }

  allCharacter(numberEpisode: number) {
    let allUrl: string[] = [];
    this.sRAMService.getSingleEpisode(numberEpisode).subscribe((data) => {
      allUrl = data.characters;
      const dialogRef = this.dialog.open(DialogAllCharactersComponent, {
        width: '80%',
        height: '35rem',
        data: allUrl,
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
      });
    });
  }
}
