import {Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {IsAvailableUserName, LoginPageActions, LoginUser, SignUpUser} from './login-page.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {HttpService} from '../../services/http.service';

@Injectable()
export class LoginPageEffect {


  constructor(private actions$: Actions,
              private router: Router,
              private httpService: HttpService,
              private toasterService: NbToastrService) {
  }


  signUpUser$ = createEffect(
    () => this.actions$.pipe(
      ofType<SignUpUser>(LoginPageActions.SignUpUser),
      switchMap((action) => this.httpService.signUpUserData(action.payload)),
      tap((value) => {
        if ((value as { status: string, code: string }).status == 'success') {
          this.toasterService.success('Done', 'Creating');
        } else {
          this.toasterService.danger('Error', 'Creating');
        }
      })
    ),
    { dispatch: false }
  );

  signInUser$ = createEffect(
    () => this.actions$.pipe(
      ofType<LoginUser>(LoginPageActions.Login),
      switchMap((action) => this.httpService.signInUserData(action.payload)),
      tap((value) => {
        if ((value as { status: string, code: string }).status == 'true') {
          this.router.navigate(['/view']);
        } else {
          this.toasterService.danger('Error', 'Authorisation');
        }
      })
    ),
    { dispatch: false }
  );

  isAvailableUserName$ = createEffect(
    () => this.actions$.pipe(
      ofType<IsAvailableUserName>(LoginPageActions.IsAvailableUserName),
      switchMap((action) => this.httpService.isAvailableUserName(action.payload)),
      tap(value => console.log(value))
    ),
    { dispatch: false }
  );
}
