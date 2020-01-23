import { Component, OnInit, ViewChild } from '@angular/core';
import { Menu } from '../../models/menu';
import { MenuService } from '../../services/menu.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-gestor-menu',
  templateUrl: './gestor-menu.component.html',
  styleUrls: ['./gestor-menu.component.css']
})
export class GestorMenuComponent implements OnInit {
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  menus: Menu[];
  menusBuscados: Menu[];
  nombreMenu: string;
  urlMenu: string;
  controlNombre = new FormControl();
  filteredMenusNombre: Observable<Menu[]>;
  controlUrl = new FormControl();
  filteredMenusUrl: Observable<Menu[]>;
  displayedColumns: string[] = ['nombre', 'descripcion', 'url', 'editar'];
  dataSource = new MatTableDataSource<Menu>(this.menusBuscados);
  isLoading: boolean;
  menuVacio: Menu = new Menu();

  constructor(private menuService: MenuService) { 
    this.isLoading = true;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.menus = this.menuService.menu;

    this.filteredMenusNombre = this.controlNombre.valueChanges
      .pipe(
        startWith(''),
        map(nombre => {
          return this._filterNombre(nombre)
        })
      );

    this.filteredMenusUrl = this.controlUrl.valueChanges
      .pipe(
        startWith(''),
        map(url => {
          return this._filterUrl(url)
        })
      );
  }

  private _filterNombre(nombre: string): Menu[] {
    const filterValue = nombre.toLowerCase();

    return this.menus.filter(menu => menu.nombre.toLowerCase().includes(filterValue));
  }

  private _filterUrl(url: string): Menu[] {
    const filterValue = url.toLowerCase();

    return this.menus.filter(menu => menu.url.toLowerCase().includes(filterValue));
  }

  buscar(): void{

    
    let menuFiltros: Menu = new Menu();
    menuFiltros.nombre = "";
    menuFiltros.url = "";

    if(this.nombreMenu !== undefined && this.nombreMenu !== null){
       menuFiltros.nombre = this.nombreMenu;
    }

    if(this.urlMenu !== undefined && this.urlMenu !== null){
        menuFiltros.url = this.urlMenu;
    }

    this.menuService.buscarMenu(menuFiltros).subscribe(response =>{
      if(response.estado == 0){
        swal.fire({
          icon: 'error',
          title: "Ocurrió un error al buscar el menú",
          text: response.msg
        })
        return;
      }
      this.isLoading = true;
      this.menusBuscados = response.datos;
      this.dataSource = new MatTableDataSource<Menu>(this.menusBuscados);
      //this.dataSource.data = this.menusBuscados;
      this.dataSource.sort = this.sort;
      if(this.menusBuscados.length > 0){
        this.isLoading = false;
      }
      
    });

  }

}
