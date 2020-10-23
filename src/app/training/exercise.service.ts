import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { TrainingState } from './training-states.enum';

export class ExerciseService {
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 1, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 1, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];

    private activeExercise: Exercise;
    activeExerciseSelected = new Subject<Exercise>();

    private exercises: Exercise[] = [];

    getAvailableExercises(): Exercise[] {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string): void {
        this.activeExercise = this.availableExercises.find(exercise => selectedId === exercise.id);
        this.activeExerciseSelected.next({ ...this.activeExercise });
    }

    completeExercise(): void {
        this.exercises.push({
            ...this.activeExercise,
            date: new Date(),
            state: TrainingState.COMPLETED
        });
        this.activeExercise = null;
        this.activeExerciseSelected.next(null);
    }

    cancelExercise(progress: number): void {
        this.exercises.push({
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

    getCompletedOrCancelledExercises(): Exercise[] {
        return this.exercises.slice();
    }
}