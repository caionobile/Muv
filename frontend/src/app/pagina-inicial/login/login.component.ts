import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../auth/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private usuarioService:UsuarioService, public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      emailLogin: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      senhaLogin: new FormControl(null, {
        validators: [Validators.required]
      })
    })
  }

  onLogin(){
    if(this.form.invalid)return;
    this.usuarioService.login(this.form.value.emailLogin,this.form.value.senhaLogin);
    this.dialogRef.close();
  }

}
