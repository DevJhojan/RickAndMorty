import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <main class="container">
      <button
        *ngIf="showMenu == false"
        mat-icon-button
        (click)="toggleMenu()"
        class="absolute top-0"
      >
        <i class="bi bi-menu-app-fill"></i>
      </button>
      <nav class="menu" [class.show]="showMenu">
        <button
          *ngIf="showMenu == true"
          mat-icon-button
          (click)="toggleMenu()"
          class="btn-menu"
        >
          <i class="bi bi-menu-app-fill"></i>
        </button>
        <div class="menu-content">
          <shared-menu (showMenu)="toggleMenu()"></shared-menu>
        </div>
      </nav>
      <div class="content">
        <div class="main-content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </main>
  `,
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  showMenu = true;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
