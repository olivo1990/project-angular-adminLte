import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/usuario/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthGuard } from './components/usuario/guards/auth.guard';


const routes: Routes = [
  { path: 'login/', component: LoginComponent },
  { path: 'inicio', component: InicioComponent,data: {animation: 'inicioPage'}, canActivate:[AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'login/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
