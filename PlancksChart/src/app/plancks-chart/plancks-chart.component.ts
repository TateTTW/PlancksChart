import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ChartComponent, StripLineSettingsModel} from "@syncfusion/ej2-angular-charts";
import {SliderComponent} from "@syncfusion/ej2-angular-inputs";

@Component({
  selector: 'plancks-chart',
  templateUrl: './plancks-chart.component.html',
  styleUrls: ['./plancks-chart.component.less']
})
export class PlancksChartComponent implements OnInit, AfterViewInit {
  @ViewChild("chart") private chart!: ChartComponent;
  @ViewChild("tempSlider") private tempSlider!: SliderComponent;

  defaultTemp = 5000;

  title = 'Blackbody Radiation';

  chartData = [];

  primaryXAxis = {
    title: 'Wavelength',
    valueType: 'Double',
    minimum: 0,
    maximum: 1000,
    interval: 100,
    stripLines: this.getStripLines()
  };

  primaryYAxis = {
    title: 'Spectral Radiance (W*sr-1*m-3)',
    valueType: 'Double',
    minimum: 0
  };

  marker = { visible: false, width: 10, height: 10 };


  constructor() { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.chart.dataSource = this.generateData(this.defaultTemp);
    this.chart.refresh();
  }

  private plancksLawFormula(t: number, wavelength: number): number {
    const w = wavelength * Math.pow(10, -9);

    const kb = 1.3806488 * Math.pow(10, -23);
    const h = 6.62606957 * Math.pow(10, -34);
    const c = 299792458;
    const e = 2.71828182845904523536;

    return ((2 * h * Math.pow(c, 2)) / Math.pow(w, 5)) * (1 / (Math.pow(e, ((h*c)/(w*kb*t))) -1));
  }

  private generateData(temp: number): {x: number, y: number}[] {
    const chartData = [];
    for (let w = 0; w <= 1000; w+=50) {
      chartData.push({
        x: w,
        y: this.plancksLawFormula(temp, w)
      });
    }


    return chartData;
    // const stefanBoltzmann = 5.670374419 * Math.pow(10, -8);
    // const wiensDisplacement = 2.8977719;
    // const x = (wiensDisplacement / temp) * Math.pow(10, 6);
    // const y = (stefanBoltzmann * Math.pow(temp, 4));
    //
    // console.log(JSON.stringify({x: x, y: y}));
  }

  getStripLines(): StripLineSettingsModel[] {
    const red: StripLineSettingsModel = { start: 625, end: 740, color: 'red', visible: true, zIndex: 'Behind' };
    const orange: StripLineSettingsModel = { start: 590, end: 625, color: 'orange', visible: true, zIndex: 'Behind' };
    const yellow: StripLineSettingsModel = { start: 570, end: 590, color: 'yellow', visible: true, zIndex: 'Behind' };
    const green: StripLineSettingsModel = { start: 495, end: 570, color: 'green', visible: true, zIndex: 'Behind' };
    const blue: StripLineSettingsModel = { start: 450, end: 495, color: 'blue', visible: true, zIndex: 'Behind' };
    const violet: StripLineSettingsModel = { start: 380, end: 450, color: 'violet', visible: true, zIndex: 'Behind' };

    return [red, orange, yellow, green, blue, violet];
  }

  tempChangeHandler(event: any) {
    if (event?.value) {
      this.chart.dataSource = this.generateData(event.value);
      this.chart.refresh();
    }
  }
}

