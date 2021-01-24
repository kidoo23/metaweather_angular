import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WeatherCondition } from 'src/app/core/models/weather.model';
import { WeatherIconDirective } from './weather-icon.directive';

@Component({
  template: `<div id="weatherIcon" [appWeatherIcon]="condition">999</div>`,
})
class MockComponent {
  condition: WeatherCondition = WeatherCondition.clear;
}

describe('WeatherIconDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockComponent, WeatherIconDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('날씨 아이콘 적용', () => {
    const iconBox = fixture.debugElement.query(By.css('#weatherIcon'));
    expect('w_clear').toBe(iconBox.nativeElement.className);
  });
});
