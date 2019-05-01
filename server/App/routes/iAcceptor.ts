import * as WebSocket from 'websocket';

export interface iAcceptor {
  acceptor(connect: WebSocket.connection): void;
}
