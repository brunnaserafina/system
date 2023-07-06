import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: IUser = {
    user: '',
    password: '',
  };

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private service: AuthenticationService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user: [this.user.user, Validators.required],
      password: [this.user.password, Validators.required],
    });
  }

  onSubmit() {
    this.service.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.toastr.success('Bem-vindo(a)!', 'Acesso autorizado', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });

        localStorage.setItem('system', response.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(
          'Confira os dados e tente novamente!',
          'Erro de login',
          {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          }
        );
      },
    });
  }
}
