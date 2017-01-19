import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup, AbstractControl} from "@angular/forms";
import {Router} from "@angular/router";
import {AddService} from "../../../services/add.visitor.service";

@Component({
  moduleId: 'module.id',
  selector: 'add-visitor',
  templateUrl: 'app/dashboard/addVisitor/add.visitor.component.html',
  styleUrls: ['app/dashboard/dashboard.component.css']
})
export class AddVisitorComponent implements OnInit{
  submitted = false;
  addForm: FormGroup;
  /*public addName: AbstractControl;
  public addMobile: AbstractControl;
  public addEmail: AbstractControl;
  public addIn: AbstractControl;
  public addOut: AbstractControl;*/
  data: any;
  constructor(private formBuilder: FormBuilder, private addService: AddService, private router: Router) {}
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(3)]],
      email: ['',Validators.required],
      mobile: ['',Validators.required],
      intime: [''],
      outtime: ['']
    });
    /*this.addName = this.addForm.controls['name'];
    this.addMobile = this.addForm.controls['mobile'];
    this.addEmail = this.addForm.controls['email'];
    this.addIn = this.addForm.controls['intime'];
    this.addOut = this.addForm.controls['outtime'];*/
  }
  public addVisitorSubmit(addform: FormGroup): void {
    this.submitted = true;
    this.data = {
      name: addform.get('name').value,
      email: addform.get('email').value,
      mobile: addform.get('mobile').value.toString(),
      intime: addform.get('intime').value
    };

    //console.log("Data"+this.data)
    this.addService.addVisitor(this.data).subscribe(
      data => this.addsuccess(data),
      error => this.addFail(error)
    )
  };

  private addsuccess(result) {
    console.log(result);
    this.router.navigate(['dashboard']);
  }

  private addFail(error) {
    console.log('error');
  }
  public logout(){
    localStorage.removeItem('token');
  }
}
