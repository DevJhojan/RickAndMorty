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
      <img
        [src]="rick"
        alt="Rick Sanchez"
        [matTooltip]="this.characterRick.name"
        matTooltipPosition="below"
        class="character-principal"
        (click)="allInfo(characterRick)"
      />
      <img
        [src]="morty"
        alt="Morty Smith"
        [matTooltip]="this.characterMorty.name"
        matTooltipPosition="above"
        class="character-principal principal-2"
        (click)="allInfo(characterMorty)"
      />
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
      width: '50%',
      data: character,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
