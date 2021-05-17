import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../auth/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  email: string;
  form: FormGroup;

  constructor(private usuarioService:UsuarioService, public dialogRef: MatDialogRef<CadastroComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.email = data.email;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      senha: new FormControl(null, {
        validators: [Validators.required]
      })
    })
  }

  onSignUp(){
    if(this.form.invalid)return;
    let usuario = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      senha: this.form.value.senha
    }
    this.usuarioService.criarUsuario(usuario.nome, usuario.email, usuario.senha);
    this.dialogRef.close();
  }

}
