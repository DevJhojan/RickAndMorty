import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IResult } from 'src/app/pages/Models/rick-and-morty,models';

@Component({
  selector: 'app-detail-character',
  templateUrl: './detail-character.component.html',
  styleUrls: ['./detail-character.component.css'],
})
export class DetailCharacterComponent {
  episodes: String[] = [];
  constructor(
    public dialogRef: MatDialogRef<DetailCharacterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IResult
  ) {
    this.data.episode.forEach((episode) => {
      const array  = episode.match(/\d/g);
      const numberEpisode = array!.join('')
      this.episodes.push(numberEpisode);
    });
  }
}
