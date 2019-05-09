import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from './modal.service';
declare var $;

@Component({
  selector: 'app-modal',
  template: `
    <div #inner></div>
    `,
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit , AfterViewInit, OnDestroy {
  @ViewChild('inner', { read: ViewContainerRef }) vcr;
  private subscription: Subscription;
  public display = 'none';

  constructor(private modal: ModalService) { }

  ngAfterViewInit() {
    this.modal.vcr = this.vcr;
  }

  ngOnInit() {
    this.subscription = this.modal.content$.subscribe(
      value => {
        if (value) {
          console.log('dialog open');
          this.display = '';
//          this.open();
        } else {
          this.display = 'none';
          console.log('dialog none');
        }
      });
  }

  containerClick($event) {
    $event.stopPropagation();
  }

  close() {
    $('iceword').modal('hide');
    this.modal.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  open() {
    $('icesword').modal();
  }
}
