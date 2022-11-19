import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private httpClient: HttpClient) {}

  enviarEmail(
    nomeUsuario: string,
    emailUsuario: string,
    assunto: string,
    mensagem: string
  ): void {
    const email = {
      nomeUsuario: nomeUsuario,
      emailUsuario: emailUsuario,
      assunto: assunto,
      mensagem: mensagem,
    };

    this.httpClient.post('https://muv-bice.vercel.app/api/email', email).subscribe();
  }
}
