import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../models/menu';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MenuService } from '../../../services/menu.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-menu',
  templateUrl: './crear-menu.component.html',
  styleUrls: ['./crear-menu.component.css']
})
export class CrearMenuComponent implements OnInit {
  
  menu: Menu;
  menuPadre: Menu[];
  objecPadre: Menu;
  controlPadre = new FormControl();
  filteredOptions: Observable<Menu[]>;
  disable:boolean = false;
  mensajeErrorTitulo: string;
  mensajeErrorUrl: string;
  mensajeErrorDescripcion: string;
  mensajeErrorObjetivo: string;

  constructor(private menuService: MenuService, private location: Location, private router: Router) {
    this.menu = new Menu();
    this.menuPadre = this.menuService.menu;
   }

  ngOnInit() {

    this.filteredOptions = this.controlPadre.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filter(nombre) : this.menuPadre.slice())
      );
      
  }

  displayFn(menu?: Menu): string | undefined {
    return menu ? menu.nombre : undefined;
  }

  private _filter(nombre: string): Menu[] {
    const filterValue = nombre.toLowerCase();

    return this.menuPadre.filter(menu => {
      return menu.nombre.toLowerCase().indexOf(filterValue) === 0
    });
  }

  showPadre(): void{
   this.disable = !this.disable;
  }

  crear(): void{
    let idPadre: number = 0;
    if(this.objecPadre !== undefined){
      idPadre = this.objecPadre.id;
    }

    /*if(this.menu.nombre === undefined){
      this.mensajeErrorTitulo = "El campo título es obligatorio";
      return;
    }

    if(this.menu.descripcion === undefined){
      this.mensajeErrorDescripcion = "El campo descripción es obligatorio";
      return;
    }

    if(this.menu.url){
      this.mensajeErrorUrl = "El campo url es obligatorio";
      return;
    }
    
    if(this.menu.target){
      this.mensajeErrorObjetivo = "El campo target es obligatorio";
      return;
    }*/

    console.log(idPadre);

    this.menuService.insertarMenu(this.menu).subscribe(response =>{

      if(response.estado == 0){
        console.log(response.msg);
        return;
      }
      
      this.router.navigate(['/gestor-menu'])
      
      console.log(response);

    })

  }

  regresar(): void{
    this.location.back();
  }

}
