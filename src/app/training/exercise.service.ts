import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { TrainingState } from './training-states.enum';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

type FirebaseExercise = { 'name': string, 'duration': number, 'calories': number };

@Injectable()
export class ExerciseService {
    private availableExercises: Exercise[] = [];

    private activeExercise: Exercise;
    activeExerciseSelected = new Subject<Exercise>();
    exercisesChanges = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private firebaseSubs: Subscription[] = [];

    constructor(
        private readonly db: AngularFirestore
    ) { }

    getAvailableExercises(): Exercise[] {
        return this.availableExercises.slice();
    }

    fetchAvailableExercises(): void {
        this.firebaseSubs.push(
            this.db.collection('availableExercises')
                .snapshotChanges()
                .pipe(map(docArray => {
                    return docArray.map(doc => {
                        let firebaseExercise: FirebaseExercise = doc.payload.doc.data() as FirebaseExercise;
                        return {
                            id: doc.payload.doc.id,
                            name: firebaseExercise.name,
                            duration: firebaseExercise.duration,
                            calories: firebaseExercise.calories,
                        } as Exercise;
                    })
                })
                ).subscribe((exercises: Exercise[]) => {
                    this.availableExercises = exercises;
                    this.exercisesChanges.next([...this.availableExercises]);
                })
        )
    }


    startExercise(selectedId: string): void {
        this.activeExercise = this.availableExercises.find(exercise => selectedId === exercise.id);
        this.activeExerciseSelected.next({ ...this.activeExercise });
    }

    completeExercise(): void {
        this.addDataToDatabase({
            ...this.activeExercise,
            date: new Date(),
            state: TrainingState.COMPLETED
        });
        this.activeExercise = null;
        this.activeExerciseSelected.next(null);
    }

    cancelExercise(progress: number): void {
        this.addDataToDatabase({
            ...this.activeExercise,
            duration: this.activeExercise.duration * (progress / 100),
            calories: this.activeExercise.duration * (progress / 100),
            date: new Date(),
            state: TrainingState.CANCELLED
        });
        this.activeExercise = null;
        this.activeExerciseSelected.next(null);
    }

    getActiveExercise(): Exercise {
        return { ... this.activeExercise };
    }

    fetchCompletedOrCancelledExercises(): void {
        this.firebaseSubs.push(
            this.db.collection('finishedExercises')
                .valueChanges()
                .subscribe((exercises: Exercise[]) => {
                    this.finishedExercisesChanged.next(exercises);
                })
        )
    }

    cancelSubscriptions() {
        this.firebaseSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        console.log("add called", exercise);
        this.db.collection('finishedExercises').add(exercise);
    }
}