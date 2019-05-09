import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';

declare var $;

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public static id = '#icesword';

  constructor(
    private modal: ModalService,
  ) {
    console.log('Confirm Dialog Constructor');
  }

  ngOnInit() {
    $('icesword').modal();
  }

}
