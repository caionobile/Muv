import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Treino } from '../models/treino.model';
import { TreinoService } from '../service/treino.service';

@Component({
  selector: 'app-treinos',
  templateUrl: './treinos.component.html',
  styleUrls: ['./treinos.component.scss'],
})
export class TreinosComponent implements OnInit {
  treinos: Treino[] = [];
  treinosPersonalizados: Treino[] = [];
  treinosPredefinidos: Treino[] = [];
  novaOrdem: Treino[];
  private treinosSubscription: Subscription;

  ngOnInit(): void {
    const idUsuario = localStorage.getItem('id');
    this.treinoService.getTreinos(idUsuario);
    this.treinosSubscription = this.treinoService
      .getListaDeTreinosAtualizadaObservable()
      .subscribe((treinos: Treino[]) => {
        this.treinosPersonalizados = treinos.filter(
          (treino) => treino.assignTo === localStorage.getItem('id')
        );
        this.treinosPredefinidos = treinos.filter(
          (treino) => treino.assignTo != localStorage.getItem('id')
        );
        this.treinos = this.treinosPersonalizados;
      });
  }

  constructor(public treinoService: TreinoService) {}

  storeNewOrder(event) {
    if (event.currentOrder[0].assignTo === localStorage.getItem('id')) {
      let ordem = []
      for (let i = 0; i < event.currentOrder.length; i++) {
        if(event.currentOrder[i] != undefined) {
          event.currentOrder[i].posicao = i;
          ordem.push(event.currentOrder[i])
        }
      }
      this.novaOrdem = ordem;
      this.treinoService.atualizarPosicaoDeTreinos(this.novaOrdem);
    }
  }

  mostrarPersonalizados() {
    this.treinos = this.treinosPersonalizados;
  }

  mostrarPredefinidos() {
    this.treinos = this.treinosPredefinidos;
  }
}
