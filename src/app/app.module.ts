import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'app/Login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardAppRoutes } from 'app/app.routing';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
      DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(DashboardAppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
