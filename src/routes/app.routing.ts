import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { LoginComponent } from 'app/Login/login.component';
import {AddVisitorComponent} from "../app/dashboard/addVisitor/add.visitor.component";
export const AppRoutes = [
  { path: 'dashboard/add_visitor', component: AddVisitorComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }];

