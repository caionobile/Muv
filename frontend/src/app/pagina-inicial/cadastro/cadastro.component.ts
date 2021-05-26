import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../auth/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  email: string;
  form: FormGroup;
  cadastroError: boolean = false;

  constructor(
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<CadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    this.email = data.email;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      senha: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onSignUp() {
    if (this.form.invalid) return;
    const usuario = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      senha: this.form.value.senha,
    };
    this.cadastroError = false;
    this.usuarioService.criarUsuario(
      usuario.nome,
      usuario.email,
      usuario.senha
    );
    setTimeout(() => {
      if (this.usuarioService.getErroCadastro() == true){
        this.cadastroError = true;
        this.mostrarToastFalha();
      }
      else {
        this.mostrarToastSucesso();
        this.router.navigate(['/muv']);
        this.dialogRef.close();
      }
    }, 750);
  }

  mostrarToastSucesso(){
    this.toastr.success('Usuário cadastrado com sucesso', 'Cadastro Realizado', {
      positionClass : "toast-top-center"
    });
  }

  mostrarToastFalha(){
    this.toastr.error('Usuário não cadastrado', 'Erro', {
      positionClass : "toast-top-center"
    });
  }
}
