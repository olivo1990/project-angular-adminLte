// Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './config/material-module';

// Servicios Providers
import { UsuarioService } from './services/usuario.service';
import { MenuService } from './services/menu.service';
import { TokenInterceptor } from './services/interceptors/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SlidebarComponent } from './components/layout/slidebar/slidebar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { GestorMenuComponent } from './components/gestor-menu/gestor-menu.component';
import { CrearMenuComponent } from './components/gestor-menu/crear-menu/crear-menu.component';
import { MenuDirective } from './directives/menu.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    HeaderComponent,
    SlidebarComponent,
    FooterComponent,
    GestorMenuComponent,
    CrearMenuComponent,
    MenuDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [UsuarioService, MenuService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
