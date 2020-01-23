import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Menu } from '../../../models/menu';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Usuario } from '../../../models/usuario';
import { MenuService } from '../../../services/menu.service';
import { Router } from '@angular/router';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {

  usuario: Usuario;
  menuArreglo: any[] = [];

  config = {
    paddingAtStart: true,
    classname: 'tree-menu-custom',
    listBackgroundColor: '',
    fontColor: '',
    backgroundColor: '',
    selectedListFontColor: '#000',
  };

  constructor(private usuarioService: UsuarioService, public menuService: MenuService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    this.loadIndex();
    this.menuService.menuArregloObs();
    //this.menuService.getMenu();
  }


  loadIndex() {
    this.menuService.currentIndexObs.subscribe(
      response => {
        if (response) {
          this.menuArreglo = response;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  selectedItem(event:any):void{
    this.router.navigate([event.link]);
  }

}
