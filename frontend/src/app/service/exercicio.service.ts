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

  // getExercicios(): void {
  //   this.httpClient.get <Exercicio[]>('http://localhost:3000/api/exercicios')
  //   .subscribe((dados) => {
  //     this.exercicios = dados;
  //     this.listaExerciciosAtualizada.next([... this.exercicios]);
  //   })
  // }

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
