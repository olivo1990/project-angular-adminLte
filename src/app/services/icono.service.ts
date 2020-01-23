import { Injectable } from '@angular/core';
import { Icono } from '../models/icono';

@Injectable({
  providedIn: 'root'
})
export class IconoService {

  private _iconos: Icono[] = [
    {
      icono: 'label',
      nombre: 'General'
    },
    {
      icono: 'person',
      nombre: 'Usuario'
    },
    {
      icono: 'settings',
      nombre: 'Configuración'
    },
    {
      icono: 'menu',
      nombre: 'Menu'
    },
    {
      icono: 'cloud_download',
      nombre: 'Descargar'
    },
    {
      icono: 'supervisor_account',
      nombre: 'Administrador'
    },
    {
      icono: 'supervisor_account',
      nombre: 'Administrador'
    },
    {
      icono: 'build',
      nombre: 'Crear'
    }
  ];

  constructor() { }

  public get iconos(): Icono[]{
    return this._iconos;
  }
}
