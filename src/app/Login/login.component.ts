import {Component, OnInit, AfterContentInit, ContentChildren, QueryList} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    moduleId: 'module.id',
    selector: 'login-root',
    templateUrl: 'app/Login/login.component.html',
    styleUrls: ['app/Login/login.component.css']
})
export class LoginComponent implements OnInit, AfterContentInit{

    submitted = false;
    loginForm: FormGroup;
    registerForm: FormGroup;
    constructor(private formBuilder1: FormBuilder) {}
    ngOnInit() {
      this.loginForm = this.formBuilder1.group({
        username: ['',Validators.required],
        password: ['',Validators.required]
      });

      this.registerForm = this.formBuilder1.group({
        firstname: ['',Validators.required],
        lastname: ['',Validators.required],
        email: ['',Validators.required],
        newpassword: ['',Validators.required],
        con_password: ['',Validators.required]
      });

    }

    onSubmit() {
        this.submitted = true;
    }
    ngAfterContentInit(){

    }
}


