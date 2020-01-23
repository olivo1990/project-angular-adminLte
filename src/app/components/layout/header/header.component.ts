import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';
import { ActualizarMenuService } from '../../../services/actualizar-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router, private actualizarMenu: ActualizarMenuService) {
    this.usuario = new Usuario();
   }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario; 
  }

  logout(): void {
    this.usuarioService.logout();
    this.actualizarMenu.desconectar();
    //this.router.navigate(["/login"]);
  }

}
