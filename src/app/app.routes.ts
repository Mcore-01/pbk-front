import { Routes } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {AuthPageComponent} from "./pages/auth-page/auth-page.component";
import {RegPageComponent} from "./pages/reg-page/reg-page.component";
import {OperatorPanelComponent} from "./pages/operator-panel/operator-panel.component";
import {BankListComponent} from "./components/operator/bank-list/bank-list.component";

const operatorPanelChildrenRoutes: Routes = [
    { path: "bank", component: BankListComponent}
];

export const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'auth', component: AuthPageComponent},
    {path: 'reg', component: RegPageComponent},
    {path: 'operator', component: OperatorPanelComponent, children: operatorPanelChildrenRoutes}
];
