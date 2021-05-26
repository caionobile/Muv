import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercicio } from '../models/exercicio.model';
import { ExercicioService } from '../service/exercicio.service';
import { TreinoService } from '../service/treino.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CriarExercicioComponent } from '../exercicios/criar-exercicio/criar-exercicio.component';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Treino } from '../models/treino.model';
import { ToastrService } from 'ngx-toastr';

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
  routerTreino: any;

  constructor(
    private toastr: ToastrService,
    public exercicioService: ExercicioService,
    public treinoService: TreinoService,
    public dialog: MatDialog,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.routerTreino = this.router.getCurrentNavigation().extras.state;
      for(let t of this.routerTreino.exercicios) {
        let et: Exercicio = {
          id: t._id,
          nome: t.nome,
          descricao: t.descricao,
          intensidade: t.intensidade,
          repeticoes: t.repeticoes,
          series: t.series,
          assignTo: t.assignTo,
        }
        this.exerciciosTreino.push(et);
      }
    }
  }

  ngOnInit(): void {
    const idUsuario = localStorage.getItem('id');
    if (this.routerTreino) {
      this.treinoForm = new FormGroup({
        nome: new FormControl(this.routerTreino.nome, {
          validators: [Validators.required, Validators.minLength(1)],
        }),
      });
    } else {
      this.treinoForm = new FormGroup({
        nome: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(1)],
        }),
      });
    }

    this.exercicioService.getExercicios(idUsuario);
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
    if (event.container.id == 'lista-exercicios') {
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

  cadastrarTreino(treinoForm: FormGroup) {
    this.treinoForm = treinoForm;
    if (this.treinoForm.invalid || this.exerciciosTreino[0] == null) {
      if (this.exerciciosTreino[0] == null) {
        document.getElementById('exercicios-treino').innerHTML =
          'Coloque pelo menos um exercício para o treino!';
        document.getElementById('exercicios-treino').style.color = '#ff1414cb';
        document.getElementById('lista-exercicios').style.borderColor =
          '#ff1414cb';
      } else {
        document.getElementById('lista-exercicios').style.borderColor =
          'rgba(128, 128, 128, 0.466)';
      }
      document.getElementById('mat-form-nome').style.borderColor = '#ff1414cb';
      return;
    }
    let idExercicios = [];
    for (let i of this.exerciciosTreino) {
      idExercicios.push(i.id);
    }
    let treino = {
      nome: this.treinoForm.value.nome,
      assignTo: localStorage.getItem('id'),
      exercicios: idExercicios,
    };
    this.exerciciosTreino = [];
    document.getElementById('mat-form-nome').style.borderColor =
      'rgba(90, 90, 90, 0.61)';
    document.getElementById('lista-exercicios').style.borderColor =
      'rgba(128, 128, 128, 0.466)';
    (<HTMLInputElement>document.getElementById('nomeInput')).value = '';
    this.treinoForm = new FormGroup({
      nome: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
    });
    if (this.routerTreino){
      this.treinoService.atualizarTreino(this.routerTreino.id, treino);
      this.mostrarToastTreinoAtualizadoSucesso()
      this.router.navigate(['/muv/meus-treinos']);
    } else {
      this.treinoService.criarTreino(treino);
      this.mostrarToastTreinoSucesso()
    }

    // location.reload();
  }

  novoExercicio() {
    this.dialog.open(CriarExercicioComponent, {
      data: { exercicio: null },
    });
  }

  mostrarToastTreinoSucesso(){
    this.toastr.success('Treino Cadastrado', 'Sucesso', {
      positionClass : "toast-top-center",
      timeOut: 1800
    });
  }

  mostrarToastTreinoAtualizadoSucesso(){
    this.toastr.success('Treino Atualizado', 'Sucesso', {
      positionClass : "toast-top-center",
      timeOut: 1800
    });
  }
}
