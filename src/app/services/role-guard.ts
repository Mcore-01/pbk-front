import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn, Router,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAdmin = localStorage.getItem("userRole") === 'Operator';
    if (!isAdmin) {
      this.router.navigate(['/forbidden']).then();
    }
    return isAdmin;
  }
}
export const IsAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean =>{
  return inject(RoleGuard).canActivate(route, state);
}
