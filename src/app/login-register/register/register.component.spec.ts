import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthenticationService', [
      'register',
      'login',
      'setToken',
    ]);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: AuthenticationService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.registerForm.controls['username'].setValue('validUsername');
    component.registerForm.controls['email'].setValue('valid@example.com');
    component.registerForm.controls['password'].setValue('validPassword');
    expect(component.registerForm.valid).toBeTrue();
  });

  it('should call register method on submit if form is valid', () => {
    component.registerForm.controls['username'].setValue('validUsername');
    component.registerForm.controls['email'].setValue('valid@example.com');
    component.registerForm.controls['password'].setValue('validPassword');

    // Mocking the register method to return an observable with success response
    authServiceSpy.register.and.returnValue(of({ error: false }));

    // Mocking the login method to return an observable with token
    authServiceSpy.login.and.returnValue(of({ token: '12345' }));

    // Trigger the submit function
    component.onSubmit();

    // Expect the register method to be called with correct parameters
    expect(authServiceSpy.register).toHaveBeenCalledWith(
      'validUsername',
      'valid@example.com',
      'validPassword'
    );

    // Verify that the login method is called after successful registration
    expect(authServiceSpy.login).toHaveBeenCalledWith(
      'validUsername',
      'validPassword'
    );
  });

  it('should handle error on register', () => {
    component.registerForm.controls['username'].setValue('validUsername');
    component.registerForm.controls['email'].setValue('valid@example.com');
    component.registerForm.controls['password'].setValue('validPassword');

    // Mocking the register method to return an observable with an error
    authServiceSpy.register.and.returnValue(
      throwError({ error: { message: 'Registration Error' } })
    );

    component.onSubmit();

    expect(component.serveError).toBe('Registration Error');
  });

  it('should call login method after successful registration', () => {
    component.registerForm.controls['username'].setValue('validUsername');
    component.registerForm.controls['email'].setValue('valid@example.com');
    component.registerForm.controls['password'].setValue('validPassword');

    authServiceSpy.register.and.returnValue(of({ error: false }));
    authServiceSpy.login.and.returnValue(of({ token: '12345' }));

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith(
      'validUsername',
      'validPassword'
    );
  });

  it('should handle error on login', () => {
    component.registerForm.controls['username'].setValue('validUsername');
    component.registerForm.controls['email'].setValue('valid@example.com');
    component.registerForm.controls['password'].setValue('validPassword');

    authServiceSpy.register.and.returnValue(of({ error: false }));
    authServiceSpy.login.and.returnValue(
      throwError({ error: { message: 'Login Error' } })
    );

    component.onSubmit();

    expect(component.serveError).toBe('Login Error');
  });

  it('should toggle hide property when clickEvent is called', () => {
    const initialHide = component.hide;
    component.clickEvent(new MouseEvent('click'));
    expect(component.hide).toBe(!initialHide);
  });
});
