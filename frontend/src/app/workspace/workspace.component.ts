import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercicio } from '../models/exercicio.model';
import { ExercicioService } from '../service/exercicio.service';
import { TreinoService } from '../service/treino.service';
import { Subscription } from 'rxjs';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  exercicios: Exercicio[] = [];
  exerciciosTreino: Exercicio[] = [];
  private exerciciosSubscription: Subscription;
  treinoForm: FormGroup;

  constructor(public exercicioService: ExercicioService,public treinoService: TreinoService ) {}

  ngOnInit(): void {
    this.treinoForm = new FormGroup({
      nome: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      })
    });

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

  drop(event: CdkDragDrop<Exercicio[]>) {
    if(event.container.id == 'lista-exercicios'){
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        copyArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    } else {
      this.exerciciosTreino.splice(event.previousIndex, 1);
    }
  }

  onCreateTreino(treinoForm: FormGroup){
    this.treinoForm = treinoForm;
    if(this.treinoForm.invalid || this.exerciciosTreino[0] == null) {
      if (this.exerciciosTreino[0] == null){
        document.getElementById("exercicios-treino")
        .innerHTML = "Coloque pelo menos um exercício para o treino!";
        document.getElementById("exercicios-treino")
        .style.color = "#ff1414cb";
        document.getElementById("lista-exercicios")
        .style.borderColor = "#ff1414cb";
      } else {
        document.getElementById("lista-exercicios")
        .style.borderColor = "rgba(128, 128, 128, 0.466)";
      }
      document.getElementById("mat-form-nome")
      .style.borderColor = "#ff1414cb";
      return;
    };
    let idExercicios= [];
    for (let i of this.exerciciosTreino){
      idExercicios.push(i.id);
    }
    let treino = {
      nome: this.treinoForm.value.nome,
      assignTo: "608dc95d48429b2a20a21263",
      exercicios: idExercicios,
    };
    this.exerciciosTreino = [];
    document.getElementById("mat-form-nome")
    .style.borderColor = "rgba(90, 90, 90, 0.61)";
    document.getElementById("lista-exercicios")
    .style.borderColor = "rgba(128, 128, 128, 0.466)";
    (<HTMLInputElement>document.getElementById("nomeInput"))
    .value = "";
    this.treinoForm = new FormGroup({
      nome: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      })
    });
    this.treinoService.criarTreino(treino)
    // location.reload();
  }
}
