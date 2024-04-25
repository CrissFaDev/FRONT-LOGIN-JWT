import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoGuard } from './guard/producto.guard';

const routes: Routes = [
  
  {path: 'inicio', component: DashboardComponent },
  {path: "iniciar-sesion", component: LoginComponent},
  {path: 'producto', component: ProductoComponent , canActivate:[ProductoGuard]},
  {path:'', redirectTo:'/inicio', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
