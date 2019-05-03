import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends WebsocketService {
  private userMes: Subject<User[]>;

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

  connect(): Subject<User[]> {
    return this.userMes = this._connect('ws://localhost:3000/ws/users')
    .pipe(map((res: MessageEvent) => {
      if (res.data) {
        const users = JSON.parse(res.data);
        const list = Array<User>();
        users.forEach(user => {
          list.push(new User(user.name, user.password));
        });
        return list;
      } else {
        return undefined;
      }
    })) as Subject<User[]>;
  }

  addUsers(users: User[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<User[]>('http://localhost:3000/api/users', users, this.httpOptions)
      .subscribe(
        mes => {
          if (mes) {
            (mes).forEach((user: any) => {
              console.log(`http res name: ${user.name} pass: ${user.password}`);
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
