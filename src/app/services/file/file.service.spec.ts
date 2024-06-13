import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FileService } from './file.service';
import { Router } from '@angular/router';

describe('FileService', () => {
  let service: FileService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  const AUTH_API = 'http://localhost:8000/api/files';

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FileService,
        { provide: Router, useValue: spy }
      ]
    });

    service = TestBed.inject(FileService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new file', () => {
    const dummyData = { name: 'file1' };

    service.create(dummyData).subscribe(response => {
      expect(response).toEqual(dummyData);
    });

    const req = httpMock.expectOne(AUTH_API);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyData);
    req.flush(dummyData);
  });

  it('should fetch files', () => {
    const dummyFiles = [{ name: 'file1' }, { name: 'file2' }];

    service.fetchFiles().subscribe(files => {
      expect(files).toEqual(dummyFiles);
    });

    const req = httpMock.expectOne(AUTH_API);
    expect(req.request.method).toBe('GET');
    req.flush(dummyFiles);
  });

  it('should fetch a file by ID', () => {
    const dummyFile = { name: 'file1' };

    service.fetchFileById(1).subscribe(file => {
      expect(file).toEqual(dummyFile);
    });

    const req = httpMock.expectOne(`${AUTH_API}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyFile);
  });

  it('should update a file by ID', () => {
    const dummyResponse = { success: true };
    const type = 'type1';
    const value = true;

    service.updateFileById(1, type, value).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${AUTH_API}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ type, value });
    req.flush(dummyResponse);
  });
});
/* Explanation:
Import Statements:

TestBed is used to configure and create an Angular testing module.
HttpClientTestingModule and HttpTestingController are used to mock HTTP requests.
Router is used to mock navigation.
Setup (beforeEach):

We create a spy object for the Router to prevent actual navigation during tests.
We configure the testing module with HttpClientTestingModule and provide the FileService and Router.

Teardown (afterEach):

We verify that there are no outstanding HTTP requests after each test.
Test Cases:

Service Creation: Checks if the service is created successfully.
Create File: Mocks a POST request and checks if the service correctly sends data.
Fetch Files: Mocks a GET request and checks if the service correctly retrieves data.
Fetch File by ID: Mocks a GET request for a specific ID and checks if the service correctly retrieves data.
Update File by ID: Mocks a PUT request and checks if the service correctly sends data. */