import {Component, OnDestroy} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {FormsModule, NgForm} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {Logintypes} from "../../enums/logintype";

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [HttpClientModule, FormsModule, CommonModule, RouterLink],
    templateUrl: './auth.component.html',
    styleUrl: "./auth.component.css",
    providers:[AuthService]
})
export class AuthComponent implements  OnDestroy{
    errorMessage: string = "";
    isInvalidAuthData: boolean = false;

    loginSub: Subscription;
    constructor(private route: Router, private http: AuthService)  {

    }

    authorize(form:NgForm){
        this.errorMessage = "";
        this.isInvalidAuthData = false;
        if (!this.getLoginType(form.value.login)){
            this.errorMessage = 'Неверный логин';
            this.isInvalidAuthData = true;
            return;
        }

        this.loginSub = this.http.createToken(form.value.login,form.value.password).subscribe({
            next:(data: any) => this.route.navigate(['']),
            error: error => {
                const errorCode: string  = error.error.code;
                switch (errorCode){
                    case "UserUsernameNotExists":
                        this.errorMessage = "Имя не найдено";
                        this.isInvalidAuthData = true;
                        break;
                    case "UserEmailNotExists":
                        this.errorMessage = "Почта не найдена";
                        this.isInvalidAuthData = true;
                        break;
                    case "UserPhonenumberNotExists":
                        this.errorMessage = "Номер не найден";
                        this.isInvalidAuthData = true;
                        break;
                    case "ServerError":
                        this.errorMessage = "Ошибка сервера";
                        this.isInvalidAuthData = true;
                        break;
                    case "InvalidUserPassword":
                        this.errorMessage = "Неверный пароль";
                        this.isInvalidAuthData = true;
                        break;
                }
                console.log(this.errorMessage);
            }
        });

    }

    getLoginType (login: string):boolean{
        const regUsername : RegExp = /^[A-z0-9_-]{3,16}$/;
        const regEmail : RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        const regPhoneNumber : RegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

        return regPhoneNumber.test(login) || regUsername.test(login) || regEmail.test(login);
    }

    ngOnDestroy() {
        if (this.loginSub){
            this.loginSub.unsubscribe();
        }
    }
}
