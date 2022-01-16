import { UserService } from './User.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
//IMPL INTER CARD
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    canActivate() {
        if (!this.userService.loggedUser.id) {
            this.router.navigateByUrl('login');
            return false;
        }
        return true;
    }
}