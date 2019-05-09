import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../service/users.service';
import { DevicesService } from '../service/devices.service';
import { User } from '../models/User';
import { Device } from '../models/Device';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal/modal.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})
export class TopPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private userList: User[];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private modal: ModalService,
  ) {
    this.subscription = usersService.connect().subscribe(
      users => {
        if (users) {
          this.userList = users;
          users.forEach(user => {
            console.log(`user name:${user.name} password:${user.password}`);
          });
        } else {
          console.log('connected to users');
        }
      },
      err => {
        console.error(err);
      },
      () => {
        console.log('userService completed');
      }
    );
  }

  async addUsersClicked() {
    try {
      const count = this.userList.length;
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

  toNextPageClicked() {
    this.router.navigate(['/next']);
  }

  popupClicked() {
    this.modal.open(ConfirmDialogComponent, ConfirmDialogComponent.id);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
