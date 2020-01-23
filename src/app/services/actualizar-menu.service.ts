import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Menu } from '../models/menu';
import { environment } from '../../environments/environment';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class ActualizarMenuService {

  private client: Client;
  clienteId:string;
  menu:Menu = new Menu();
  private API = environment.APISOCKET;
  conectado:boolean = false;

  constructor(private menuService: MenuService) {
    this.clienteId = 'id-' + new Date().getUTCMilliseconds() + '-' + Math.random().toString(36).substr(2);
    this.client = new Client();
    this.client.webSocketFactory = ()=>{
      return new SockJS(`${this.API}/menu-websocket`);
    }

    this.client.onConnect = (frame) => {
      console.log('Conectados: ' +  this.client.connected + ' : ' +  frame);
      this.conectado = true;

      this.client.subscribe('/menu/listar', e => {
        let menu: Menu[] = JSON.parse(e.body) as Menu[];
        this.actualizarMenu(menu);
      });
      //this.client.publish({destination: '/app/menu', body: JSON.stringify(this.menu)});
    }
    this.client.onDisconnect = (frame) => {
      console.log('Desconectados: ' +  !this.client.connected + ' : ' +  frame);
      this.conectado = false;
    }
  }

  conectar():void{
    this.client.activate();
  }

  desconectar():void{
    this.client.deactivate();
  }

  enviarMensaje(menu: Menu, idMenu: number):void{
    let datos = {"menu": menu, "idMenu": idMenu}
    this.client.publish({destination: '/app/menu', body: JSON.stringify(datos)});
  }

  actualizarMenu(menu: Menu[]): void{

    let menuArray= [];
    
    for (let i in menu) {
      
      menuArray.push({'id': menu[i]["idMenu"], "nombre": menu[i]["nombre"], "descripcion": menu[i]["descripcion"], "idPadre": menu[i]["idPadre"], "url": menu[i]["url"], "icono": menu[i]["icono"]});
    }

    let menuActual: Menu[] = menuArray;
    this.menuService.guardarMenu(menuActual);
  }
}
