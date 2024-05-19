import {Component} from '@angular/core';
import {OperatorService} from "../../services/operator.service";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {MatList, MatListItem, MatSelectionList} from "@angular/material/list";
import {LogoutButtonComponent} from "../../components/logout-button/logout-button.component";


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
        LogoutButtonComponent
    ],
  templateUrl: './operator-panel.component.html',
  styleUrl: './operator-panel.component.css',
  providers:[OperatorService]
})

export class OperatorPanelComponent {}