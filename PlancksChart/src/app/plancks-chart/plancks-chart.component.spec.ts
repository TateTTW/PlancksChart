import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlancksChartComponent } from './plancks-chart.component';

describe('PlancksChartComponent', () => {
  let component: PlancksChartComponent;
  let fixture: ComponentFixture<PlancksChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlancksChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlancksChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
