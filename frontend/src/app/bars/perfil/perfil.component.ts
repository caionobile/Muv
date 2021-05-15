import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  feedback: string = "";
  validacoes = {
    senhaRedefinida: "Senha redefinida com sucesso!",
    novaSenhaIgualAntiga: "A nova senha não pode ser igual a senha anterior",
    senhaAtualIncorreta: "Senha atual incorreta",
    campoFaltando: "Preencha todos os campos",
  }
  formRedefinicao!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.formRedefinicao = new FormGroup({
      senhaAtual: new FormControl(null, {
        validators: [Validators.required],
      }),
      novaSenha: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  redefinirSenha(): void {
    if (this.formRedefinicao.invalid){
      this.feedback = this.validacoes.campoFaltando;
      return
    }
    else if (this.formRedefinicao.value.senhaAtual == this.formRedefinicao.value.novaSenha){
      this.feedback = this.validacoes.novaSenhaIgualAntiga;
    }
    //=====================CHECAR SENHA ANTIGA=====================
/*  else if (this.formRedefinicao.value.senhaAtual != SENHA_ANTIGA_DO_USUARIO){
      this.feedback = this.validacoes.senhaAtualIncorreta;
    } */
    else {
      //=====================REDEFINIÇÃO DE SENHA=====================

      //=====================REDEFINIÇÃO DE SENHA=====================
      this.feedback = this.validacoes.senhaRedefinida;
      setTimeout(() => {this.feedback = ""}, 5000)
    }
  }

}
