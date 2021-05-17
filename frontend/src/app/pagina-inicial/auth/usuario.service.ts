import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { AuthDataL } from './auth-datal.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private token: string;
  private authStatusSubject = new Subject<boolean>();
  private autenticado: boolean = false;
  public getToken(): string {
    return this.token;
  }

  isAutenticado(): boolean {
    return this.autenticado;
  }

  public getStatusSubject() {
    return this.authStatusSubject.asObservable();
  }

  constructor(private httpClient: HttpClient, private router: Router) {}
  criarUsuario(nome: string, email: string, senha: string) {
    const authData: AuthData = {
      nome: nome,
      email: email,
      senha: senha,
    };
    this.httpClient
      .post('http://localhost:3000/api/usuarios/signup', authData)
      .subscribe((resposta) => {
        console.log(resposta);
        this.login(authData.email, authData.senha);
      });

  }
  login(email: string, senha: string) {
    const authDatal: AuthDataL = {
      email: email,
      senha: senha,
    };
    this.httpClient
      .post<{ token: string }>(
        'http://localhost:3000/api/usuarios/login',
        authDatal
      )
      .subscribe((resposta) => {
        this.token = resposta.token;
        if (this.token) {
          this.autenticado = true;
          this.authStatusSubject.next(true);
          this.router.navigate(['/muv']);
        }
      });
  }

  logout() {
    this.token = null;
    this.authStatusSubject.next(false);
    this.router.navigate(['/']);
  }
}
