import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherCondition } from '../models';
import { ApiService } from './api.service';
import { WeatherService } from './weather.service';

describe('도시 날씨 정보 조회 서비스(WeatherService)', () => {
  let service: WeatherService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        WeatherService,
      ],
    });
    service = TestBed.inject(WeatherService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it(
    '해당 도시 날씨 정보',
    waitForAsync(() => {
      apiService.get.and.returnValue(of(getMockData()));

      const locationId = 1132599;
      service.getWeather(locationId).subscribe((weather) => {
        expect(locationId).toBe(weather.locationId);
        expect(weather.condition).toBe(WeatherCondition.clear);
      });
    })
  );
});

const getMockData = () => {
  return JSON.parse(
    `{"consolidated_weather":[{"id":5967800922275840,"weather_state_name":"Clear","weather_state_abbr":"c","wind_direction_compass":"WNW","created":"2021-01-16T09:30:38.077081Z","applicable_date":"2021-01-16","min_temp":-8.11,"max_temp":-1.465,"the_temp":-2.4549999999999996,"wind_speed":5.2968422894032186,"wind_direction":292.83272289145475,"air_pressure":1026.0,"humidity":63,"visibility":14.417054402290622,"predictability":68},{"id":5000316589178880,"weather_state_name":"Light Rain","weather_state_abbr":"lr","wind_direction_compass":"WNW","created":"2021-01-16T09:30:41.090445Z","applicable_date":"2021-01-17","min_temp":-9.68,"max_temp":-2.455,"the_temp":-2.88,"wind_speed":3.854550341867494,"wind_direction":291.8427392298386,"air_pressure":1028.0,"humidity":54,"visibility":13.991725821204167,"predictability":75},{"id":4966552978849792,"weather_state_name":"Hail","weather_state_abbr":"h","wind_direction_compass":"WNW","created":"2021-01-16T09:30:44.880321Z","applicable_date":"2021-01-18","min_temp":-11.235,"max_temp":0.8,"the_temp":0.9199999999999999,"wind_speed":8.398454967777512,"wind_direction":295.811185558835,"air_pressure":1016.5,"humidity":65,"visibility":12.939744392746361,"predictability":82},{"id":5904968553857024,"weather_state_name":"Clear","weather_state_abbr":"c","wind_direction_compass":"NE","created":"2021-01-16T09:30:47.077616Z","applicable_date":"2021-01-19","min_temp":-12.85,"max_temp":-3.82,"the_temp":-5.265,"wind_speed":2.2009887088416975,"wind_direction":51.99999999999999,"air_pressure":1033.5,"humidity":38,"visibility":14.385364471486518,"predictability":68},{"id":5634630158909440,"weather_state_name":"Clear","weather_state_abbr":"c","wind_direction_compass":"E","created":"2021-01-16T09:30:50.376037Z","applicable_date":"2021-01-20","min_temp":-8.01,"max_temp":2.35,"the_temp":1.7799999999999998,"wind_speed":2.573714131639227,"wind_direction":84.5580812480049,"air_pressure":1030.5,"humidity":42,"visibility":14.45744352978605,"predictability":68},{"id":5217807877799936,"weather_state_name":"Heavy Cloud","weather_state_abbr":"hc","wind_direction_compass":"NE","created":"2021-01-16T09:30:53.056189Z","applicable_date":"2021-01-21","min_temp":-4.25,"max_temp":4.17,"the_temp":1.93,"wind_speed":1.5038912749542672,"wind_direction":40.5,"air_pressure":1027.0,"humidity":68,"visibility":9.999726596675416,"predictability":71}],"time":"2021-01-16T18:58:58.894725+09:00","sun_rise":"2021-01-16T07:45:08.050675+09:00","sun_set":"2021-01-16T17:38:24.366663+09:00","timezone_name":"LMT","parent":{"title":"South Korea","location_type":"Country","woeid":23424868,"latt_long":"36.448151,127.850166"},"sources":[{"title":"BBC","slug":"bbc","url":"http://www.bbc.co.uk/weather/","crawl_rate":360},{"title":"Forecast.io","slug":"forecast-io","url":"http://forecast.io/","crawl_rate":480},{"title":"HAMweather","slug":"hamweather","url":"http://www.hamweather.com/","crawl_rate":360},{"title":"Met Office","slug":"met-office","url":"http://www.metoffice.gov.uk/","crawl_rate":180},{"title":"OpenWeatherMap","slug":"openweathermap","url":"http://openweathermap.org/","crawl_rate":360},{"title":"Weather Underground","slug":"wunderground","url":"https://www.wunderground.com/?apiref=fc30dc3cd224e19b","crawl_rate":720},{"title":"World Weather Online","slug":"world-weather-online","url":"http://www.worldweatheronline.com/","crawl_rate":360}],"title":"Seoul","location_type":"City","woeid":1132599,"latt_long":"37.557121,126.977379","timezone":"Asia/Seoul"}`
  );
};
