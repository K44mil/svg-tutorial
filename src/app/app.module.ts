import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomDesignerComponent } from './_components/room-designer/room-designer.component';
import { GraphsComponent } from './_components/graphs/graphs.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomDesignerComponent,
    GraphsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
