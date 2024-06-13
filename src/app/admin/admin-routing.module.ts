import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'file-manager', pathMatch: 'full' },
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import (`./dashboard/dashboard.module`).then((m) =>m.DashboardModule),
      // },
      {
        path: 'user-profile',
        loadChildren: () => import (`./user-profile/user-profile.module`).then((m) =>m.UserProfileModule),
      },
      {
        path: 'file-manager',
        loadChildren: () => import (`./file-manager/file-manager.module`).then((m) =>m.FileManagerModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
