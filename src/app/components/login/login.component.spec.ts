import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
        {
          provide: ToastrService,
          useValue: {
            success: jasmine.createSpy('success'),
            error: jasmine.createSpy('error'),
          },
        },
        {
          provide: AuthenticationService,
          useValue: {
            login: jasmine.createSpy('login').and.callFake((user: any) => {
              if (user.user === 'username' && user.password === 'password') {
                return of({ token: 'token' });
              } else {
                return throwError('error');
              }
            }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the loginForm with the user object values', () => {
    expect(component.loginForm.value).toEqual(component.user);
  });

  it('should make the form invalid when the user and password fields are empty', () => {
    component.loginForm.setValue({ user: '', password: '' });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should make the form valid when the user and password fields are filled', () => {
    component.loginForm.setValue({ user: 'username', password: 'password' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call the service login method and navigate to home on successful login', () => {
    component.loginForm.setValue({ user: 'username', password: 'password' });
    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith(component.loginForm.value);
    expect(toastrService.success).toHaveBeenCalledWith(
      'Bem-vindo(a)!',
      'Acesso autorizado',
      {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
      }
    );
    expect(localStorage.getItem('system')).toBe('token');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should display an error message when there is an error during login', () => {
    component.loginForm.setValue({ user: 'invalid', password: 'password' });
    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith(component.loginForm.value);
    expect(toastrService.error).toHaveBeenCalledWith(
      'Confira os dados e tente novamente!',
      'Erro de login',
      {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
      }
    );
  });
});
