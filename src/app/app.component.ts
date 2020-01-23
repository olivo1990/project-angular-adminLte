import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { UsuarioService } from './services/usuario.service';
import { ActualizarMenuService } from './services/actualizar-menu.service';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'wom-chile';
  public isLogin: boolean;

  constructor(public authService: UsuarioService, private router: Router, private actualizarMenu: ActualizarMenuService) {
      this.isLogin = false;

      router.events.subscribe( (event: Event) => {

        if (event instanceof NavigationStart) {
  
        }

        if (event instanceof NavigationEnd) {
          if(!this.actualizarMenu.conectado && this.authService.isAuthenticated()){
            this.actualizarMenu.conectar();
          }
        }
    });
  }

  ngOnInit() {
    this.authService.isLoggedIn;
    $(document).ready(() => {
      jQuery.ready();
    });
  }

}
