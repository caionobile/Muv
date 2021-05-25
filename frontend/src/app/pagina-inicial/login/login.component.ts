import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../auth/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginError: boolean = false;
  constructor(
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      emailLogin: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      senhaLogin: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onLogin() {
    if (this.form.invalid) return;
    this.usuarioService.login(
      this.form.value.emailLogin,
      this.form.value.senhaLogin
    );
    setTimeout(() => {
      if (this.usuarioService.getErroLogin()) this.loginError = true;
      else {
        this.router.navigate(['/muv']);
        this.dialogRef.close();
      }
    }, 750);
  }
}
