import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetalheExercicioComponent } from 'src/app/exercicios/detalhe-exercicio/detalhe-exercicio.component';
import { Exercicio } from 'src/app/models/exercicio.model';

@Component({
  selector: 'flip-card-back',
  template: `
    <div class="area-back">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Rep.</th>
            <th scope="col">Nome</th>
            <th scope="col">Séries</th>
          </tr>
        </thead>
        <tbody>
              <tr *ngFor="let exercicio of exercicios" (click)="abrirDetalhes(exercicio)">
                <th scope="row">{{ exercicio.repeticoes }}</th>
                <td>{{ exercicio.nome }}</td>
                <td>{{ exercicio.series }}</td>
              </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['./flip-card.component.scss'],
})
export class FlipCardBackComponent {

  @Input('exercicios') exercicios: Exercicio[];

  constructor(public dialog: MatDialog) {}

  abrirDetalhes(exercicio): void {
    this.dialog.open(DetalheExercicioComponent, {
      data: { exercicio: exercicio },
      width: '650px',
    });
  }
}
