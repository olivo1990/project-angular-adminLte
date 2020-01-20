import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from '../models/menu';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _menu: Menu[] = [];
  private menuObs = new BehaviorSubject<Menu[]>([]);
  public menuObs$ = this.menuObs.asObservable();
  private API = environment.APIMENU;

  constructor(private http: HttpClient) { }

  public getMenu(): void {
    if (this._menu.length>0) {
      this.menuObs.next(this._menu);
    } else if (this._menu.length === 0 && sessionStorage.getItem('menu') != null) {
      let menu = JSON.parse(sessionStorage.getItem('menu')) as Menu[];
      this.menuObs.next(menu);
    }
  }

  public get menu(): Menu[]{
    if (this._menu.length>0) {
      return this._menu;
    } else if (this._menu.length === 0 && sessionStorage.getItem('menu') != null) {
      let menu = JSON.parse(sessionStorage.getItem('menu')) as Menu[];
      this._menu = menu;
      return this._menu;
    }
    return this._menu;
  }

  guardarMenu(menu: Menu[]):void{
    sessionStorage.setItem('menu', JSON.stringify(menu));
    this.menuObs.next(menu);
  }

  consultarMenu(usuario: Usuario):Observable<any>{
    const urlEndpoint = this.API+'/menu/listar-menu';
    
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

  insertarMenu(menu: Menu): Observable<any>{
    const urlEndpoint = this.API+'/menu/insertar-menu';

    return this.http.post<any>(urlEndpoint, menu).pipe(
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
}
