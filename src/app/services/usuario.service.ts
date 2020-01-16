import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API = environment.API;
  private _usuario: Usuario;
  private _token: string;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this._usuario = new Usuario();
  }

  public get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public get usuario(): Usuario {
    if (sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    this._usuario = new Usuario();
    return this._usuario;
  }

  /*public get usuario(): Usuario {

    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }*/

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }


  /*registrar(usuario: Usuario): Usuario {

    this.usuario = usuario;

    return this.usuario;
  }*/

  registrar(usuario: Usuario): Observable<Usuario> {

    return this.http.post(`${this.API}/usuarios/registrar`, usuario, { })
      .pipe(
        map((response: any) => response.usuario as Usuario),
        catchError(e => {

          if (e.status == 400) {
            return throwError(e);
          }

          if(e.error.mensaje){
            console.log(e.error.mensaje);
          }
          return throwError(e);
        })
      );
   }

   login(usuario: Usuario): Observable<any> {
    const urlEndpoint = this.API+'/login';

    return this.http.put<any>(urlEndpoint, usuario).pipe(
      catchError(e => {
        if(e.status==400){
            return throwError(e);
        }
        if(e.error.mensaje){
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    console.log(payload);
    this._usuario = new Usuario();
    this._usuario.id = payload.id;
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    //this._usuario.correo = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.idPerfil = payload.idPerfil;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      this.loggedIn.next(true);
      return true;
    }
    return false;
  }

  /*hasRole(role: string): boolean {
    if (this._usuario.perfiles.includes(role)) {
      return true;
    }
    return false;
  }*/

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('menu');
    this.loggedIn.next(false);
  }
}
