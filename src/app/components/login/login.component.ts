import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { constants } from 'src/app/common/constants';
import { AuthGaurd } from 'src/app/services/authguard.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toaster: NotificationService,
    private router: Router,
    private authGuard: AuthGaurd
  ) {
   }

  ngOnDestroy(): void {
    /* Unsubscribing the observables */

  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    if (this.authGuard.isUserLoggedIn()) {
      this.userService.updateIsUserLogged.next(true);
      this.router.navigateByUrl(constants.ROUTE_URL.USERS);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(constants.EMAIL_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(constants.PASSWORD_PATTERN)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return this.loginForm.controls;
    }

    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    const loginSubscription: Boolean = this.userService.authenticateUser(data)

    // Successfull validation
    if (loginSubscription) {
      this.toaster.notifySucess(constants.NOTIFY_MSG.LOGIN_SUCESS);
      this.router.navigateByUrl(constants.ROUTE_URL.USERS);
    } else {
      this.toaster.notifyError(constants.NOTIFY_MSG.LOGIN_FAIL);
    }

  }
}
