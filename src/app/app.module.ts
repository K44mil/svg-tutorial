import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomDesignerComponent } from './_components/room-designer/room-designer.component';
import { GraphsComponent } from './_components/graphs/graphs.component';
import { SorterComponent } from './_components/sorter/sorter.component';
import { LinesComponent } from './_components/lines/lines.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomDesignerComponent,
    GraphsComponent,
    SorterComponent,
    LinesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
