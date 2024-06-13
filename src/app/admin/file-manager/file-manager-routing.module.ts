import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { ViewfileComponent } from './viewfile/viewfile.component';

const routes: Routes = [{
  path: "",
  component: FileManagerComponent
}, {
  path: "view/:id",
  component: ViewfileComponent
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileManagerRoutingModule { }
