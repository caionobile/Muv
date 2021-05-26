import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExercicioService } from 'src/app/service/exercicio.service';
import { Exercicio } from '../../models/exercicio.model';
import { CriarExercicioComponent } from '../criar-exercicio/criar-exercicio.component';

@Component({
  selector: 'app-detalhe-exercicio',
  templateUrl: './detalhe-exercicio.component.html',
  styleUrls: ['./detalhe-exercicio.component.scss'],
})
export class DetalheExercicioComponent implements OnInit {

  detalheExercicio: Exercicio;
  idUsuario: string = localStorage.getItem('id');

  constructor(private toastr: ToastrService, public dialog: MatDialog, public exercicioService: ExercicioService, public dialogRef: MatDialogRef<DetalheExercicioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.detalheExercicio = data.exercicio;
  }

  ngOnInit(): void { }

  alterar() {
    const dialogRef = this.dialog.open(CriarExercicioComponent, {
      data: { exercicio: this.detalheExercicio },
    });
  }

  excluir() {
    if(confirm('Deseja excluir o exercício "' + this.detalheExercicio.nome + '"?')) {
      if(this.detalheExercicio.assignTo === localStorage.getItem('id')){
        this.exercicioService.removerExercicio(this.detalheExercicio.id)
        this.mostrarToastExercicioExcluidoSucesso()
        setTimeout(() => {location.reload();}, 1800)
      }
    }
  }

  mostrarToastExercicioExcluidoSucesso(){
    this.toastr.success('Exercício Excluído', 'Sucesso', {
      positionClass : "toast-top-center",
      timeOut : 1800
    });
  }
}
