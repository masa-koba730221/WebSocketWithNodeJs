
import * as Express from 'express';
import * as WebSocket from 'websocket';
import { iAcceptor } from './iAcceptor';

export class User {
  public name: string;
  public password: string;

  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }
}

export class UserRoutes implements iAcceptor {
  private clients = Array<WebSocket.connection>();
  private users: User[] = [
    new User('mkoba1', 'pass1'),
    new User('mkoba2', 'pass2'),
  ];

  constructor(app: Express.Application) {
    app.route('/user')
      .get((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        console.log('http: get');
        res.send(JSON.stringify('message'));
        next();
      })
      .post((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        console.log(`data: ${JSON.stringify(req.body)}`);
        (req.body as User[]).forEach(user => {
          this.users.push(new User(user.name, user.password));
        });
        this.broadcast();
        res.send(JSON.stringify(this.users));
        next();
      })
      .put((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        next();

      })
      .delete((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        next();

      });
  }

  public acceptor(connect: WebSocket.connection) {
    this.clients.push(connect);
    console.log((new Date()) + ' Connection accepted.');
    connect.send(JSON.stringify(this.users));
    connect.on('message', (data: WebSocket.IMessage) => {
      if (data.type === 'utf8') {
        console.log(`message: ${data.utf8Data}`);
        connect.send(`${data.utf8Data}`);
      } else if (data.type === 'binary') {
        this.close(connect, WebSocket.connection.CLOSE_REASON_INVALID_DATA, 'Binary Type');
      } else {
        this.close(connect, WebSocket.connection.CLOSE_REASON_INVALID_DATA, 'Unknown Type');
      }
    });
    connect.on('close', (code: number, desc: string) => {
      console.log((new Date()) + ' Peer ' + connect.remoteAddress + ' disconnected.');
      this.close(connect, WebSocket.connection.CLOSE_REASON_NORMAL, 'Normal Close');
    });

    connect.on('error', (err: Error) => {
      console.log(`error: ${JSON.stringify(err)}`);
      this.close(connect, WebSocket.connection.CLOSE_REASON_ABNORMAL, `error: ${err.message}`);
    });
  }

  private close(connect: WebSocket.connection, code: number, desc: string) {
    console.log(`reason: ${code} desc: ${desc}`);
    connect.closeReasonCode = code;
    connect.closeDescription = desc;
    connect.close();

    const beforeCount = this.clients.length;
    this.clients = this.clients.filter(x => x !== connect);
    console.log(`clients count ${beforeCount} to ${this.clients.length}`);
  }

  private broadcast() {
    this.clients.forEach(client => {
      client.send(JSON.stringify(this.users));
    });
  }
}
