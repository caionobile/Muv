import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { AuthDataL } from './auth-datal.model';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private tokenTimer: NodeJS.Timer;
  private token: string;
  private authStatusSubject = new Subject<boolean>();
  private autenticado: boolean = false;
  private usuario: Usuario;
  private erroLogin: boolean = false;
  private erroCadastro: boolean = false;
  public getToken(): string {
    return this.token;
  }

  isAutenticado(): boolean {
    return this.autenticado;
  }

  public getStatusSubject() {
    return this.authStatusSubject.asObservable();
  }

  public getErroLogin(): boolean {
    return this.erroLogin;
  }

  public getErroCadastro(): boolean {
    return this.erroCadastro;
  }

  private salvarDadosCliente(id: string, nome: string, email: string,token: string,validade:Date) {
    localStorage.setItem('id', id);
    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    localStorage.setItem('validade', validade.toISOString());
  }
  public removerDadosCliente() {
    localStorage.removeItem('id');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('validade');
  }

private obterDadosAutentificao(){
  const id = localStorage.getItem('id');
  const nome = localStorage.getItem('nome');
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const validade = localStorage.getItem('validade');
  if(token && validade){
    return {id:id, nome:nome, email:email, token:token,validade:new Date(validade)}
  }return null;

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
      .pipe(
        catchError(() => {
          this.erroCadastro = true;
          return throwError('Email já cadastrado');
        })
      )
      .subscribe(() => {
        this.erroCadastro = false;
        this.login(authData.email, authData.senha);
      });
  }

  autenticarAutomaticamente():boolean {
    const dadosAutentificacao = this.obterDadosAutentificao();
    if(dadosAutentificacao){
      const agora = new Date();
      const diferenca = dadosAutentificacao.validade.getTime()-agora.getTime();
      if(diferenca>0){
        this.token=dadosAutentificacao.token;
        this.autenticado =true;
        this.tokenTimer=setTimeout(() =>{
          this.logout();
        },diferenca);
        this.authStatusSubject.next(true);
        return true;
      }
      return false;
    }
    return false;

  }

  login(email: string, senha: string) {
    const authDatal: AuthDataL = {
      email: email,
      senha: senha,
    };
    this.httpClient
      .post<{ id: string; nome: string; email: string; token: string ; expiresIn:number}>(
        'http://localhost:3000/api/usuarios/login',
        authDatal
      )
      .pipe(
        catchError(() => {
          this.erroLogin = true;
          return throwError('Email e/ou senha incorretos');
        })
      )
      .subscribe((resposta) => {
        this.erroLogin = false;
        this.token = resposta.token;
        if(this.token){
          const tempoValidadeToken= resposta.expiresIn;
          this.tokenTimer = setTimeout(() =>{
            this.logout()
          },tempoValidadeToken*1000);
          this.autenticado = true;
          this.authStatusSubject.next(true);
          this.salvarDadosCliente(resposta.id, resposta.nome, resposta.email,this.token,new Date(new Date().getTime()+tempoValidadeToken*1000));
        }
      });
  }

  logout() {
    this.token = null;
    this.authStatusSubject.next(false);
    clearTimeout(this.tokenTimer);
    this.removerDadosCliente();
    this.router.navigate(['/']);
  }
}
