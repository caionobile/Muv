import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetalheExercicioComponent } from './detalhe-exercicio/detalhe-exercicio.component';

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicios.component.html',
  styleUrls: ['./exercicios.component.scss'],
})
export class ExerciciosComponent implements OnInit {

  exercicio = {
    nome: 'Abdominal leve',
    sessoes: 3,
    repeticoes: 15,
  };

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  abrirDetalhes(): void {
    const dialogRef = this.dialog.open(DetalheExercicioComponent);
  }
}
