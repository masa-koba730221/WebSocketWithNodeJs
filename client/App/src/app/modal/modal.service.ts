import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subject } from 'rxjs';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public vcr: ViewContainerRef;
  private currentComponent = null;
  private id: string;

  private contentSource: Subject<boolean> = new Subject<boolean>();
  public content$ = this.contentSource.asObservable();

  constructor(private resolver: ComponentFactoryResolver) { }

  open(data: any, id: string): void {
    if (!data) {
      return;
    }

    console.log('Modal Service open');

    const factory = this.resolver.resolveComponentFactory(data);
    const component = this.vcr.createComponent(factory);

    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
    this.contentSource.next(true);
    this.id = id;
    $(id).modal('show');
  }

  close(): void {
    if (this.currentComponent) {
      $(this.id).modal('hide');
      this.currentComponent.destroy();
    }
  }}
