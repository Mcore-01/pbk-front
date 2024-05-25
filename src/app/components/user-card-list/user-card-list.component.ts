import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {IUserCard} from "../../models/usercard";
import {Subscription} from "rxjs";

@Component({
  selector: 'user-card-list',
  standalone: true,
  imports: [],
  templateUrl: './user-card-list.component.html',
  styleUrl: './user-card-list.component.css',
  providers: [UserService]
})
export class UserCardListComponent implements OnDestroy{

  @Input() userCards: IUserCard[] = [];
  subs: Subscription[] = [];
  constructor(private userService: UserService) {
  }

  ngOnDestroy(): void {
    for (let sub of this.subs){
      sub.unsubscribe();
    }
  }

}