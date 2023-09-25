import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListCyclesComponent } from './list-cycles/list-cycles.component';
import { BorrowComponent } from './borrow/borrow.component';
// import { ReturnComponent } from './return/return.component';
import { RestockComponent } from './restock/restock.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CycleService } from './cycle.service';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { LogoutComponent } from './logout/logout.component';
import { RemoveFromCartComponent } from './remove-from-cart/remove-from-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCyclesComponent,
    BorrowComponent,
    // ReturnComponent,
    RestockComponent,
    LoginComponent,
    CartComponent,
    LogoutComponent,
    RemoveFromCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CycleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
