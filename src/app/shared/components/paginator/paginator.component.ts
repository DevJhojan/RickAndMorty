import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input() currentPage: number = 0; // Página inicial
  @Input() pageSize: number = 0; // Cantidad de Pokémon por página
  @Input() totalPages: number = 0;
  @Output() loadPageGo = new EventEmitter<number>()
  @Output() previousPageGo = new EventEmitter();
  @Output() nextPageGo = new EventEmitter();
  @Output() goFirtsPage = new EventEmitter();
  @Output() goLastPage = new EventEmitter();
  goToFirstPage():void{
    this.loadPage(1);
    this.goFirtsPage.emit();
  }
  previousPage(): void{
    if (this.currentPage > 1) this.loadPage(this.currentPage - 1);
  }
  nextPage(): void{
    if (this.currentPage < this.totalPages) this.loadPage(this.currentPage + 1);
  }
  goToLastPage():void{
    this.loadPage(this.totalPages);
  }
  loadPage(page: number){
    this.loadPageGo.emit(page);
  }
}
