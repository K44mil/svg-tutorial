import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomDesignerComponent } from './_components/room-designer/room-designer.component';
import { GraphsComponent } from './_components/graphs/graphs.component';
import { SorterComponent } from './_components/sorter/sorter.component';


const routes: Routes = [
  { path: 'roomdesigner', component: RoomDesignerComponent },
  { path: 'graphs', component: GraphsComponent },
  { path: 'sorter', component: SorterComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
