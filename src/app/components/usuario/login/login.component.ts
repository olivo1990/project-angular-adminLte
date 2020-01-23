import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MenuService } from '../../../services/menu.service';
import { Location } from '@angular/common';
import swal from 'sweetalert2';
import { ActualizarMenuService } from '../../../services/actualizar-menu.service';

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

  constructor(private router: Router, private authService: UsuarioService, private menuService: MenuService, private location: Location, private actualizarMenu: ActualizarMenuService) {
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
        swal.fire(
          'Error al iniciar sesión',
          response.msg,
          'error'
        )
        return;
      }
      this.authService.guardarUsuario(response.datos);
      this.usuario = this.authService.usuario;
      this.consultarMenu(this.usuario);
      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Bienvenido ${this.usuario.nombre} ${this.usuario.apellido}`,
        showConfirmButton: false,
        timer: 1500
      })
      this.actualizarMenu.conectar();
      this.router.navigate(['/inicio']);
    }, err => {
      // tslint:disable-next-line: triple-equals
      if (err.status == 400) {
        swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
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
