import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AppGrumatoState } from '../../../store/app-grumato.state';
import { HttpService } from '../../../services/http.service';
import {
  DeleteCustomer,
  DeleteOrder,
  DeleteUser,
  EEditorActions,
  GetAllDataLoad,
  GetAllDataLoaded,
  GetCustomers,
  GetOrders,
  GetUsers,
  SaveCustomers,
  SaveOrders,
  SaveUsers
} from '../components.action';
import { DataState } from '../../components-state/data.state';
import { BaseResponse } from '../../users/users.component';
import { OrdersBaseResponse } from '../../orders/orders.component';
import { CustomersBaseResponse } from '../../customers/customers.component';

@Injectable()
export class DataEffect {

  constructor(
    private actions$: Actions,
    private store: Store<AppGrumatoState>,
    private router: Router,
    private httpService: HttpService
  ) {}

  // вместо @Effect({dispatch:false})
  getCustomer$ = createEffect(
    () => this.actions$.pipe(
      ofType<GetCustomers>(EEditorActions.GetCustomers),
      tap(() => this.httpService.getCustomers())
    ),
    { dispatch: false }
  );

  addCustomer$ = createEffect(
    () => this.actions$.pipe(
      ofType<SaveCustomers>(EEditorActions.SaveCustomers),
      switchMap(action => this.httpService.postCustomer(action.payload)),
      tap(value => {
        if ((value as CustomersBaseResponse).status === '200') {
          this.store.dispatch(new GetAllDataLoad());
        }
      })
    ),
    { dispatch: false }
  );

  getOrders$ = createEffect(
    () => this.actions$.pipe(
      ofType<GetOrders>(EEditorActions.GetOrders),
      tap(() => this.httpService.getOrders())
    ),
    { dispatch: false }
  );

  addOrders$ = createEffect(
    () => this.actions$.pipe(
      ofType<SaveOrders>(EEditorActions.SaveOrders),
      switchMap(action => this.httpService.postOrders(action.payload)),
      tap(value => {
        if ((value as OrdersBaseResponse).status === '200') {
          this.store.dispatch(new GetAllDataLoad());
        }
      })
    ),
    { dispatch: false }
  );

  getUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType<GetUsers>(EEditorActions.GetUsers),
      tap(() => this.httpService.getUsers())
    ),
    { dispatch: false }
  );

  addUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType<SaveUsers>(EEditorActions.SaveUsers),
      switchMap(action => this.httpService.postUsers(action.payload)),
      tap((value) => {
        if ((value as BaseResponse).status === '200') {
          this.store.dispatch(new GetAllDataLoad());
        }
      })
    ),
    { dispatch: false }
  );

  getAllData$ = createEffect(
    () => this.actions$.pipe(
      ofType<GetAllDataLoad>(EEditorActions.GetAllDataLoad),
      switchMap(() => this.httpService.getAllData()),
      tap((response) => {
        const data = JSON.parse((response as BaseResponse).status);
        const result: DataState = {
          data: {
            users: data.employees,
            orders: data.orders,
            customers: data.customer
          }
        };
        if (result) {
          this.store.dispatch(new GetAllDataLoaded(result));
        }
      })
    ),
    { dispatch: false }
  );

  deleteUser$ = createEffect(
    () => this.actions$.pipe(
      ofType<DeleteUser>(EEditorActions.DeleteUser),
      switchMap(action => this.httpService.deleteUser(action.payload)),
      tap(() => this.store.dispatch(new GetAllDataLoad()))
    ),
    { dispatch: false }
  );

  deleteOrder$ = createEffect(
    () => this.actions$.pipe(
      ofType<DeleteOrder>(EEditorActions.DeleteOrder),
      switchMap(action => this.httpService.deleteOrder(action.payload)),
      tap(() => this.store.dispatch(new GetAllDataLoad()))
    ),
    { dispatch: false }
  );

  deleteCustomer$ = createEffect(
    () => this.actions$.pipe(
      ofType<DeleteCustomer>(EEditorActions.DeleteCustomer),
      switchMap(action => this.httpService.deleteCustomer(action.payload)),
      tap(() => this.store.dispatch(new GetAllDataLoad()))
    ),
    { dispatch: false }
  );
}
