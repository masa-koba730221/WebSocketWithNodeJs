import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';

export class WebsocketService {

  private subject: Subject<MessageEvent>;

  constructor() {
    console.log(`WebSocketService Constructor()`);
  }

  _connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      console.log(`Create WebSocket(${url})`);
      this.subject = this.create(url);
    }
    return this.subject;
  }

  private create(url: string): Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      ws.onopen = obs.next.bind(obs);

      return ws.close.bind(ws);
    });

    const observer = {
      next: (data: object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };
    return Subject.create(observer, observable);
  }
}
