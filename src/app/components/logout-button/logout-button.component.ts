import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'logout-button',
  standalone: true,
  imports: [
    MatButton,
    MatMenuTrigger,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css',
  providers: [AuthService]
})
export class LogoutButtonComponent {

  constructor(private router: Router, private authService: AuthService) {
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/auth']).then(()=>{
      console.log('переход на страницу авторизации');
    });
  }
}
