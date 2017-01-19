import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { UserService } from '../../services/user.authentication.service';
import {Router} from "@angular/router";

@Component({
    moduleId: 'module.id',
    selector: 'login-root',
    templateUrl: 'app/Login/login.component.html',
    styleUrls: ['app/dashboard/dashboard.component.css']
})

export class LoginComponent implements OnInit{
    submitted = false;
    loginForm: FormGroup;
    registerForm: FormGroup;
    public loginUsername: AbstractControl;
    public loginPassword: AbstractControl;
    public regFirstname: AbstractControl;
    public regLastname: AbstractControl;
    public regEmail: AbstractControl;
    public regPassword: AbstractControl;

    public loginError: string = "";
    data: any;
    public correctpassword: boolean = true;
    public correctemail: boolean = true;
    public regSuccess: boolean = false;
    public emailExist: boolean = false;
    public matchpassword: boolean = true;
    constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {

    }
    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        username: ['',Validators.required],
        password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      });
      this.loginUsername = this.loginForm.controls['username'];
      this.loginPassword = this.loginForm.controls['password'];
      this.correctemail = true;
      this.correctpassword = true;

      this.registerForm = this.formBuilder.group({
        firstname: ['',[Validators.required, Validators.minLength(3)]],
        lastname: ['',[Validators.required, Validators.minLength(3)]],
        email: ['',Validators.required],
        newpassword: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        con_password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      });
      this.regFirstname = this.registerForm.controls['firstname'];
      this.regLastname = this.registerForm.controls['lastname'];
      this.regEmail = this.registerForm.controls['email'];
      this.regPassword = this.registerForm.controls['newpassword'];
    }

    loginSubmit(logForm: FormGroup): void {
        this.submitted = true;
      if (this.loginForm.valid) {
        // console.log(this.form.valid);
        this.data = {
          email: logForm.get('username').value,
          password: logForm.get('password').value
        };
        // console.log("value",this.data);
        this.userService.userLogin(this.data).subscribe(
          data => this.loginSuccess(data),
          error => this.loginFail(error)
        );
      }
    }

    public loginSuccess(result) {
      console.log("successfully login");
      this.correctpassword = true;
      this.correctemail = true;
      localStorage.removeItem('token');
      localStorage.setItem('token', result.token);
      this.router.navigate(['dashboard']);
    }

    public loginFail(error) {
      console.log("fail to login");
      this.correctemail = false;
      this.correctpassword = false;
      console.log(error);
      this.submitted = false;
      this.loginError = error.error_message;
    }

  registerSubmit(regForm: FormGroup): void {
    //this.submitted = true;
    if(regForm.get('newpassword').value!=regForm.get('con_password').value){
      this.matchpassword=false;
      return;
    }
    if (this.registerForm.valid) {
      // console.log(this.form.valid);
      this.data = {
        firstname: regForm.get('firstname').value,
        lastname: regForm.get('lastname').value,
        email: regForm.get('email').value,
        password: regForm.get('newpassword').value
      };
      this.userService.userRegister(this.data).subscribe(
        data => this.registerSuccess(data),
        error => this.registerFail(error)
      );
    }
  }

  public registerSuccess(result) {
    console.log("successfully register");
    // localStorage.setItem('token', result.token);
    this.registerForm.reset();
    this.regSuccess=true;
  }

  public registerFail(error) {
    console.log("fail to register");
    console.log(error);
    this.emailExist = true;
    this.submitted = false;
    this.loginError = error.error_message;
  }

  public resetForm(){
    this.registerForm.reset();
  }
}


