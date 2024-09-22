import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search',
  template: `
    <input
      type="text"
      class="search"
      placeholder="Buscar Pokémon..."
      [(ngModel)]="searchText"
      (ngModelChange)="filter()"
    />
  `,
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchText: string = '';
  @Output() filtered = new EventEmitter<string>()
  filter():void{
    this.filtered.emit(this.searchText)
  }
}
