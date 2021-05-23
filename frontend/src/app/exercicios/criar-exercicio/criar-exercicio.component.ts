import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exercicio } from 'src/app/models/exercicio.model';
import { ExercicioService } from 'src/app/service/exercicio.service';
@Component({
  selector: 'app-criar-exercicio',
  templateUrl: './criar-exercicio.component.html',
  styleUrls: ['./criar-exercicio.component.scss'],
})
export class CriarExercicioComponent implements OnInit {
  form: FormGroup;
  exercicio: Exercicio;
  constructor(
    private exercicioService: ExercicioService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.exercicio = data.exercicio;
  }

  ngOnInit(): void {
    if (this.exercicio) {
      this.form = new FormGroup({
        nomeExercicio: new FormControl(this.exercicio.nome, {
          validators: [Validators.required],
        }),
        intensidade: new FormControl(this.exercicio.intensidade, {
          validators: [Validators.required],
        }),
        descricao: new FormControl(this.exercicio.descricao, {
          validators: [Validators.required],
        }),
        series: new FormControl(this.exercicio.series, {
          validators: [Validators.required],
        }),
        repeticao: new FormControl(this.exercicio.repeticoes, {
          validators: [Validators.required],
        }),
      });
    } else {
      this.form = new FormGroup({
        nomeExercicio: new FormControl(null, {
          validators: [Validators.required],
        }),
        intensidade: new FormControl(null, {
          validators: [Validators.required],
        }),
        descricao: new FormControl(null, {
          validators: [Validators.required],
        }),
        series: new FormControl(null, {
          validators: [Validators.required],
        }),
        repeticao: new FormControl(null, {
          validators: [Validators.required],
        }),
      });
    }
  }
  onCriar(form: NgForm) {
    if (form.invalid) return;
    if (this.exercicio) {
      this.exercicioService.alterarExercicio(
        this.exercicio.id,
        form.value.nomeExercicio,
        form.value.intensidade,
        form.value.descricao,
        form.value.series,
        form.value.repeticao,
        localStorage.getItem('id')
      )
    } else {
      this.exercicioService.criarExercicio(
        form.value.nomeExercicio,
        form.value.intensidade,
        form.value.descricao,
        form.value.series,
        form.value.repeticao,
        localStorage.getItem('id')
      );
    }
    location.reload();
  }
}
