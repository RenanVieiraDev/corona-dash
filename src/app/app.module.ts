import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';


//importes angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';

//componentes da view
import { TopoMenuComponent } from './views/topo-menu/topo-menu.component';
import { HomeComponent } from './views/home/home.component';


//services
import { SistemaService } from './shared/services/sistema.service';
import { ResponseAPIService } from './shared/services/response-api.service';

@NgModule({
  declarations: [
    AppComponent,
    TopoMenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatSelectModule
  ],
  providers: [
    SistemaService,
    ResponseAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
