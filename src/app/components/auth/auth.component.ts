import {Component, OnDestroy} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {FormsModule, NgForm} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
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
    isInvalidLogin: boolean = false;
    isInvalidPassword: boolean = false;

    loginSub: Subscription;
    constructor(private http: AuthService)  {

    }

    authorize(form:NgForm){
        this.errorMessage = "";
        this.isInvalidLogin = false;
        this.isInvalidPassword = false
        let logintype;
        try {
            logintype = this.getLoginType(form.value.login)
        }
        catch (error){
            if (error instanceof Error) {
                this.errorMessage = error.message;
                this.isInvalidLogin = true;
            }
            return;
        }

        this.loginSub = this.http.createToken(logintype, form.value.login,form.value.password).subscribe({
            next:(data: any) => console.log(data),
            error: error => {
                const errorCode: string  = error.error.code;
                switch (errorCode){
                    case "UserUsernameNotExists":
                        this.errorMessage = "Такого имени пользователя нет!";
                        this.isInvalidLogin = true;
                        break;
                    case "UserEmailNotExists":
                        this.errorMessage = "Такой почти нет!";
                        this.isInvalidLogin = true;
                        break;
                    case "UserPhonenumberNotExists":
                        this.errorMessage = "Такой номер не найден!";
                        this.isInvalidLogin = true;
                        break;
                    case "ServerError":
                        this.errorMessage = "Ошибка сервера!";
                        this.isInvalidLogin = true;
                        break;
                    case "InvalidUserPassword":
                        this.errorMessage = "Неправильный пароль!";
                        this.isInvalidPassword = true;
                        break;
                }
                console.log(this.errorMessage);
            }
        });

    }

    getLoginType (login: string):Logintypes{
        const regUsername : RegExp = /^[A-z0-9_-]{3,16}$/;
        const regEmail : RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        const regPhoneNumber : RegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

        if (regPhoneNumber.test(login))
            return Logintypes.PhoneNumber

        if (regUsername.test(login))
            return Logintypes.Username;

        if (regEmail.test(login))
            return Logintypes.Email;



        throw new Error('Невалидное значение');
    }

    ngOnDestroy() {
        if (this.loginSub){
            this.loginSub.unsubscribe();
        }
    }
}
