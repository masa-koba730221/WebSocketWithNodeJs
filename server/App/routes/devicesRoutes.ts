
import * as Express from 'express';
import * as WebSocket from 'websocket';
import { iAcceptor } from './iAcceptor';

export class Device {
  public name: string;
  public product: string;

  constructor(name: string, product: string) {
    this.name = name;
    this.product = product;
  }
}

export class DevicesRoutes implements iAcceptor {
  private clients = Array<WebSocket.connection>();
  private devices: Device[] = [
    new Device('usb1', 'mkobaPro1'),
    new Device('hdd1', 'mkobaPro2'),
  ];

  constructor(app: Express.Application) {
    app.route('/api/devices')
      .get((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        console.log('http: get');
        res.send(JSON.stringify('message'));
        next();
      })
      .post((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        console.log(`data: ${JSON.stringify(req.body)}`);
        (req.body as Device[]).forEach(user => {
          this.devices.push(new Device(user.name, user.product));
        });
        this.broadcast();
        res.send(JSON.stringify(this.devices));
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
    connect.send(JSON.stringify(this.devices));
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
      client.send(JSON.stringify(this.devices));
    });
  }
}
