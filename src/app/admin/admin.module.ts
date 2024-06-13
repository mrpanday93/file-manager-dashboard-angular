import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import {AdminSharedComponentsModule} from '../shared/admin/admin-shared-components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminSharedComponentsModule,
    MatSidenavModule
  ]
})
export class AdminModule { }
