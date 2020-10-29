import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  availableExercises: Exercise[];
  isLoading = true;
  private exerciseSubscription: Subscription;
  private loadingSubscription: Subscription;

  constructor(
    private exerciseService: ExerciseService,
    private uiService: UIService
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.exerciseSubscription = this.exerciseService.exercisesChanges.subscribe(exercises => {
      this.availableExercises = exercises;
    });
    this.exerciseService.fetchAvailableExercises();

  }

  fetchExercises() {
    this.exerciseService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.exerciseService.startExercise(form.value.exercise);
  }

}
