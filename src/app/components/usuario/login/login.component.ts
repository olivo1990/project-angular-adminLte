import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  usuario:Usuario;
  bandUsuario:boolean = false;
  bandPassword:boolean = false;
  textoErrorUsuario:string;
  textoErrorPassword:string;

  constructor() { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  ingresar():void {
    this.bandUsuario =  false;
    this.bandPassword =  false;

    if(this.usuario.username == "" || this.usuario.username == undefined){
      this.bandUsuario =  true;
      this.textoErrorUsuario = "El usuario es requerido*";
      return;
    }

    if(this.usuario.password == "" || this.usuario.password == undefined){
      this.bandPassword =  true;
      this.textoErrorPassword = "La contraseña es requerida*";
      return;
    }

    console.log(this.bandUsuario);
  }

}
