import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { constants } from "../common/constants";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGaurd implements CanActivate {

    constructor(private router: Router, private userService: UserService) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this.isUserLoggedIn() && state.url === constants.ROUTE_URL.USERS) {
            this.userService.updateIsUserLogged.next(true);
            return true
        } else {
            this.router.navigateByUrl(constants.ROUTE_URL.LOGIN)
            return false;
        }
    }

    /* Authentication backend goes here */
    isUserLoggedIn() {
        return localStorage.getItem('isLogged') ? true : false;
    }
}