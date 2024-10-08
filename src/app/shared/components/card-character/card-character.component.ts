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
  @Input() sw: number=0;
  allInfo(): void {
    if(this.sw==1){
      const dialogRef = this.dialog.open(DetailCharacterComponent, {
        height: '30rem',
        data: this.character,
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    } else alert("You are now seeing "+ this.character?.name +"'s description")
  }
}
