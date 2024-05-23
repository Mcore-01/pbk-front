import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {IUserCard} from "../../models/usercard";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'user-card-list',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './user-card-list.component.html',
  styleUrl: './user-card-list.component.css',
  providers: [UserService]
})
export class UserCardListComponent implements OnInit{

  userCards: IUserCard[] = [];
  displayedColumns: string[] = ['card', 'bank', 'typeCard'];
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
      this.userService.getUserCards().subscribe({
        next:(data) =>{
          this.userCards = data;
        },
        error:error=>{
          console.log(error);
        }
    })
  }
}
