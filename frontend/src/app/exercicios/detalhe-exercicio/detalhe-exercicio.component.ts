import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exercicio } from '../../models/exercicio.model';

@Component({
  selector: 'app-detalhe-exercicio',
  templateUrl: './detalhe-exercicio.component.html',
  styleUrls: ['./detalhe-exercicio.component.scss'],
})
export class DetalheExercicioComponent implements OnInit {

  detalheExercicio: Exercicio;

  constructor(public dialogRef: MatDialogRef<DetalheExercicioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.detalheExercicio = data.exercicio;
  }

  ngOnInit(): void {}
}
