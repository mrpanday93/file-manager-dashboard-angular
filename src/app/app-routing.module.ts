import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeGuard } from './guard/Route/route.guard';
import { loginGuard } from './guard/login/login.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [{
  path: 'login',
  loadChildren: ()=> import('./login-register/login-register.module').then((m)=>m.LoginRegisterModule),
  canActivate:[loginGuard]
}, {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}, {
  path: "admin",
  loadChildren: ()=> import('./admin/admin.module').then((m)=>m.AdminModule),
  canActivate:[routeGuard]
},{
  path: "404",
  component: NotFoundComponent
} ,{
  path: "**",
  redirectTo: '404',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
