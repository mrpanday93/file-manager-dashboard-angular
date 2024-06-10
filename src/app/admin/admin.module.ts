import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import {AdminSharedComponentsModule} from '../admin-shared-components/admin-shared-components.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminSharedComponentsModule
  ]
})
export class AdminModule { }
