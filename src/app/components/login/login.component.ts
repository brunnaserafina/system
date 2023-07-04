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
        //save access token to localStorage later
        this.router.navigate(['/']); //navigate to the home route when the component is created
      },
      error: (err) => {
        if (err.status === 400) {
          this.toastr.error(
            'Confira os dados e tente novamente!',
            'Erro de login',
            {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
            }
          );
        } else {
          this.toastr.error(
            'Erro de login',
            'Ocorreu um erro no servidor. Favor, tente novamente mais tarde!',
            {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
            }
          );
        }
      },
    });
  }
}
