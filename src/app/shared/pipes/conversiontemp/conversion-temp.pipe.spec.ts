import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TemperatureUnits } from '../../../core/services/temperature.service';
import { ConversionTempPipe } from './conversion-temp.pipe';

@Component({
  template: `<div id="unitTest">{{ temp | conversionTemp: unit }}</div>`,
})
class MockComponent {
  temp = 20;
  unit = TemperatureUnits.fahrenheit;
}

describe('ConversionTempPipe', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockComponent, ConversionTempPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('섭씨 적용', () => {
    const unitContainer = fixture.debugElement.query(By.css('#unitTest'));
    // 섭씨 > 화씨
    // 10 > 50
    // 20 > 68
    // 10.99 > 51.782(52)
    // '°C' : '°F'
    expect('68°F').toBe(unitContainer.nativeElement.innerText);
  });
});
