import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetalheExercicioComponent } from './detalhe-exercicio/detalhe-exercicio.component';
import { Exercicio } from './exercicio.model'

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicios.component.html',
  styleUrls: ['./exercicios.component.scss'],
})
export class ExerciciosComponent implements OnInit {

  @Input() exercicio: Exercicio;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  abrirDetalhes(): void {
    const dialogRef = this.dialog.open(DetalheExercicioComponent, {
      data: {exercicio: this.exercicio}
    });
  }

}
