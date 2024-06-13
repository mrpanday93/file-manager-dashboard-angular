import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  const AUTH_API = 'http://localhost:8000/api/';

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: Router, useValue: spy }
      ]
    });

    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a new user', () => {
    const dummyResponse = { success: true };
    const username = 'testuser';
    const email = 'test@example.com';
    const password = 'password';

    service.register(username, email, password).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${AUTH_API}register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, email, password });
    req.flush(dummyResponse);
  });

  it('should login a user', () => {
    const dummyResponse = { token: '12345' };
    const username = 'testuser';
    const password = 'password';

    service.login(username, password).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${AUTH_API}login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, password });
    req.flush(dummyResponse);
  });

  it('should log out a user', () => {
    localStorage.setItem('token', '12345');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should check if user is logged in', () => {
    localStorage.setItem('token', '12345');
    expect(service.isUserLoggedIn()).toBeTrue();
    localStorage.removeItem('token');
    expect(service.isUserLoggedIn()).toBeFalse();
  });

  it('should get the token', () => {
    localStorage.setItem('token', '12345');
    expect(service.getToken()).toBe('12345');
    localStorage.removeItem('token');
    expect(service.getToken()).toBe('');
  });

  it('should set the token and navigate to admin', () => {
    service.setToken('12345');
    expect(localStorage.getItem('token')).toBe('12345');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin']);
  });
});
