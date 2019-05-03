import { Component, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { UsersService } from './service/users.service';
import { DevicesService } from './service/devices.service';
import { User } from './models/User';
import { Device } from './models/Device';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';
  userlist: User[];
  devicelist: Device[];

  constructor(
    private usersService: UsersService,
    private devicesService: DevicesService,
  ) {
    usersService.connect().subscribe(
      users => {
        if (users) {
          this.userlist = users;
          users.forEach(user => {
            console.log(`user name:${user.Name} password:${user.Password}`);
          });
        } else {
          console.log('connected to users');
        }
      },
      err => {
        console.error(err);
      }
    );

    devicesService.connect().subscribe(
      devices => {
        if (devices) {
          this.devicelist = devices;
          devices.forEach(device => {
            console.log(`device name:${device.Name} product:${device.Product}`);
          });
        } else {
          console.log('connected to devices');
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  async addUsersClicked() {
    try {
      const count = this.userlist.length;
      const list = Array<User>();
      list.push(new User(`mkoba${count + 1}`, `pass${count + 1}`));
      const result = await this.usersService.addUsers(list);
      if (result) {
        console.log('user add success');
      } else {
        console.log('user add failed');
      }
    } catch (err) {
      console.error(err);
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
}

