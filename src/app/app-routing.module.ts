import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/usuario/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthGuard } from './components/usuario/guards/auth.guard';
import { GestorMenuComponent } from './components/gestor-menu/gestor-menu.component';
import { CrearMenuComponent } from './components/gestor-menu/crear-menu/crear-menu.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate:[AuthGuard]},
  { path: 'gestor-menu', component: GestorMenuComponent, canActivate:[AuthGuard]},
  { path: 'gestor-menu/crear-menu', component: CrearMenuComponent, canActivate:[AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
