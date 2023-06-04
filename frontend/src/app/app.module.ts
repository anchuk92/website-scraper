import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ErrorInterseptorService } from "./core/error-Interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterseptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
