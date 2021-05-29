import { Injectable } from '@angular/core';
import { Exercicio } from '../models/exercicio.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ExercicioService {
  private exercicios: Exercicio[] = [];
  private listaExerciciosAtualizada = new Subject<Exercicio[]>();

  constructor(private httpClient: HttpClient) {}

  criarExercicio(nomeExercicio:string,intensidade:number,descricao:string,series:number,repeticao:number, assignTo:string){
    const exercicio ={
      nome:nomeExercicio,
      intensidade:intensidade,
      descricao:descricao,
      series:series,
      repeticoes:repeticao,
      assignTo: assignTo
    }
    this.httpClient
      .post('http://localhost:3000/api/exercicios',exercicio)
      .subscribe();
  }

  alterarExercicio(idExercicio: string, nomeExercicio:string,intensidade:number,descricao:string,series:number,repeticao:number, assignTo:string) {
    const exercicio ={
      nome:nomeExercicio,
      intensidade:intensidade,
      descricao:descricao,
      series:series,
      repeticoes:repeticao,
      assignTo: assignTo
    }
    this.httpClient
      .put(`http://localhost:3000/api/exercicios/${idExercicio}`,exercicio)
      .subscribe();
  }

  getExercicios(idUsuario): void {
    this.httpClient
      .get<{ mensagem: string; exercicios: any }>(
        `http://localhost:3000/api/exercicios/usuario/${idUsuario}`
      )
      .pipe(
        map((dados) => {
          return dados.exercicios.map((exercicio: any) => {
            return {
              id: exercicio._id,
              nome: exercicio.nome,
              intensidade: exercicio.intensidade,
              descricao: exercicio.descricao,
              series: exercicio.series,
              repeticoes: exercicio.repeticoes,
              assignTo: exercicio.assignTo,
            };
          });
        })
      )
      .subscribe((exercicios) => {
        this.exercicios = exercicios;
        this.listaExerciciosAtualizada.next([...this.exercicios]);
      });
  }

  getListaDeExerciciosAtualizadaObservable() {
    return this.listaExerciciosAtualizada.asObservable();
  }

  removerExercicio(id: string) {
    this.httpClient.delete(`http://localhost:3000/api/exercicios/${id}`).subscribe()
  }
}
