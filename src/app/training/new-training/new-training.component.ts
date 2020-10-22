import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();

  availableExercises: Exercise[] = [];

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.availableExercises = this.exerciseService.getAvailableExercises();
  }

  onStartTraining() {
    this.trainingStart.emit();
  }

}
