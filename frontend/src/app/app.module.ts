import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreinosComponent } from './treinos/treinos.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { SidebarModule } from 'ng-sidebar';
import {MatCardModule} from '@angular/material/card';
import { ExerciciosComponent } from './exercicios/exercicios.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { FlipCardComponent } from './treinos/flip-card/flip-card.component';
import { FlipCardFrontComponent } from './treinos/flip-card/flip-card-front';
import { FlipCardBackComponent} from './treinos/flip-card/flip-card-back';
import { DetalheExercicioComponent } from './exercicios/detalhe-exercicio/detalhe-exercicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatRadioModule} from '@angular/material/radio';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './pagina-inicial/auth/auth-interceptor';
import { BarsComponent } from './bars/bars.component';
import { NgsgModule } from 'ng-sortgrid';
import { CriarExercicioComponent } from './exercicios/criar-exercicio/criar-exercicio.component';
import { PerfilComponent } from './bars/perfil/perfil.component';
import { LogoffComponent } from './bars/logoff/logoff.component';
import { ContatoComponent } from './bars/contato/contato.component';
import { NavbarPaginaInicialComponent } from './pagina-inicial/navbar-pagina-inicial/navbar-pagina-inicial.component';
import { CloseModalComponent } from './bars/close-modal/close-modal.component';
import { LoginComponent } from './pagina-inicial/login/login.component';
import { CadastroComponent } from './pagina-inicial/cadastro/cadastro.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    TreinosComponent,
    WorkspaceComponent,
    CalculadoraComponent,
    ExerciciosComponent,
    DetalheExercicioComponent,
    FlipCardComponent,
    FlipCardFrontComponent,
    FlipCardBackComponent,
    PaginaInicialComponent,
    BarsComponent,
    CriarExercicioComponent,
    PerfilComponent,
    LogoffComponent,
    ContatoComponent,
    NavbarPaginaInicialComponent,
    CloseModalComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    DragDropModule,
    SidebarModule.forRoot(),
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatInputModule,
    NgbModule,
    MatRadioModule,
    NgsgModule,
    ToastrModule.forRoot({
      timeOut: 1800,
      progressBar: true,
      progressAnimation: "increasing",
      preventDuplicates: true
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
