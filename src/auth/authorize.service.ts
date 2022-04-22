import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import decode from 'jwt-decode';


@Injectable({
    providedIn: 'root'
})
export class AuthorizeService {

    constructor(public jwtHelper: JwtHelperService, private router: Router) { }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem(environment.token);
        // Check whether the token is expired and return
        // true or false
        if (token) {
            return !this.jwtHelper.isTokenExpired(token);
        }
        return false;
    }

    /**
     * setToken
     */
    // tslint:disable-next-line: typedef
    public setToken(token: string) {
        localStorage.setItem(environment.token, token);
    }

    public logout() {
        localStorage.removeItem(environment.token);
        this.router.navigate(['/auth/login']);
    }
    public getLoggedInUsersRole() {
        const token = localStorage.getItem(environment.token);
        var roles;
        if (token) {
            var tokenPayload = decode(token);
        }
        if (Array.isArray((tokenPayload as any)[environment.roleClaim])) {
            roles = (tokenPayload as any)[environment.roleClaim];
        }
        else {
            roles = Array((tokenPayload as any)[environment.roleClaim]);
        }

        return roles;
    }

    get loggedInUser(): string {
        const token = localStorage.getItem(environment.token);
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return token;
        }
        return null;
    }
    
    public getLoggedInUserName(): string {
        const token = localStorage.getItem(environment.token);
        const decoded=decode(token)
       return decoded[environment.userName];
    }
}
