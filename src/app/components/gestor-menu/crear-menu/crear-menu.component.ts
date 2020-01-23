import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../../../models/menu';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MenuService } from '../../../services/menu.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Icono } from '../../../models/icono';
import { IconoService } from '../../../services/icono.service';
import { ActualizarMenuService } from '../../../services/actualizar-menu.service';

@Component({
  selector: 'app-crear-menu',
  templateUrl: './crear-menu.component.html',
  styleUrls: ['./crear-menu.component.css']
})
export class CrearMenuComponent implements OnInit {
  
  menu: Menu;
  menuPadre: Menu[];
  objecPadre: Menu = new Menu();
  objecIcono: Icono= new Icono;
  controlPadre = new FormControl();
  filteredOptions: Observable<Menu[]>;
  disable:boolean = false;
  mensajeErrorTitulo: string;
  mensajeErrorUrl: string;
  mensajeErrorDescripcion: string;
  mensajeErrorObjetivo: string;
  iconosCtrl = new FormControl();
  filteredIconos: Observable<Icono[]>;
  iconos: Icono[];
  idMenu: number = 0;

  constructor(private menuService: MenuService, private location: Location, private router: Router, private iconosService: IconoService, private actualizarMenu: ActualizarMenuService) {
    this.menu = new Menu();
    this.menuPadre = this.menuService.menu;
    this.iconos = this.iconosService.iconos;
   }

  ngOnInit() {
    
    if(Object.keys(this.menuService.menuEdicion).length > 0){
      //this.menu = this.menuService.menuEdicion;
      this.idMenu = this.menuService.menuEdicion.id;
      this.menu.nombre = this.menuService.menuEdicion.nombre;
      this.menu.descripcion = this.menuService.menuEdicion.descripcion;
      this.menu.idPadre = this.menuService.menuEdicion.idPadre;
      this.menu.url = this.menuService.menuEdicion.url;
      this.menu.target = this.menuService.menuEdicion.target;
      this.menu.orden = this.menuService.menuEdicion.orden;
      this.menu.icono = this.menuService.menuEdicion.icono;
      this.objecPadre.id = this.menu.idPadre;
      this.objecIcono.icono = this.menu.icono;
      
      if(this.menu.idPadre > 0){
        this.disable = true;
      }
      
      this.menuPadre.filter(menu => { 
        if(menu.id === this.menu.idPadre){
          console.log(menu.nombre);
          this.objecPadre.nombre = menu.nombre;
        }
      })

      this.iconos.filter(icono => { 
        if(icono.icono === this.menu.icono){
          this.objecIcono.nombre = icono.nombre;
        }
      })
    }

    this.filteredOptions = this.controlPadre.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filter(nombre) : this.menuPadre.slice())
      );

      this.filteredIconos = this.iconosCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filterIconos(nombre) : this.iconos.slice())
      );
      
  }

  private _filterIconos(nombre: string): Icono[] {
    const filterValue = nombre.toLowerCase();

    return this.iconos.filter(icono => {
      return icono.nombre.toLowerCase().indexOf(filterValue) === 0
    });
  }

  displayFn(menu?: Menu): string | undefined {
    return menu ? menu.nombre : undefined;
  }

  displayFnIcono(icono?: Icono): string | undefined {
    return icono ? icono.nombre : undefined;
  }

  private _filter(nombre: string): Menu[] {
    const filterValue = nombre.toLowerCase();

    return this.menuPadre.filter(menu => {
      return menu.nombre.toLowerCase().indexOf(filterValue) === 0
    });
  }

  showPadre(): void{
   this.disable = !this.disable;
   this.objecPadre = new Menu;
  }

  crear(): void{
    let idPadre: number = 0;
    let icono: string = 'label';
    
    if(this.objecPadre !== undefined && Object.keys(this.objecPadre).length !== 0){
      idPadre = this.objecPadre.id;
    }

    if(this.objecIcono !== undefined && Object.keys(this.objecIcono).length !== 0){
      icono = this.objecIcono.icono;
    }

    if(this.menu.nombre === undefined || this.menu.nombre === ""){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo título es obligatorio!'
      })
      return;
    }

    if(this.menu.descripcion === undefined || this.menu.descripcion === ""){
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo descripción es obligatorio!'
      })
      return;
    }
    
    if(this.menu.url === undefined || this.menu.url === ""){
      if(this.menu.url){
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El campo url es obligatorio!'
        })
        return;
      }
    }

    this.menu.idPadre = idPadre;
    this.menu.icono = icono;

    this.menuService.crudMenu(this.menu, this.idMenu).subscribe(response =>{

      if(response.estado == 0){
        swal.fire({
          icon: 'error',
          title: "Ocurrió un error al guardar el menú",
          text: response.msg
        })
        return;
      }

      this.menu.idMenu = response.datos;

      this.actualizarMenu.enviarMensaje(this.menu, this.idMenu);
      this.router.navigate(['/gestor-menu']);

      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Se ha gusrdado con éxito el menú ${this.menu.nombre}`,
        showConfirmButton: false,
        timer: 1500
      })

    })

  }


  regresar(): void{
    this.location.back();
  }

}
