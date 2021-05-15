import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ExercicioService } from 'src/app/service/exercicio.service';
@Component({
  selector: 'app-criar-exercicio',
  templateUrl: './criar-exercicio.component.html',
  styleUrls: ['./criar-exercicio.component.scss']
})
export class CriarExercicioComponent implements OnInit {

  form: FormGroup;
  constructor(private exercicioService:ExercicioService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nomeExercicio: new FormControl(null, {
        validators: [Validators.required]
      }),
      intensidade: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      descricao: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      series: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      repeticao: new FormControl(null, {
        validators: [Validators.required]
      })
    })
  }
  onSignup (form:NgForm){
    console.log(form.value)
    if(form.invalid)return;
    this.exercicioService.criarExercicio(
      form.value.nomeExercicio,
      form.value.intensidade,
      form.value.descricao,
      form.value.series,
      form.value.repeticao);
  }

}
