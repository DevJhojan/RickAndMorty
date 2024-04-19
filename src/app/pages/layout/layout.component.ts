import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <mat-sidenav-container class="h-full">
      <mat-sidenav #sidenav mode="side" [opened]="showMenu" class="wi-side">
        <button
          *ngIf="showMenu == true"
          mat-icon-button
          (click)="toggleMenu()"
          class="absolute top-0"
        >
          <mat-icon>menu</mat-icon>
        </button>
        <shared-menu (showMenu)="toggleMenu()"></shared-menu>
      </mat-sidenav>
      <mat-sidenav-content class=" overflow-hidden bg-black-super">
        <div class="ml-4">
          <router-outlet></router-outlet>
        </div>
        <button
          *ngIf="showMenu == false"
          mat-icon-button
          (click)="toggleMenu()"
          class="btn-menu"
        >
          <mat-icon>menu</mat-icon>
        </button>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  showMenu = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
