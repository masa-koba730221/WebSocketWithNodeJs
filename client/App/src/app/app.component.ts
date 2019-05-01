import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class User {
  name: string;
  password: string;

  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  wss: WebSocket;

  constructor(
    private http: HttpClient,
  ) {

    http.get<string>('http://localhost:3000/user')
    .subscribe(x => {
      console.log('message: ' + x);
    },
    err => {
      console.error(err);
    });

    this.wss = new WebSocket('ws://localhost:3000/users');
    this.wss.onopen = (ev) => {
      console.log('ws:open :' + JSON.stringify(ev));
    };
    this.wss.onclose = (ev) => {
      console.log('ws:closed : ' + JSON.stringify(ev));
    };
    this.wss.onmessage = (mes: MessageEvent) => {
      console.log('ws:message :' + mes.data);
      if (mes && mes.data) {
        const users = JSON.parse(mes.data);
        users.forEach(user => {
          console.log(`ws: name: ${user.name} pass: ${user.password}`);
        });
      }
    };
  }

  clicked() {
    const list = Array<User>();
    list.push(new User('mkoba3', 'pass3'));
    this.http.post<User[]>('http://localhost:3000/user', list, this.httpOptions)
    .subscribe(
      mes => {
        if (mes) {
          (mes as User[]).forEach(user => {
            console.log(`http res name: ${user.name} pass: ${user.password}`);
          });
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  disconnected() {
    if (this.wss.readyState === WebSocket.OPEN) {
      this.wss.close();
    }
  }
}

