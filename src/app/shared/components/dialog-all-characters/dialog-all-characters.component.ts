import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAllResultEpisode } from 'src/app/pages/Models/episodes.models';
import { IResult } from 'src/app/pages/Models/rick-and-morty,models';
import { ServiceRickAndMortyService } from 'src/app/pages/service/service-rick-and-morty.service';
import { Status } from '../../../pages/Models/rick-and-morty,models';

@Component({
  selector: 'shared-all-characters',
  templateUrl: './dialog-all-characters.component.html',
  styleUrls: ['./dialog-all-characters.component.css'],
})
export class DialogAllCharactersComponent {
  characters: IResult[] = [];
  addingCharacters: IResult[] =[];
  status!: boolean;
  Status!: Status;
  constructor(
    public dialogRef: MatDialogRef<DialogAllCharactersComponent>,
    private sRAndMservice: ServiceRickAndMortyService,
    @Inject(MAT_DIALOG_DATA) public data: String[]
  ) {
    data.forEach((url) => {
      const array  = url.match(/\d/g);
      const numberEpisode = array!.join('')
      this.sRAndMservice.getSingleCharacter(parseInt(numberEpisode))
      .subscribe((character)=>{
        if(character.status === Status.Alive) this.status = true;
        else this.status = false;
        this.addingCharacters.push(character);
        this.characters = this.addingCharacters;
      });
    })
  }
}
