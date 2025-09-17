import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { RouterModule } from '@angular/router'; // добавьте импорт

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbButtonModule,
  NbCalendarModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogModule,
  NbInputModule,
  NbLayoutModule,
  NbRouteTabsetModule, NbSelectModule,
  NbSpinnerModule,
  NbThemeModule,
  NbToastrModule,
  NbToastrService,
  NbTreeGridModule,
  NbUserModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthComponent} from './com/project/login/auth/auth.component';
import {HttpService} from './com/project/services/http.service';
import {INITIAL_STATE, Store, StoreModule} from '@ngrx/store';
import {appReducers} from './com/project/store/app-reducers';
import {LoginSignUpWindowComponent} from './com/project/login/auth/login-sign-up-window/login-sign-up-window.component';
import {EffectsModule} from '@ngrx/effects';
import {LoginPageEffect} from './com/project/store/login-store/login-page.effect';
import {GrumatoViewComponent} from './com/project/components/grumato-view/grumato-view.component';
import {CustomersComponent} from './com/project/components/customers/customers.component';
import {OrdersComponent} from './com/project/components/orders/orders.component';
import {UsersComponent} from './com/project/components/users/users.component';
import {CreateOrderComponent} from './com/project/components/add-data-modal-window/create-order/create-order.component';
import {DataEffect} from './com/project/components/components-store/effets/data.effetc';
import {UserCardsWindowComponent} from './com/project/components/modals/user-cards-window/user-cards-window.component';
import {CreateCustomerComponent} from './com/project/components/add-data-modal-window/create-customer/create-customer.component';
import {CreateUserComponent} from './com/project/components/add-data-modal-window/create-user/create-user.component';
import {AppGrumatoState, getInitialState} from "./com/project/store/app-grumato.state";
import {GetAllDataLoad} from "./com/project/components/components-store/components.action";
import {UserHelperService} from "./com/project/services/user.helper.service";
import { GenerateReportViewComponent } from './com/project/components/modals/generate-report-view/generate-report-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginSignUpWindowComponent,
    GrumatoViewComponent,
    CustomersComponent,
    OrdersComponent,
    UsersComponent,
    CreateCustomerComponent,
    CreateOrderComponent,
    CreateUserComponent,
    UserCardsWindowComponent,
    GenerateReportViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule, // добавьте сюда, чтобы директивы роутера были видны в шаблонах
    NoopAnimationsModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbRouteTabsetModule,
    NbSpinnerModule,
    NbCalendarModule,
    NbInputModule,
    NbButtonModule,
    NbTreeGridModule,
    NbUserModule,
    NbDialogModule.forChild(),
    NbDatepickerModule.forRoot(),
    NbThemeModule.forRoot({name: 'default'}),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([LoginPageEffect, DataEffect]),
    NbSelectModule,
    NbToastrModule.forRoot()
  ],
  providers: [HttpService, NbToastrService, UserHelperService,
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<AppGrumatoState>) => {
        return () => {
          store.dispatch(new GetAllDataLoad());
        };
      },
      multi: true,
      deps: [Store]
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
