import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <main class="container">
      <button
        (click)="toggleMenu()"
        class="btn-menu"
      >
        <i class="bi bi-menu-app-fill"></i>
      </button>
      <nav class="menu" [class.show]="showMenu">
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
  showMenu = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
