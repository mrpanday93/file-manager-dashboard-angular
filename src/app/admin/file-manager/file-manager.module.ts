import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileManagerRoutingModule } from './file-manager-routing.module';
import { FileManagerComponent } from './file-manager/file-manager.component';


@NgModule({
  declarations: [
    FileManagerComponent
  ],
  imports: [
    CommonModule,
    FileManagerRoutingModule
  ]
})
export class FileManagerModule { }
