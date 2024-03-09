import { Routes } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {AuthPageComponent} from "./pages/auth-page/auth-page.component";

export const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'auth', component: AuthPageComponent}
];
