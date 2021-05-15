import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {
  formContato!: FormGroup;
  textoEnviado: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  enviar():void {

  }
}
