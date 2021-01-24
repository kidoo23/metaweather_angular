import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Location } from '../models';
import { ApiService } from './api.service';
import { LocationService } from './location.service';

describe('도시 조회 서비스(LocationService)', () => {
  let service: LocationService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        LocationService,
      ],
    });

    service = TestBed.inject(LocationService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it(
    '검색된 도시 정보 조회됨',
    waitForAsync(() => {
      const latitude = 37.557122;
      const longitude = 126.977379;
      const actuallyData = {
        title: 'Seoul',
        location_type: 'City',
        woeid: '11325',
        latt_long: `${latitude},${longitude}`,
      };
      const expectData = [
        {
          title: actuallyData.title,
          locationType: actuallyData.location_type,
          woeid: Number(actuallyData.woeid),
          latitude,
          longitude,
        } as Location,
      ];

      apiService.get.and.returnValue(of([actuallyData]));

      service.searchLocation('seoul').subscribe((location) => {
        expect(location.title).toBe(expectData[0].title, '조회한 도시명');
        expect(location.latitude).toBe(latitude, '변환된 위도');
        expect(location.longitude).toBe(longitude, '변환된 경도');

        service.getCurrentLocation().subscribe((current) => {
          expect(location).toEqual(current, '검색된 지역가 현재 지역');
        });
      });
    })
  );

  it(
    '검색된 도시가 없음',
    waitForAsync(() => {
      apiService.get.and.returnValue(of([]));
      service.searchLocation('xxx').subscribe((location) => {
        expect(Object.keys(location).length).toBe(0);

        service.getCurrentLocation().subscribe((current) => {
          expect(current).toBeNull('현재 도시는 없음.');
        });
      });
    })
  );
});
