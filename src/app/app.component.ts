import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'wom-chile';
  public isLogin: boolean;

  constructor(private authService: UsuarioService, private router: Router) {
      this.isLogin = false;

      router.events.subscribe( (event: Event) => {

        if (event instanceof NavigationStart) {
  
        }

        if (event instanceof NavigationEnd) {
  
            if(this.authService.isAuthenticated()){
              this.isLogin = true;
            }
            console.log(this.isLogin);
        }
    });
  }

  ngOnInit() {

  }

}
