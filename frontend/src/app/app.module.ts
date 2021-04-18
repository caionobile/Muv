import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreinosComponent } from './treinos/treinos.component';
import { WorkspaceComponent } from './workspace/workspace.component';

@NgModule({
  declarations: [
    AppComponent,
    TreinosComponent,
    WorkspaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
