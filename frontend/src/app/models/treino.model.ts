import { Exercicio } from './exercicio.model';

export interface Treino{
  id: string;
  nome: string;
  img: string;
  posicao: number;
  exercicios: Exercicio[];
  assignTo: string;
}
