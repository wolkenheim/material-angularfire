import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated: boolean = false;

    constructor(
        private router: Router,
        private auth: AngularFireAuth
    ) { }

    async registerUser(authData: AuthData) {
        try {
            await this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            this.authSucces();
        } catch (error) {
            this.isAuthenticated = false;
            console.log(error);
        }

    }

    async login(authData: AuthData) {
        try {
            await this.auth.signInWithEmailAndPassword(authData.email, authData.password)
            this.authSucces();
        } catch (error) {
            this.isAuthenticated = false;
            console.log(error);
        }
    }

    logout() {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    isAuth() {
        return this.isAuthenticated;
    }

    private authSucces() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}