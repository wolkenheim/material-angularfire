import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ExerciseService } from '../training/exercise.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated: boolean = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private exerciseService: ExerciseService,
        private snackbar: MatSnackBar
    ) { }

    async registerUser(authData: AuthData) {
        try {
            await this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
        } catch (error) {
            this.snackbar.open(error.message, null, {
                duration: 3000
            });
        }

    }

    async login(authData: AuthData) {
        try {
            await this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
        } catch (error) {
            this.snackbar.open(error.message, null, {
                duration: 3000
            });
        }
    }

    logout() {
        this.afAuth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.exerciseService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }
}