import { Component, OnInit } from '@angular/core';
import { Menu } from '../../models/menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-gestor-menu',
  templateUrl: './gestor-menu.component.html',
  styleUrls: ['./gestor-menu.component.css']
})
export class GestorMenuComponent implements OnInit {

  menus: Menu[];
  idMenuNombre: number;
  idMenuUrl: number;

  constructor(private menuService: MenuService) { 
  }

  ngOnInit() {
    this.menus = this.menuService.menu;
  }

  buscar(): void{
    if(this.idMenuNombre === undefined){
      this.idMenuNombre = 0;
    }

    if(this.idMenuUrl === undefined){
      this.idMenuUrl = 0;
    }
    
    

  }

}
