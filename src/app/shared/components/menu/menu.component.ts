import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ItemsMenu{
  name: string,
  url: string,
}
@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  showMenu = true;
  showFiller = false;
  constructor(private router: Router){
  }
  items = [
    {name: 'Rick & Morty', url: '/home'},
    {name: 'Characters', url:'/home/Characters'},
    {name: 'Episodes', url:'/home/Episodes'},
    {name: 'Locations', url:'/home/Locations'},
  ]
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  navigate(url: string){
   this.router.navigate([url]);
  }
}
