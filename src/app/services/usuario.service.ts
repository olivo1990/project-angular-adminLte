import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API = environment.APIUSER;
  private _usuario: Usuario;
  private _token: string;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    this._usuario = new Usuario();
  }

  public get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public get usuario(): Usuario {
    if (sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      this.loggedIn.next(true);
      return this._usuario;
    }
    this._usuario = new Usuario();
    this.loggedIn.next(false);
    return this._usuario;
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

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

    return this.http.post<any>(urlEndpoint, usuario).pipe(
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

  guardarUsuario(datos: Usuario): void {
    /*let payload = this.obtenerDatosToken(accessToken);
    console.log(payload);*/
    this._usuario = new Usuario();
    this._usuario.id = datos.id;
    this._usuario.nombre = datos.nombre;
    this._usuario.apellido = datos.apellido;
    this._usuario.cedula = datos.cedula;
    //this._usuario.correo = payload.email;
    this._usuario.username = datos.username;
    this._usuario.idPerfil = datos.idPerfil;
    this.guardarToken(datos.token);
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
    //let payload = this.obtenerDatosToken(this.token);
    let token = this.token;
    if (token != null && token) {
      this.loggedIn.next(true);
      return true;
    }
    return false;
  }

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
