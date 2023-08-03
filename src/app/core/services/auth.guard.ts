import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatLegacyDialog } from '@angular/material/legacy-dialog';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private cookieService: CookieService,
               private dialog: MatLegacyDialog) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     return true;
  }


}
