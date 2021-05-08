import { Injectable } from '@angular/core';
import { Treino } from '../models/treino.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TreinoService {
  private treinos: Treino[] = [];
  private listaTreinosAtualizada = new Subject<Treino[]>();

  constructor(private httpClient: HttpClient) {}

  // getTreinos(): void {
  //   this.httpClient.get <Treinos[]>('http://localhost:3000/api/treinos')
  //   .subscribe((dados) => {
  //     this.treinos = dados;
  //     this.listaTreinosAtualizada.next([... this.treinos]);
  //   })
  // }

  getTreinos(): void {
    this.httpClient
      .get<{ mensagem: string; treinos: any }>(
        'http://localhost:3000/api/treinos'
      )
      .pipe(
        map((dados) => {
          return dados.treinos.map((treino: any) => {
            return {
              id: treino.id,
              nome: treino.nome,
              posicao: treino.posicao,
              exercicios: treino.exercicios,
            };
          });
        })
      )
      .subscribe((treinos) => {
        this.treinos = treinos;
        this.listaTreinosAtualizada.next([...this.treinos]);
      });
  }

  getListaDeTreinosAtualizadaObservable() {
    return this.listaTreinosAtualizada.asObservable();
  }

  atualizarPosicaoDeTreinos(treinos: Treino[]) {
    this.httpClient
      .put(`http://localhost:3000/api/treinos/`, treinos)
      .subscribe((res) => {
        // const copia = [...this.clientes];
        // const indice = copia.findIndex((cli) => cli.id === id);
        // const cliente: Cliente = {
        //   id: id,
        //   nome: nome,
        //   fone: fone,
        //   email: email,
        //   imagemURL: '',
        // };
        // copia[indice] = cliente;
        // this.clientes = copia;
        // this.listaClientesAtualizada.next([...this.clientes]);
      });
  }
}
