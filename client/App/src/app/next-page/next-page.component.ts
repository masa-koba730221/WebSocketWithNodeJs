import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../service/users.service';
import { DevicesService } from '../service/devices.service';
import { User } from '../models/User';
import { Device } from '../models/Device';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next-page',
  templateUrl: './next-page.component.html',
  styleUrls: ['./next-page.component.css']
})
export class NextPageComponent implements OnInit, OnDestroy {
  private devicelist: Device[];
  private subscription: Subscription;

  constructor(
    private devicesService: DevicesService,
    private router: Router
  ) {

    this.subscription = devicesService.connect().subscribe(
      devices => {
        if (devices) {
          this.devicelist = devices;
          devices.forEach(device => {
            console.log(`device name:${device.name} product:${device.product}`);
          });
        } else {
          console.log('connected to devices');
        }
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('device Service completed');
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async addDevicesClicked() {
    try {
      const count = this.devicelist.length;
      const list = Array<Device>();
      list.push(new Device(`HDD${count + 1}`, `Product${count + 1}`));
      const result = await this.devicesService.addDevices(list);
      if (result) {
        console.log('device add success');
      } else {
        console.log('device add failed');
      }
    } catch (err) {
      console.error(err);
    }
  }

  toTopPageClicked() {
    this.router.navigate(['/']);
  }
}
