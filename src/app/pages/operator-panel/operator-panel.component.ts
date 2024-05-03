import {Component} from '@angular/core';
import {OperatorService} from "../../services/operator.service";
import {BankListComponent} from "../../components/operator/bank-list/bank-list.component";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {MatList, MatListItem, MatSelectionList} from "@angular/material/list";


@Component({
  selector: 'app-operator-panel',
  standalone: true,
    imports: [
        BankListComponent,
        RouterLink,
        RouterOutlet,
        RouterModule,
        MatList,
        MatListItem,
        MatSelectionList
    ],
  templateUrl: './operator-panel.component.html',
  styleUrl: './operator-panel.component.css',
  providers:[OperatorService]
})

export class OperatorPanelComponent {}