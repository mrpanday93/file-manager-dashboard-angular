import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRegisterRoutingModule } from './login-register-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginRegisterComponent } from './login-register.component';
import { SharedModule } from '../shared/outer/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LoginRegisterComponent],
  imports: [
    CommonModule,
    LoginRegisterRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTabsModule
  ],
})
export class LoginRegisterModule {}
