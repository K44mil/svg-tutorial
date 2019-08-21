import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomDesignerComponent } from './_components/room-designer/room-designer.component';


const routes: Routes = [
  { path: 'roomdesigner', component: RoomDesignerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
