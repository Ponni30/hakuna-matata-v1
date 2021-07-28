import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { constants } from '../../common/constants';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs-compat/Subscription';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  
  public isLoggedIn = false;
  private isUserLoggedSubscription: ISubscription;
  public userName : any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private userService: UserService,
    private router: Router,
    public toaster: NotificationService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.isLoggedIn = this.userService.isUserLogged;

    this.isUserLoggedSubscription = this.userService.updateIsUserLogged.subscribe((isUserLogged: boolean) => {
      this.isLoggedIn = isUserLogged;
    });

    this.isLoggedIn = this.userService.isUserLogged;

    this.userName = this.toaster.getLocalStorage('user');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  logoutHandler() {
    localStorage.clear();
    this.userService.updateIsUserLogged.next(false);
    this.router.navigateByUrl(constants.ROUTE_URL.LOGIN);
  }
}
