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

  getTreinos(idUsuario): void {
      this.httpClient
      .get<{ treino: any }>(
        `http://localhost:3000/api/treinos/usuario/${idUsuario}`
      )
      .pipe(
        map((dados) => {
          return dados.treino.map((treino: any) => {
            return {
              id: treino._id,
              nome: treino.nome,
              posicao: treino.posicao,
              exercicios: treino.exercicios,
              assignTo: treino.assignTo
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

  criarTreino(treino: any){
    this.httpClient
      .post(`http://localhost:3000/api/treinos/`, treino)
      .subscribe()
  }

  atualizarTreino(id: string, treino: any){
    this.httpClient
      .put(`http://localhost:3000/api/treinos/${id}`, treino)
      .subscribe()
  }

  removerTreino(id: string){
    this.httpClient.delete(`http://localhost:3000/api/treinos/${id}`).subscribe()
  }
}
