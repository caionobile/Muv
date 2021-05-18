import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailService } from 'src/app/service/email.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
})
export class ContatoComponent implements OnInit {
  formContato!: FormGroup;
  textoEnviado: boolean = false;
  campoFaltando: boolean = false;

  nomeUsuario: string = localStorage.getItem("nome")
  emailUsuario: string = localStorage.getItem("email")

  constructor(public dialogRef: MatDialog, public email: EmailService) {}

  ngOnInit(): void {
    this.formContato = new FormGroup({
      assunto: new FormControl(null, {
        validators: [Validators.required],
      }),
      mensagem: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  enviar(): void {
    if (this.formContato.invalid) {
      this.textoEnviado = false;
      this.campoFaltando = true;
      return;
    }

    this.email.enviarEmail(
      this.nomeUsuario,
      this.emailUsuario,
      this.formContato.value.assunto,
      this.formContato.value.mensagem
    );

    this.campoFaltando = false;
    this.textoEnviado = true;

    setTimeout(() => {
      this.textoEnviado = false;
      this.dialogRef.closeAll();
    }, 1500);
  }
}
