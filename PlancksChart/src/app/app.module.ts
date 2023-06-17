import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ChartModule, SplineSeriesService, StripLineService } from "@syncfusion/ej2-angular-charts";
import { SliderModule, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlancksChartComponent } from './plancks-chart/plancks-chart.component';
import { DashboardLayoutModule } from "@syncfusion/ej2-angular-layouts";

@NgModule({
  declarations: [
    AppComponent,
    PlancksChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    SliderModule,
    NumericTextBoxModule,
    DashboardLayoutModule
  ],
  providers: [StripLineService, SplineSeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
