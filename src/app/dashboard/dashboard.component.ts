import {Component} from '@angular/core';
import {ViewService} from "../../services/view.visitors.service";

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    styleUrls: ['app/dashboard/dashboard.component.css']
})
export class DashboardComponent{
  allVisitors: any = [];
  constructor(private viewService: ViewService) {
    this.viewVisitors();
  }
  private viewVisitors() {
    console.log("inside component...");
    this.viewService.viewVisitor().subscribe(
      data => DashboardComponent.viewSuccess(data),
      error => DashboardComponent.viewFail(error)
    );
  }

  private static viewSuccess(data) {
    console.log(data);
    //this.allVisitors = [];
    //this.allVisitors = data;
  }

  private static viewFail(error) {
    console.log(error);
  }
  public logout(){
    localStorage.removeItem('token');
  }
}


