import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomDesignerComponent } from './_components/room-designer/room-designer.component';
import { GraphsComponent } from './_components/graphs/graphs.component';
import { SorterComponent } from './_components/sorter/sorter.component';
import { LinesComponent } from './_components/lines/lines.component';


const routes: Routes = [
  { path: 'roomdesigner', component: RoomDesignerComponent },
  { path: 'graphs', component: GraphsComponent },
  { path: 'sorter', component: SorterComponent },
  { path: 'lines', component: LinesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
