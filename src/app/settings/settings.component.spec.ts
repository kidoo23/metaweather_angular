import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  TemperatureService,
  TemperatureUnits,
} from '../core/services/temperature.service';
import { SettingsComponent } from './settings.component';

class TestTemperatureService extends TemperatureService {
  // TODO 최초 값 변경 하면서 테스트 할 수 있는 방법 생각해 보기...
  protected init(): TemperatureUnits {
    return TemperatureUnits.celsius;
  }
}

describe('설정 화면', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      providers: [
        {
          provide: TemperatureService,
          useClass: TestTemperatureService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('최초 선택은 섭씨(celsius)', () => {
    const firstUnit = fixture.debugElement.query(By.css('[name=unit]:checked'));
    console.log(firstUnit.nativeElement);
    expect(TemperatureUnits[TemperatureUnits.celsius]).toBe(
      firstUnit.nativeElement.value
    );
  });
});
