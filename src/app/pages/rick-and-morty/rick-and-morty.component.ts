import { Component } from '@angular/core';
import { ServiceRickAndMortyService } from '../service/service-rick-and-morty.service';
import { subscribeOn } from 'rxjs';
import { IResult } from '../Models/rick-and-morty,models';
import { MatDialog } from '@angular/material/dialog';
import { DetailCharacterComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-rick-and-morty',
  template: `
    <div>
      <img
        src="../../../assets/Img/titleRickAndMorty.gif"
        alt="title RickAndMorty"
        class="title"
      />
      <shared-card-character class="character-principal" [character]="characterRick"></shared-card-character>
      <shared-card-character class="principal-2" [character]="characterMorty"></shared-card-character>
    </div>
  `,
  styleUrls: ['./rick-and-morty.component.css'],
})
export class RickAndMortyComponent {
  rick: string = '';
  morty: string = '';
  characterRick!: IResult;
  characterMorty!: IResult;
  constructor(private sRMs: ServiceRickAndMortyService, public dialog:MatDialog) {
    this.sRMs.getSingleCharacter(1).subscribe((rick) => {
      this.rick = rick.image;
      this.characterRick = rick;
    });

    this.sRMs.getSingleCharacter(2).subscribe((morty) => {
      this.morty = morty.image;
      this.characterMorty = morty;
    });
  }
  allInfo(character: IResult):void{
    const dialogRef = this.dialog.open(DetailCharacterComponent, {
      width: '90%',
      data: character,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
