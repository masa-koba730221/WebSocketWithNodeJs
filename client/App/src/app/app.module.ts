import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { WebsocketService } from './service/websocket.service';
import { UsersService } from './service/users.service';
import { DevicesService } from './service/devices.service';

@NgModule({
  declarations: [
    AppComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
