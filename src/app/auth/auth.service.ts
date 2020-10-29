import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ExerciseService } from '../training/exercise.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated: boolean = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private exerciseService: ExerciseService,
        private snackbar: MatSnackBar,
        private uiService: UIService
    ) { }

    async registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        try {
            await this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password);
            this.uiService.loadingStateChanged.next(false);
        } catch (error) {
            this.uiService.loadingStateChanged.next(false);
            this.snackbar.open(error.message, null, {
                duration: 3000
            });
        }

    }

    async login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        try {
            await this.afAuth.signInWithEmailAndPassword(authData.email, authData.password);
            this.uiService.loadingStateChanged.next(false);
        } catch (error) {
            this.uiService.loadingStateChanged.next(false);
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