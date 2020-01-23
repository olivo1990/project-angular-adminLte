import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from '../models/menu';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _menu: Menu[] = [];
  private menuObs:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public menuObs$ = this.menuObs.asObservable();
  private API = environment.APIMENU;
  private menuArreglo: any[];
  currentIndex: any[];
  currentIndexObs: BehaviorSubject<any[]>;
  menuEdicion: Menu = new Menu();

  constructor(private http: HttpClient) { 
    this.menuObs = new BehaviorSubject<any[]>(this._menu);
    this.menuArreglo = [];
    this.currentIndexObs = new BehaviorSubject<any[]>(this.menuArreglo);
  }

  changeIndex(index: any[]): void {
    this.currentIndex = index;
    this.currentIndexObs.next(this.currentIndex);
  }

  public menuArregloObs():void{
    this.menuArreglo = [];
    if (sessionStorage.getItem('menu') != null) {
      this._menu = JSON.parse(sessionStorage.getItem('menu')) as Menu[];
      this.crearMenu(0);
      //this.menuObs.next(this.menuArreglo);
      this.currentIndexObs.next(this.menuArreglo);
    }

    //console.log(sessionStorage.getItem('menu'));
  }

  public get menu(): Menu[]{
    if (sessionStorage.getItem('menu') != null) {
      let menu = JSON.parse(sessionStorage.getItem('menu')) as Menu[];
      this._menu = menu;
      return this._menu;
    }
    return this._menu;
  }

  guardarMenu(menu: Menu[]):void{
    this.menuArreglo = [];
    sessionStorage.setItem('menu', JSON.stringify(menu));
    this._menu = menu;
    this.crearMenu(0);
    this.currentIndexObs.next(this.menuArreglo);
    //this.menuObs.next(this.menuArreglo);
    //this.menuObs.next(menu);
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

  crudMenu(menu: Menu, idMenu: number): Observable<any>{
    const urlEndpoint = this.API+'/menu/insertar-menu';
    let datos = {"menu": menu, "idMenu": idMenu}

    return this.http.post<any>(urlEndpoint, datos).pipe(
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

  buscarMenu(menu: Menu): Observable<any>{
    const urlEndpoint = this.API+'/menu/buscar-menu';

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

  private crearMenu(idPadreA:number):void{
    if(Object.keys(this._menu).length !== 0){

        for (let i in this._menu) {
          let idMenu:number = this._menu[i]["id"];
          let idPadreB:number = this._menu[i]["idPadre"];
          if (idPadreA === idPadreB) {
            if (idPadreB === 0) {
              this.menuArreglo.push({'id':this._menu[i]["id"],'label':this._menu[i]["nombre"],'link':this._menu[i]["url"],'icon':this._menu[i]["icono"]});

              this.crearMenu(idMenu);

            }else{
              if(this.menuTieneHijos(idMenu) > 0){
                for (let p in this.menuArreglo) {

                  if(this.menuArreglo[p]["id"] == idPadreA){
                    let arregloHijo = {
                      id: this._menu[i]["id"],
                      label: this._menu[i]["nombre"],
                      link: this._menu[i]["url"],
                      icon: this._menu[i]["icono"]
                    }

                    if(this.menuArreglo[p]['items'] !== undefined){
                      this.menuArreglo[p]['items'].push(arregloHijo);
                    }else{
                      this.menuArreglo[p]['items'] = [arregloHijo];
                    }
                  }
                }
                this.crearMenu(idMenu);
              }else{
                for (let p in this.menuArreglo) {
                  if(this.menuArreglo[p]["id"] == idPadreA){
                    let arregloHijo = {
                      id: this._menu[i]["id"],
                      label: this._menu[i]["nombre"],
                      link: this._menu[i]["url"],
                      icon: this._menu[i]["icono"]
                    }

                    if(this.menuArreglo[p]['items'] !== undefined){
                      this.menuArreglo[p]['items'].push(arregloHijo);
                    }else{
                      this.menuArreglo[p]['items'] = [arregloHijo];
                    }
                  }
                }
              }
            }
          }
        }

    }
  }

  private menuTieneHijos (idPadreA:number):number {
    let n = 0;
    for (let i in this._menu) {
      let idPadreB:number = this._menu[i]["idPadre"];
      if (idPadreB === idPadreA) {
        n += 1;
      }
    }
    return n;
  }
}
