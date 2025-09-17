import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './com/project/login/auth/auth.component';
import {GrumatoViewComponent} from './com/project/components/grumato-view/grumato-view.component';
import {UsersComponent} from './com/project/components/users/users.component';
import {OrdersComponent} from './com/project/components/orders/orders.component';
import {CustomersComponent} from './com/project/components/customers/customers.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: AuthComponent},
  {
    path: 'view',
    component: GrumatoViewComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'customers', component: CustomersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
