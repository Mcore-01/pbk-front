import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AuthService} from "../../services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {NgClass} from "@angular/common";
import {UserCardListComponent} from "../../components/user-card-list/user-card-list.component";

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
    UserCardListComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  providers: [AuthService]
})
export class MainPageComponent implements OnInit{
  userName: string = '';
  isFirstTab: boolean = true;
  toggleTab(){
    this.isFirstTab = !this.isFirstTab;
  }
  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    const user = this.authService.getUserName();
    if (user){
      this.userName = user;
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth']).then(()=>{
      console.log('переход на страницу авторизации');
    });
  }
}
