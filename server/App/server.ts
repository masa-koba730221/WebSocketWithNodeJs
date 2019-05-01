
import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as Mongoose from 'mongoose';
import * as WebSocket from 'websocket';
import * as http from 'http';
import { UserRoutes } from './routes/userRoutes';
import { iAcceptor } from './routes/iAcceptor';

export class Main {
  private app: Express.Application;
  private port = 3000;
  private userRoutes: UserRoutes;

  constructor() {
    this.app = Express();
    this.init();
    this.userRoutes = new UserRoutes(this.app);
    this.initMongoose();

    const server = http.createServer(this.app);
    this.initWebSocket(server);
    server.listen(this.port, '0.0.0.0', () => {
      console.log('http server listen to port:' + this.port);
    });
  }

  init() {
    this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.json()); // parse application/json
    this.app.use(Express.static('./public'));

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
      next();
    });

    // Optionsも必要
    this.app.options('*', (req, res) => {
      res.sendStatus(200);
    });
  }

  initWebSocket(server: http.Server) {
    const wss = new WebSocket.server({
      httpServer: server,
      autoAcceptConnections: false,
      keepaliveInterval: 120000,
    });

    wss.on('request', (request: WebSocket.request) => {
      console.log(`resourceUrl: ${JSON.stringify(request.resourceURL)}`);
      console.log(`origin: ${request.origin}`);
      this.routeMap(request, '/users', this.userRoutes);
    });

    wss.on('close', (request: WebSocket.connection) => {

    });
  }

  initMongoose() {
    Mongoose.connect('mongodb://mongodb:27017/user', { useNewUrlParser: true }, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('mongodb: connection success!');
      }
    });
  }

  private routeMap(request: WebSocket.request, path: string, acceptor: iAcceptor) {
    console.log('routeMap: ' + request.resourceURL.path + ' path: ' + path);
    if ((request.resourceURL.path as string) === path) {
      const connection = request.accept();
      acceptor.acceptor(connection);
    }
  }
}

new Main();
