import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = new Usuario();
   }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario; 
  }

  logout(): void {
    this.usuarioService.logout();
    //this.router.navigate(["/login"]);
  }

}
