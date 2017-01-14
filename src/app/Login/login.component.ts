import {Component, OnInit, AfterContentInit, ContentChildren, QueryList} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    moduleId: 'module.id',
    selector: 'login-root',
    templateUrl: 'app/Login/login.component.html',
    styleUrls: ['app/Login/login.component.css']
})

export class LoginComponent implements OnInit{
    submitted = false;
    loginForm: FormGroup;
    registerForm: FormGroup;
    constructor(private formBuilder1: FormBuilder) {}
    ngOnInit() {
      this.loginForm = this.formBuilder1.group({
        username: ['',Validators.required],
        password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      });

      this.registerForm = this.formBuilder1.group({
        firstname: ['',[Validators.required], Validators.minLength(3)],
        lastname: ['',[Validators.required, Validators.minLength(3)]],
        email: ['',Validators.required],
        newpassword: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        con_password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      });
    }

    onSubmit() {
        this.submitted = true;
    }
}


