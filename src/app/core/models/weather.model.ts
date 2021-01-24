export enum WeatherCondition {
  snow,
  sleet,
  hail,
  thunderstorm,
  heavyRain,
  lightRain,
  showers,
  heavyCloud,
  lightCloud,
  clear,
  unknown,
}

export interface Weather {
  id: number;
  formattedCondition: string;
  condition: WeatherCondition;
  minTemp: string;
  maxTemp: string;
  temp: string;
  locationId: number;
  created: string;
  lastUpdated: Date;
  location: string;
}
