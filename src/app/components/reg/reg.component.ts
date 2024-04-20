import {Component, OnDestroy} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {IRegisterRequest} from "../../models/register";
import {Logintypes} from "../../enums/logintype";

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

    if (!this.isCorrectField(form.value.nickname, Logintypes.Username)
        || !this.isCorrectField(form.value.phoneNumber, Logintypes.PhoneNumber)
        || !this.isCorrectField(form.value.email, Logintypes.Email)){
      return;
    }

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
          case "InvalidUserEmail":
            this.errorMessage = "Некорректная почта!";
            break;
          case "InvalidUserPhonenumber":
            this.errorMessage = "Некорректный номер!";
            break;
          case "ServerError":
            this.errorMessage = "Ошибка сервера!";
            break;
        }
        console.log(this.errorMessage);
      }
    });

  }
  isCorrectField (field: string, loginType: Logintypes):boolean{
    const regUsername : RegExp = /^[A-z0-9_-]{3,16}$/;
    const regEmail : RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const regPhoneNumber : RegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    if (loginType == Logintypes.Username && !regUsername.test(field)){
      this.errorMessage = "Некорректное пользовательское имя!";
      this.errorType = {'error-second-row': true};
      this.showErrorBox = true;
      return false;
    }
    if (loginType == Logintypes.PhoneNumber && !regPhoneNumber.test(field)){
      this.errorMessage = "Некорректный номер!";
      this.errorType = {'error-second-row': true};
      this.showErrorBox = true;
      return false;
    }
    if (loginType == Logintypes.Email && !regEmail.test(field)){
      this.errorMessage = "Некорректная почта!";
      this.errorType = {'error-second-row': true};
      this.showErrorBox = true;
      return false;
    }
    return true;
  }

  openAuthPage(){
    this.route.navigate(['/auth'])
  }

  blurPasswordInput(form: NgForm){
    if ((form.value.password).length < 6 && (form.value.password).length >= 1){
      this.errorMessage = "В пароле минимум 6 символов.";
      this.errorType = {'error-second-row': true};
      this.showErrorBox = true;
      return;
    }

    this.errorMessage = "";
    this.errorType = {"": false};
    this.showErrorBox = false;
  }

  focusPasswordInput(){
    this.errorMessage = "В пароле минимум 6 символов.";
    this.errorType = {"error-second-row blue-background": true};
    this.showErrorBox = true;
  }

  ngOnDestroy() {
    if (this.regSub){
      this.regSub.unsubscribe();
    }
  }
}
