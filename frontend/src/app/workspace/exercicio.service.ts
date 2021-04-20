import { Injectable } from "@angular/core";
import { Exercicio } from "./exercicio.model";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root'})
export class ExercicioService {
  private exercicios: Exercicio[] = [];
  private listaExerciciosAtualizada = new Subject<Exercicio[]>();

  constructor(private httpClient: HttpClient) {}

  getExercicios(): void {
    this.httpClient.get <Exercicio[]>('http://localhost:3000/api/exercicios')
    .subscribe((dados) => {
      this.exercicios = dados;
      this.listaExerciciosAtualizada.next([... this.exercicios]);
    })
  }

  getListaDeExerciciosAtualizadaObservable(){
    return this.listaExerciciosAtualizada.asObservable();
  }
}
