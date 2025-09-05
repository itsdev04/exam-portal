import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './guard/admin.guard';
import { normalGuard } from './guard/normal.guard';
import path from 'path';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "sign-up", component: SignupComponent },
    {
        path: "admin-dashboard", component: AdminDashboardComponent, canActivate: [adminGuard],
        children: [{
            path: "profile",
            component: ProfileComponent
        },
    {
            path: "",
            component: WelcomeComponent
        }]
    },
    { path: "user-dashboard", component: UserDashboardComponent, pathMatch: 'full', canActivate: [normalGuard] }
];
