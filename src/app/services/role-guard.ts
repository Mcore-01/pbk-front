import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor() {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = localStorage.getItem("userRole");
    if (role){
      return role == 'Operator';
    }

    return false;
  }
}
export const IsAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean =>{
  return inject(RoleGuard).canActivate(route, state);
}
