import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MenuService } from '../../../services/menu.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  bandUsuario = false;
  bandPassword = false;
  textoErrorUsuario: string;
  textoErrorPassword: string;

  constructor(private router: Router, private authService: UsuarioService, private menuService: MenuService, private location: Location) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/inicio']);
    }
  }

  ingresar(): void {
    this.bandUsuario =  false;
    this.bandPassword =  false;

    // tslint:disable-next-line: triple-equals
    if (this.usuario.username == '' || this.usuario.username == undefined) {
      this.bandUsuario =  true;
      this.textoErrorUsuario = 'El usuario es requerido*';
      return;
    }

    // tslint:disable-next-line: triple-equals
    if (this.usuario.password == '' || this.usuario.password == undefined) {
      this.bandPassword =  true;
      this.textoErrorPassword = 'La contraseña es requerida*';
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      if(response.estado == 0){
        console.log(response.msg);
        return;
      }
      this.authService.guardarUsuario(response.datos);
      this.usuario = this.authService.usuario;
      this.consultarMenu(this.usuario);
      this.router.navigate(['/inicio']);
      //this.location. = "/inicio";
      //window.location = "/inicio";
      //this.consultarMenu(this.usuario);
    }, err => {
      // tslint:disable-next-line: triple-equals
      if (err.status == 400) {
        //swal('Error Login', 'Usuario o clave incorrectas!', 'error');
        /*titulo = 'Mensaje del servidor';
        mensaje = 'Usuario o password incorrectos!';
        this.openAlertDialog(titulo, mensaje, true);*/
      }else{
        /*titulo = 'Error del servidor!';
        mensaje = 'Ha ocurrido un error inesperado';
        this.openAlertDialog(titulo, mensaje, true);*/
      }
    });

  }

  consultarMenu(usuario: Usuario): void {
    this.menuService.consultarMenu(usuario).subscribe(response => {
      if(response.estado == 0){
        this.router.navigate(['/login']);
        return;
      }
      this.menuService.guardarMenu(response.datos);
    })
  }

}
