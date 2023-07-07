import { NgxMaskDirective } from 'ngx-mask';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IClient } from 'src/app/interfaces/client';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { cpf } from 'cpf-cnpj-validator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  client: IClient = {
    code: '',
    name: '',
    cpf: '',
    address: '',
    phone: '',
  };

  signUpForm!: FormGroup;

  isFormVisible: boolean = false;
  isDescriptionIconVisible: boolean = true;
  isCpfInvalid: boolean = false;

  constructor(
    private router: Router,
    private service: AuthenticationService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      code: [this.client.code, Validators.required],
      name: [this.client.name, Validators.required],
      cpf: [this.client.cpf, Validators.required],
      address: [this.client.address, Validators.required],
      phone: [this.client.phone, Validators.required],
    });
  }

  onSubmit() {
    if (!cpf.isValid(this.signUpForm.value.cpf)) {
      this.isCpfInvalid = true;
      return;
    } else {
      this.isCpfInvalid = false;
    }

    this.service.signUp(this.signUpForm.value).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Cadastro efetuado!', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
      },
      error: (err) => {
        this.toastr.error(
          'Confira os dados e tente novamente!',
          'Erro ao efetuar cadastro',
          {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          }
        );
      },
    });
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  toogleIconsSidebar() {
    this.isDescriptionIconVisible = !this.isDescriptionIconVisible;
  }
}
