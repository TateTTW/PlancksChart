import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ChartModule, SplineSeriesService, StripLineService } from "@syncfusion/ej2-angular-charts";
import { SliderModule } from '@syncfusion/ej2-angular-inputs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlancksChartComponent } from './plancks-chart/plancks-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    PlancksChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    SliderModule
  ],
  providers: [StripLineService, SplineSeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
