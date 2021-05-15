import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
})
export class ContatoComponent implements OnInit {
  formContato!: FormGroup;
  textoEnviado: boolean = false;
  campoFaltando: boolean = false;

  constructor(public dialogRef: MatDialog) {}

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
    //=====================ENVIAR EMAIL COM ASSUNTO/MENSAGEM=====================

    //=====================ENVIAR EMAIL COM ASSUNTO/MENSAGEM=====================
    this.campoFaltando = false;
    this.textoEnviado = true;
    setTimeout(() => {
      this.textoEnviado = false;
      this.dialogRef.closeAll();
    }, 1500);


  }
}
