import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  formRedefinicao!: FormGroup;
  senhaRedefinida: boolean = false;
  senhasIguais: boolean = false;
  senhaAtualIncorreta: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  redefinirSenha(): void {}
}
