import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ChartComponent, StripLineSettingsModel} from "@syncfusion/ej2-angular-charts";
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'plancks-chart',
  templateUrl: './plancks-chart.component.html',
  styleUrls: ['./plancks-chart.component.less']
})
export class PlancksChartComponent implements OnInit, AfterViewChecked {
  @ViewChild("chart") chart?: ChartComponent;

  dashLoaded = false;

  chartData: { x: number, y: number }[] = [];

  primaryXAxis = {
    title: 'Wavelength (nm)',
    valueType: 'Double',
    minimum: 0,
    maximum: 1010,
    interval: 100,
    stripLines: this.getWavelengthStripLines()
  };

  primaryYAxis = {
    title: 'Spectral Radiance (W*sr^-1*m^-3)',
    valueType: 'Double',
    minimum: 0
  };

  minTemp = 200;
  maxTemp = 40200;
  temp = 20200;

  calcByWavelength = true;
  perceivedColor = 'rgba(0, 0, 0, 0)';

  constructor() { }

  ngOnInit(): void {
    this.generateData();
  }

  ngAfterViewChecked(): void {
    this.dashLoaded = true;
  }

  axisLabelRender(args: any) {
    if (args?.axis?.propName == "primaryYAxis") {
      args.text = args.value.toExponential(2);
    }
  }

  changePlancksLawBy(event: any) {
    this.calcByWavelength = coerceBooleanProperty(event?.value);

    if (this.chart) {
      if (this.calcByWavelength) {
        this.chart.primaryXAxis.maximum = 1011;
        this.chart.primaryXAxis.interval = 100;
        this.chart.primaryYAxis.title = "Spectral Radiance (W*sr^-1*m^-3)";
        this.chart.primaryXAxis.title = "Wavelength (nm)";
        this.chart.primaryXAxis.stripLines = this.getWavelengthStripLines();
      } else {
        const max = Math.round(this.temp / 5);
        const divisor = max > 100 ? 100 : max > 1000 ? 1000 : 10;
        const multiplier = max > 100 ? 10 : max > 1000 ? 100 : 1;
        this.chart.primaryXAxis.maximum = max;
        this.chart.primaryXAxis.interval = Math.round(max / divisor) * multiplier;
        this.chart.primaryYAxis.title = "Spectral Radiance (J*s^-1*m^-2*sr^-1*Hz^-1)";
        this.chart.primaryXAxis.title = "Frequency (THz)";
        this.chart.primaryXAxis.stripLines = this.getFrequencyStripLines();
      }
    }

    this.generateData();
  }

  changeTemp(event: any) {
    if (event?.value) {
      this.generateData(event.value);
      if (!this.calcByWavelength) {
        setTimeout(() => {
          const max = Math.round(this.temp / 5);
          const divisor = max > 100 ? 100 : max > 1000 ? 1000 : 10;
          const multiplier = max > 100 ? 10 : max > 1000 ? 100 : 1;
          this.chart!.primaryXAxis.maximum = max;
          this.chart!.primaryXAxis.interval = Math.round(max / divisor) * multiplier;
        });
      }
    }
  }

  private generateData(temp?: number) {
    if (this.calcByWavelength) {
      this.generateWavelengthData(temp ?? this.temp);
    } else {
      this.generateFrequencyData(temp ?? this.temp);
    }
    this.generatePerceivedColor(temp ?? this.temp);
  }

  private generateWavelengthData(temp: number) {
    const chartData = [];
    for (let i = 1; i <= 1021; i += 10) {
      const w = i * Math.pow(10, -9);
      chartData.push({x: i, y: this.wavelengthFormula(temp, w)});
    }
    this.chartData = chartData;
  }

  private generateFrequencyData(temp: number) {
    const chartData = [];
    for (let i = 1; i <= 8021; i += 10) {
      const f = i * Math.pow(10, 12);
      chartData.push({x: i, y: this.frequencyFormula(temp, f)});
    }
    this.chartData = chartData;
  }

  private wavelengthFormula(t: number, w: number): number {
    return ((2 * Const.h * Math.pow(Const.c, 2)) / Math.pow(w, 5)) * (1 / (Math.pow(Const.e, ((Const.h*Const.c)/(w*Const.kb*t))) -1));
  }

  private frequencyFormula(t: number, f: number): number {
    return ((2 * Const.h * Math.pow(f, 3)) / Math.pow(Const.c, 2)) * (1 / (Math.pow(Const.e, ((Const.h*f)/(Const.kb*t))) -1));
  }

  private generatePerceivedColor(temp: number) {
    if (temp <= 700) {
      this.perceivedColor = "rgb(0, 0, 0)";
      return;
    }

    temp = this.clamp(temp, this.minTemp, this.maxTemp) / 100;

    const r = temp <= 66 ? 255 : this.clamp(329.698727446 * (Math.pow(temp - 60, -0.1332047592)), 0, 255);

    const g = temp <= 66 ?
      this.clamp(99.4708025861 * Math.log(temp) - 161.1195681661, 0, 255) :
      this.clamp(288.1221695283 * (Math.pow(temp - 60, -0.0755148492)), 0, 255);

    const b = temp >= 66 ? 255 : temp <= 19 ? 0 : this.clamp(138.5177312231 * Math.log(temp - 10) - 305.0447927307, 0, 255);

    this.perceivedColor = `rgb(${r}, ${g}, ${b})`;
  }

  private clamp(num: number, min: number, max: number): number {
    return num < min ? min : num > max ? max : num;
  }

  private getWavelengthStripLines(): StripLineSettingsModel[] {
    const red: StripLineSettingsModel = { start: 625, end: 740, color: 'red', visible: true, zIndex: 'Behind' };
    const orange: StripLineSettingsModel = { start: 590, end: 625, color: 'orange', visible: true, zIndex: 'Behind' };
    const yellow: StripLineSettingsModel = { start: 565, end: 590, color: 'yellow', visible: true, zIndex: 'Behind' };
    const green: StripLineSettingsModel = { start: 520, end: 565, color: 'green', visible: true, zIndex: 'Behind' };
    const cyan: StripLineSettingsModel = { start: 500, end: 520, color: 'cyan', visible: true, zIndex: 'Behind' };
    const blue: StripLineSettingsModel = { start: 435, end: 500, color: 'blue', visible: true, zIndex: 'Behind' };
    const violet: StripLineSettingsModel = { start: 380, end: 435, color: 'purple', visible: true, zIndex: 'Behind' };

    return [red, orange, yellow, green, cyan, blue, violet];
  }

  private getFrequencyStripLines(): StripLineSettingsModel[] {
    const red: StripLineSettingsModel = { end: 480, start: 405, color: 'red', visible: true, zIndex: 'Behind' };
    const orange: StripLineSettingsModel = { end: 508, start: 480, color: 'orange', visible: true, zIndex: 'Behind' };
    const yellow: StripLineSettingsModel = { end: 531, start: 508, color: 'yellow', visible: true, zIndex: 'Behind' };
    const green: StripLineSettingsModel = { end: 577, start: 531, color: 'green', visible: true, zIndex: 'Behind' };
    const cyan: StripLineSettingsModel = { end: 600, start: 577, color: 'cyan', visible: true, zIndex: 'Behind' };
    const blue: StripLineSettingsModel = { end: 689, start: 600, color: 'blue', visible: true, zIndex: 'Behind' };
    const violet: StripLineSettingsModel = { end: 789, start: 689, color: 'purple', visible: true, zIndex: 'Behind' };

    return [red, orange, yellow, green, cyan, blue, violet];
  }
}

enum Const {
   kb = 1.3806488 * Math.pow(10, -23),
   h = 6.62606957 * Math.pow(10, -34),
   c = 299792458,
   e = 2.71828182845904523536
}
