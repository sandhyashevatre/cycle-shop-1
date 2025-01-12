import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCyclesComponent } from './list-cycles/list-cycles.component';
import { BorrowComponent } from './borrow/borrow.component';
// import { ReturnComponent } from './return/return.component';
import { RestockComponent } from './restock/restock.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list-data', component: ListCyclesComponent },
  { path: 'borrow', component: BorrowComponent },
  // { path: 'cart', component: ReturnComponent },
  { path: 'restock', component: RestockComponent,  canActivate: [AdminGuard] },
  {path:'cart', component: CartComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
