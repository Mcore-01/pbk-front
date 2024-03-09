import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor{
    constructor(private router : Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem("jwt_token");

        if (token){
            const reqWithJWT = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + token)
            })
            return next.handle(reqWithJWT);
        }
        else{
            this.router.navigate(['/auth']);
        }
        return next.handle(req);
    }
}
