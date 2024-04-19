import {Component, OnDestroy} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {IRegisterRequest} from "../../models/register";

@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css',
  providers:[AuthService]
})
export class RegComponent implements OnDestroy{
  errorMessage: string = "";
  showErrorBox: boolean = false;
  errorType: object = {"": false};

  regSub: Subscription;
  constructor(private http: AuthService, private route:Router)  {

  }

  registration(form:NgForm){
    this.errorMessage = "";
    this.errorType = {"": false};
    this.showErrorBox = false;
    if (form.value.password != form.value.repeatPassword){
      this.errorMessage = "пароли не совпадают!";
      this.errorType = {'error-second-row': true};
      this.showErrorBox = true;
      return;
    }

    let registerRequet: IRegisterRequest = {
      Username: form.value.nickname,
      Password: form.value.password,
      PhoneNumber: form.value.phoneNumber,
      Email: form.value.email
    }

    this.regSub = this.http.registration(registerRequet).subscribe({
      next:(data: any) => console.log(data),
      error: error => {
        const errorCode: string  = error.error.code;
        this.showErrorBox = true;
        switch (errorCode){
          case "UserUsernameExists":
            this.errorMessage = "Имя уже используется!";
            break;
          case "UserEmailExists":
            this.errorMessage = "Почта уже используется!";
            break;
          case "UserPhonenumberExists":
            this.errorMessage = "Номер уже используется!";
            break;
          case "ServerError":
            this.errorMessage = "Ошибка сервера!";
            break;
        }
        console.log(this.errorMessage);
      }
    });

  }

  openAuthPage(){
    this.route.navigate(['/auth'])
  }

  changePasswordInput(regForm: NgForm){

  }
  blurPasswordInput(form: NgForm){
    if ((form.value.password).length < 6){
      this.errorMessage = "Пароль, должен быть минимум из 6 символов!";
      this.errorType = {'error-second-row': true};
      this.showErrorBox = true;
      return;
    }

    this.errorMessage = "";
    this.errorType = {"": false};
    this.showErrorBox = false;
  }

  focusPasswordInput(){
    this.errorMessage = "Пароль, должен быть минимум из 6 символов!";
    this.errorType = {"error-second-row blue-background": true};
    this.showErrorBox = true;
  }

  ngOnDestroy() {
    if (this.regSub){
      this.regSub.unsubscribe();
    }
  }
}
