import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// adding bootstrap components
import {ModalModule} from 'ngx-bootstrap/modal';
import {AppComponent} from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // bootstrap
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}

