import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  availableExercises: Observable<any>

  constructor(
    private exerciseService: ExerciseService,
    private readonly db: AngularFirestore
  ) { }

  ngOnInit() {
    this.availableExercises = this.db.collection('availableExercises').valueChanges();
  }

  onStartTraining(form: NgForm) {

    this.exerciseService.startExercise(form.value.exercise);
  }

}
