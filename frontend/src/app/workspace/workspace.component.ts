import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercicio } from '../models/exercicio.model';
import { ExercicioService } from '../service/exercicio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})

export class WorkspaceComponent implements OnInit, OnDestroy {

  exercicios: Exercicio[] = [];
  private exerciciosSubscription: Subscription;

  constructor(public exercicioService: ExercicioService) { }

  ngOnInit(): void {
    this.exercicioService.getExercicios();
    this.exerciciosSubscription = this.exercicioService
    .getListaDeExerciciosAtualizadaObservable()
    .subscribe((exercicios: Exercicio[]) => {
      this.exercicios = exercicios;
    });
  }

  ngOnDestroy(): void {
    this.exerciciosSubscription.unsubscribe();
  }

}
