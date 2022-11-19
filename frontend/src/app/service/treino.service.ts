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
        `https://muv-bice.vercel.app/api/treinos/usuario/${idUsuario}`
      )
      .pipe(
        map((dados) => {
          return dados.treino.map((treino: any) => {
            return {
              id: treino._id,
              nome: treino.nome,
              img: treino.img,
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
      .put(`https://muv-bice.vercel.app/api/treinos/`, treinos)
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
      .post(`https://muv-bice.vercel.app/api/treinos/`, treino)
      .subscribe()
  }

  atualizarTreino(id: string, treino: any){
    this.httpClient
      .put(`https://muv-bice.vercel.app/api/treinos/${id}`, treino)
      .subscribe()
  }

  removerTreino(id: string){
    this.httpClient.delete(`https://muv-bice.vercel.app/api/treinos/${id}`).subscribe()
  }
}
