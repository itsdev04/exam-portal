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
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';

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
        },
        {
            path: "categories",
            component: ViewCategoriesComponent
        },
        {
            path: "add-category",
            component: AddCategoryComponent
        },
        {
            path: "add-quiz",
            component: AddQuizComponent
        },
        {
            path: "quizzes",
            component: ViewQuizzesComponent
        },
        {
            path: "update-quiz/:quizId",
            component: UpdateQuizComponent
        },
        {
            path: "view-questions/:quizId/:quizTitle",
            component: ViewQuizQuestionsComponent
        }]
    },
    { path: "user-dashboard", component: UserDashboardComponent, pathMatch: 'full', canActivate: [normalGuard] }
];
