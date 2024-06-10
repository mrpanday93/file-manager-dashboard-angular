import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    NgScrollbarModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule
  ],
  exports:[
    MatSidenavModule,
    SidebarComponent,
    NgScrollbarModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    TopbarComponent,
    MatButtonModule,
    MatCardModule
  ]
})
export class AdminSharedComponentsModule { }
