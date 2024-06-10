import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'login',
  loadChildren: ()=> import('./authentication/authentication.module').then((m)=>m.AuthenticationModule)
}, {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}, {
  path: "admin",
  loadChildren: ()=> import('./admin/admin.module').then((m)=>m.AdminModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
