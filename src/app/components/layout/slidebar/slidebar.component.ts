import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Menu } from '../../../models/menu';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {

  menu: Menu[] = [];
  menuArreglo = new Array();

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.menu = this.usuarioService.menu;

    console.log(this.menu);
  }


  crearMenu(idPadreA:number):void{
    if(Object.keys(this.menu).length !== 0){

        for (let i in this.menu) {
          let idMenu:number = this.menu[i]["id"];
          let idPadreB:number = this.menu[i]["idPadre"];
          if (idPadreA === idPadreB) {
            if (idPadreB === 0) {
              this.menuArreglo.push({'id':this.menu[i]["id"],'label':this.menu[i]["nombre"],'link':this.menu[i]["url"],'icon':this.menu[i]["icono"]});

              this.crearMenu(idMenu);

            }else{
              if(this.menuTieneHijos(idMenu) > 0){
                for (let p in this.menuArreglo) {

                  if(this.menuArreglo[p]["id"] == idPadreA){
                    let arregloHijo = {
                      id: this.menu[i]["id"],
                      label: this.menu[i]["nombre"],
                      link: this.menu[i]["url"],
                      icon: this.menu[i]["icono"]
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
                      id: this.menu[i]["id"],
                      label: this.menu[i]["nombre"],
                      link: this.menu[i]["url"],
                      icon: this.menu[i]["icono"]
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

  menuTieneHijos (idPadreA:number):number {
    let n = 0;
    for (let i in this.menu) {
      let idPadreB:number = this.menu[i]["idPadre"];
      if (idPadreB === idPadreA) {
        n += 1;
      }
    }
    return n;
  }

}
