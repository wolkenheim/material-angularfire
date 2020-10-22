import { Component, OnDestroy, OnInit } from '@angular/core';
import { Exercise } from './exercise.model';
import { ExerciseService } from './exercise.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  activeExerciseSubscription: Subscription;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.activeExerciseSubscription = this.exerciseService.activeExerciseSelected.subscribe(exercise => {
      if (exercise) {
        this.ongoingTraining = true
      } else {
        this.ongoingTraining = false
      }

    })
  }

  ngOnDestroy() {
    this.activeExerciseSubscription.unsubscribe();
  }

}
