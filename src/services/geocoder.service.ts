import {Provider, inject} from '@loopback/core';
import {juggler, getService} from '@loopback/service-proxy';
import {GeocoderDataSource} from '../datasources';

export interface GeoPoint {
  y: number;
  x: number;
}

export interface GeocoderService {
  geocode(address: string): Promise<Array<GeoPoint>>;
}

export class GeocoderProviderService implements Provider<GeocoderService> {
  constructor(
    @inject('datasources.geocoder')
    protected dataSource: juggler.DataSource = new GeocoderDataSource(),
  ) {}

  value(): Promise<GeocoderService> {
    return getService(this.dataSource);
  }
}
