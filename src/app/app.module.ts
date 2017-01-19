import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'app/Login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { AddVisitorComponent } from 'app/dashboard/addVisitor/add.visitor.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from 'routes/app.routing';
import { HttpClientHelper } from '../services/http.call.service';
import { UserService } from '../services/user.authentication.service';
import { AddService } from "../services/add.visitor.service";
import { ViewService } from "../services/view.visitors.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddVisitorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [HttpClientHelper, UserService, AddService, ViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
