import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlancksChartComponent} from "./plancks-chart/plancks-chart.component";

const routes: Routes = [
  { path: "**", component: PlancksChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
