import { Exercicio } from './exercicio.model';

export interface Treino{
  id: string;
  nome: string;
  posicao: number;
  exercicios: Exercicio[];
  assignTo: string;
}
