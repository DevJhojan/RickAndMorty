import { Component, Input } from '@angular/core';
import { IResult } from 'src/app/pages/Models/rick-and-morty,models';
import { DetailCharacterComponent } from '../detail-character/detail-character.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'shared-card-character',
  templateUrl: './card-character.component.html',
  styleUrls: ['./card-character.component.css'],
})
export class CardCharacterComponent {
  @Input() character?: IResult;
  constructor(public dialog: MatDialog) {}
  allInfo(): void {
    const dialogRef = this.dialog.open(DetailCharacterComponent, {
      width: '90%',
      data: this.character,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
