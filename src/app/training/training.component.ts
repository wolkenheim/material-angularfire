import { Component, OnInit } from '@angular/core';
import { Exercise } from './exercise.model';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {

  }

}
