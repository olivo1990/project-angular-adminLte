// Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Servicios Providers
import { UsuarioService } from './services/usuario.service';
//import { TokenInterceptor } from './services/interceptors/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SlidebarComponent } from './components/layout/slidebar/slidebar.component';
import { FooterComponent } from './components/layout/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    HeaderComponent,
    SlidebarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
