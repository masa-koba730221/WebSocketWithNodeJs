import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from 'rxjs';

export class WebsocketService {

  private subject: Subject<MessageEvent>;
  private ws: WebSocket;

  constructor() {
    console.log(`WebSocketService Constructor()`);
  }

  protected _connect(url: string): Subject<MessageEvent> {
    if (!this.subject
      || !this.ws
      || (this.ws && this.ws.readyState !== WebSocket.OPEN)
    ) {
      console.log(`Create WebSocket(${url})`);
      this.subject = this.create(url);
    }
    return this.subject;
  }

  private create(url: string): Subject<MessageEvent> {
    this.ws = new WebSocket(url);

    const observable = Observable.create((obs: Observer<MessageEvent>) => {
      this.ws.onmessage = obs.next.bind(obs);
      this.ws.onerror = obs.error.bind(obs);
      this.ws.onclose = obs.complete.bind(obs);
      this.ws.onopen = obs.next.bind(obs);

      return this.ws.close.bind(this.ws);
    });

    const observer = {
      next: (data: object) => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      },
    };
    return Subject.create(observer, observable);
  }
}
