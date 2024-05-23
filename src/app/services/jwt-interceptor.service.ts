import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor{
    constructor(private router : Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem("jwtToken");

        if (token){
            const reqWithJWT = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + token)
            })
            return next.handle(reqWithJWT).pipe(catchError(error => {
                if (!!error.status && error.status === 401) {
                    this.router.navigate(['/auth']).then(()=>{
                        console.log("токен не действителен, переадресация на страницу авторизации");
                    });
                    return throwError(()=> error);
                }
                return throwError(()=> error);
            }));
        }
        else{
            this.router.navigate(['/auth']).then();
        }
        return next.handle(req);
    }
}
