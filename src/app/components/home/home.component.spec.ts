import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [FormBuilder, ToastrService, AuthenticationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the signUpForm with the client data', () => {
    expect(component.signUpForm.value).toEqual(component.client);
  });

  it('should show an error message if an invalid CPF is entered', () => {
    component.signUpForm.controls['cpf'].setValue('12345678900');
    component.onSubmit();
    expect(component.isCpfInvalid).toBe(true);
  });

  it('should call the signUp method of the AuthenticationService on form submission', () => {
    spyOn(component['service'], 'signUp').and.callThrough();
    component.signUpForm.controls['code'].setValue('1234');
    component.signUpForm.controls['name'].setValue('Maria');
    component.signUpForm.controls['cpf'].setValue('12664042017');
    component.signUpForm.controls['address'].setValue('123 Main St');
    component.signUpForm.controls['phone'].setValue('48996059421');
    component.onSubmit();
    expect(component['service'].signUp).toHaveBeenCalledWith(
      component.signUpForm.value
    );
  });

  it('should toggle the visibility of the form when toggleForm is called', () => {
    component.toggleForm();
    expect(component.isFormVisible).toBe(true);
    component.toggleForm();
    expect(component.isFormVisible).toBe(false);
  });

  it('should toggle the visibility of the description icons when toogleIconsSidebar is called', () => {
    component.toogleIconsSidebar();
    expect(component.isDescriptionIconVisible).toBe(false);
    component.toogleIconsSidebar();
    expect(component.isDescriptionIconVisible).toBe(true);
  });

  it('should navigate to the home page and clear local storage on logout', () => {
    spyOn(component['router'], 'navigate');
    spyOn(localStorage, 'clear');
    component.logout();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
    expect(localStorage.clear).toHaveBeenCalled();
  });
});
