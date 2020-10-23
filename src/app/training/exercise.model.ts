import { TrainingState } from './training-states.enum';

export interface Exercise {
    id: string;
    name: string;
    duration: number;
    calories: number;
    date?: Date;
    state?: TrainingState
}