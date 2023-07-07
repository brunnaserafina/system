import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { IUser } from 'src/app/interfaces/user';
import { IClient } from 'src/app/interfaces/client';
import { environment } from 'src/environments/environment';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a POST request to login endpoint', () => {
    const user: IUser = { user: 'testuser', password: 'testpassword' };

    service.login(user).subscribe();

    const req = httpMock.expectOne(`${environment.API_URL}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);
  });

  it('should send a POST request to signUp endpoint', () => {
    const client: IClient = {
      code: '1234',
      name: 'Maria Silva',
      cpf: '86337783000',
      address: 'Rua das Laranjeiras, n 123. Bairro: Salete. São Paulo-SP.',
      phone: '11478889991',
    };

    service.signUp(client).subscribe();

    const req = httpMock.expectOne(`${environment.API_URL}/customers/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(client);
  });
});
