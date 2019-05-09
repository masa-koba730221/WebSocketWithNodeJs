import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { WebsocketService } from './service/websocket.service';
import { UsersService } from './service/users.service';
import { DevicesService } from './service/devices.service';
import { TopPageComponent } from './top-page/top-page.component';
import { NextPageComponent } from './next-page/next-page.component';
import { ModalComponent } from './modal/modal.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TopPageComponent,
    NextPageComponent,
    ModalComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
  //  { provide: WebsocketService, useFactory: () => new WebsocketService(), deps: [] },
    UsersService,
    DevicesService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent,
  ]
})
export class AppModule { }
