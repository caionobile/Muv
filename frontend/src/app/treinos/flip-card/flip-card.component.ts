import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Treino } from 'src/app/models/treino.model';
import { TreinoService } from 'src/app/service/treino.service';

@Component({
  selector: 'flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss']
})
export class FlipCardComponent implements OnInit {

  @Input('treino') treino: Treino;
  idUsuario: string = localStorage.getItem('id')

  toggleProperty = false;

  constructor(private router: Router, private treinoService: TreinoService) { }

  ngOnInit() {
  }

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }

  alterar() {
    this.router.navigate(['muv/workspace'], {state: this.treino})
  }

  excluir() {
    if(confirm('Deseja excluir o treino "' + this.treino.nome + '"?')) {
      if(this.treino.assignTo === localStorage.getItem('id')){
        this.treinoService.removerTreino(this.treino.id)
        location.reload();
      }
    }
  }

}
