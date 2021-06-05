import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { TreinosComponent } from './treinos/treinos.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { AuthGuard } from './pagina-inicial/auth/auth.guard';
import { BarsComponent } from './bars/bars.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'pagina-inicial',
    pathMatch: 'full'
  },
  {
    path: "pagina-inicial",
    component: PaginaInicialComponent
  },
  {
    path: 'muv',
    redirectTo: 'muv/meus-treinos',
    pathMatch: 'full',
  },
  {
    path: "muv",
    component: BarsComponent,
    canActivate:[AuthGuard],
    children:
    [
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
    ]
  },

  //Redirecionando pra página inicial caso path não exista
  // {
  //   path: "**",
  //   redirectTo: 'pagina-inicial',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
