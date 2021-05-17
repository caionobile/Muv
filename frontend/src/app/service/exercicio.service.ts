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

  criarExercicio(nomeExercicio:string,intensidade:number,descricao:string,series:number,repeticao:number){
    const exercicio ={
      nome:nomeExercicio,
      intensidade:intensidade,
      descricao:descricao,
      series:series,
      repeticoes:repeticao,
      assignTo: "608dc95d48429b2a20a21263"
    }
    this.httpClient
      .post('http://localhost:3000/api/exercicios',exercicio)
      .subscribe((resposta) => {
        console.log(resposta);
      });
  }

  getExercicios(): void {
    this.httpClient
      .get<{ mensagem: string; exercicios: any }>(
        'http://localhost:3000/api/exercicios'
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
}
