import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AuthService} from "../../services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {NgClass} from "@angular/common";
import {UserCardListComponent} from "../../components/user-card-list/user-card-list.component";
import {OperationListComponent} from "../../components/operation-list/operation-list.component";
import {UserService} from "../../services/user.service";
import {firstValueFrom, Subscription} from "rxjs";
import {IUserCard} from "../../models/usercard";
import {WarningModalComponent} from "../../components/warning-modal/warning-modal.component";
import {Dialog} from "@angular/cdk/dialog";

@Component({
  selector: 'main-page',
  standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        MatButton,
        RouterLink,
        RouterLinkActive,
        MatTabGroup,
        MatTab,
        HttpClientModule,
        NgClass,
        UserCardListComponent,
        OperationListComponent
    ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  providers: [AuthService, UserService]
})
export class MainPageComponent implements OnInit{
  userName: string = '';
  isFirstTab: boolean = true;
  userCards: IUserCard[];
  subs: Subscription[] = [];
  toggleTab(){
    this.isFirstTab = !this.isFirstTab;
  }
  constructor(private router: Router, private authService: AuthService, private userService: UserService, public dialog: Dialog) {

  }

  ngOnInit(): void {
    const user = this.authService.getUserName();
    if (user){
      this.userName = user;
    }

    this.getUserCards();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth']).then(()=>{
      console.log('переход на страницу авторизации');
    });
  }

  async updateUserCards(){
      const label: string = 'Список подобранных карт будет отчищен';
      const question: string = 'Продолжить?';
      const acceptButtonLabel: string = 'Подобрать';
      const resultDialog = await this.openWarningDialog(label, question, acceptButtonLabel);
      if (resultDialog){
          const subscription = this.userService.executeAlgorithm().subscribe({
              next:(data) =>{
                  this.userCards = data;
              },
              error:error=>{
                  console.log(error);
              }
          });
          this.subs.push(subscription);
      }

  }
  getUserCards(){
    const subscription = this.userService.getUserCards().subscribe({
        next:(data) =>{
            this.userCards = data;
        },
        error:error=>{
            console.log(error);
        }
    });
    this.subs.push(subscription);
  }

  openWarningDialog(label: string, question: string, acceptButtonLabel: string = 'Принять'){
    const dialogRef = this.dialog.open<boolean>(WarningModalComponent, {
        data:{label: label, question: question, acceptButtonLabel: acceptButtonLabel}
    });

    return firstValueFrom(dialogRef.closed);
  }
}
