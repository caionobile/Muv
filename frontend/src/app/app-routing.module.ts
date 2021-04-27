import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ContatoComponent } from './contato/contato.component';
import { TreinosComponent } from './treinos/treinos.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'meus-treinos', //Redirecionando para "meus-treinos", sendo a Home
    pathMatch: 'full'
  },
  {
    path: "meus-treinos",
    component: TreinosComponent
  },
  {
    path: "workspace",
    component: WorkspaceComponent
  },
  {
    path: "calculadora",
    component: CalculadoraComponent
  },
  {
    path: "contato",
    component: ContatoComponent
  },
  {
    path: "pagina-inicial",
    component: PaginaInicialComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
