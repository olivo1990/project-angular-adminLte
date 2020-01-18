import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Menu } from '../../../models/menu';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Usuario } from '../../../models/usuario';
declare var $:any;

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {

  menu: Menu[] = [];
  menuArreglo = new Array();
  menuHtml: string;
  usuario: Usuario;

  constructor(private usuarioService: UsuarioService) {
    this.menuHtml = "";
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.menu = this.usuarioService.menu;
    this.usuario = this.usuarioService.usuario;
    this.cargarMenu(0);
    $(".menu").html(this.menuHtml);
  }
  
    cargarMenu(idPadre): void{
      let MENU = this.menu;
      if(Object.keys(MENU).length !== 0){
        if(this.menuTieneHijos(idPadre) > 0)
        {
          for (let i in this.menu) {
            let idMenu: number = this.menu[i].id;
            let idPadre2: number = this.menu[i].idPadre;
            if(idPadre2 == idPadre)
            {
  
              let open: string = "";
              let display: string = "";
              /*if(parseInt(this.menu[i].desplegar) == 1){
                open = "menu-open active";
                display = "display: block";
              }*/
              
              if(idPadre2 == 0)
              {
                this.menuHtml += '<li title="'+this.menu[i].nombre+'" aria-label="'+this.menu[i].nombre+'"           class="treeview '+open+'">'+
                          '<a href="'+this.menu[i].url+'" target = "'+this.menu[i].target+'">'+
                            '<i class="fab fa-slack-hash"></i> <span>'+this.menu[i].nombre+'</span> <i class="fa fa-angle-left pull-right"></i>'+
                          '</a>'+
                          '<ul class="treeview-menu" style="'+display+'">';
                          this.cargarMenu(idMenu);
              }
              else
              {
                if(this.menuTieneHijos(idMenu) > 0)
                {
                  this.menuHtml +='<li title="'+this.menu[i].nombre+'" aria-label="'+this.menu[i].nombre+'" class="treeview '+open+'"><a href="'+this.menu[i].url+'" target = "'+this.menu[i].target+'"><i class="fas fa-sort-amount-down"></i>'+this.menu[i].nombre+'<i class="fa fa-angle-left pull-right"></i></a>'+
                  '<ul class="treeview-menu" style="'+display+'">';
                  this.cargarMenu(idMenu);
                }
                else{
                  this.menuHtml +='<li title="'+this.menu[i].nombre+'" aria-label="'+this.menu[i].nombre+'"><a href="'+this.menu[i].url+'" target = "'+this.menu[i].target+'"><i class="fas fa-dot-circle"></i>'+this.menu[i].nombre+'</a></li>';
                }
              }
            }
        };
      }
      else
      {
          for (let i in this.menu) {
            let idMenu: number = this.menu[i].id;
            let idPadre2: number = this.menu[i].idPadre;
            if(idMenu == idPadre2)
            {
              this.menuHtml +='<li title="'+this.menu[i].nombre+'" aria-label="'+this.menu[i].nombre+'"><a href="'+this.menu[i].url+'"><i class="fa fa-slack"></i>'+this.menu[i].nombre+'</a></li>';
            }
  
          };
      }
      this.menuHtml +='</ul></li>';
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
