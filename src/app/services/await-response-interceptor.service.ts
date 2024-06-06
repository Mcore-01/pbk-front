import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {finalize, Observable} from "rxjs";
import {SpinnerService} from "./spinner.service";

@Injectable({
  providedIn: 'root'
})
export class AwaitResponseInterceptorService implements HttpInterceptor{
  constructor(private spinner: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.isLoading(true);
    return next.handle(req).pipe(
        finalize(() => this.spinner.isLoading(false))
    );
  }
}