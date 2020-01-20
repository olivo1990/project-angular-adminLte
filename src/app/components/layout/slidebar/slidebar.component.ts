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

  constructor(private usuarioService: UsuarioService, public menuService: MenuService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
      jQuery.AdminLTE.layout.activate();
    });
    this.usuario = this.usuarioService.usuario;
    this.menuService.getMenu();
  }

}
