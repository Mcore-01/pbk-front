import {Component, OnDestroy} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {FormsModule, NgForm} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Subscription} from "rxjs";

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
        this.isInvalidPassword = false;
        this.loginSub = this.http.createToken(form.value.login,form.value.password).subscribe({
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
                    case "InvalidUserPassword":
                        this.errorMessage = "Неправильный пароль!";
                        this.isInvalidPassword = true;
                        break;
                }
                console.log(this.errorMessage);
            }
        });

    }

    ngOnDestroy() {
        if (this.loginSub){
            this.loginSub.unsubscribe();
        }
    }
}
