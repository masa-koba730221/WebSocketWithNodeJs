import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Device } from '../models/Device';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevicesService extends WebsocketService {
  private deviceMes: Subject<Device[]>;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  connect(): Subject<Device[]> {
    return this.deviceMes = this._connect('ws://localhost:3000/ws/devices')
    .pipe(map((res: MessageEvent) => {
      if (res.data) {
        const devices = JSON.parse(res.data);
        const list = Array<Device>();
        devices.forEach((device: any) => {
          list.push(new Device(device.name, device.product));
        });
        return list;
      } else {
        return undefined;
      }
    })) as Subject<Device[]>;
  }

  addDevices(devices: Device[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<Device[]>('http://localhost:3000/api/devices', devices, this.httpOptions)
      .subscribe(
        mes => {
          if (mes) {
            (mes).forEach((device: any) => {
              console.log(`http res name: ${device.name} product: ${device.product}`);
            });
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (err: Error) => {
          console.error(err);
          reject(err);
        }
      );
    });
  }
}
