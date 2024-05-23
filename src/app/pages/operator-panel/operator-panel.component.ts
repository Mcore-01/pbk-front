import {Component} from '@angular/core';
import {OperatorService} from "../../services/operator.service";
import {Router, RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {MatList, MatListItem, MatSelectionList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'operator-panel',
  standalone: true,
    imports: [
        RouterLink,
        RouterOutlet,
        RouterModule,
        MatList,
        MatListItem,
        MatSelectionList,
        MatIcon,
        MatIconButton
    ],
  templateUrl: './operator-panel.component.html',
  styleUrl: './operator-panel.component.css',
  providers:[AuthService, OperatorService]
})

export class OperatorPanelComponent {
    constructor(private router: Router, private authService: AuthService) {
    }
    logout(){
        this.authService.logout();
        this.router.navigate(['/auth']).then(()=>{
            console.log('переход на страницу авторизации');
        });
    }
}
