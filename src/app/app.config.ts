import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./services/jwt-interceptor.service";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
};
