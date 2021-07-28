import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { constants } from 'src/app/common/constants';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  mobileQuery: MediaQueryList;

  fillerNav = [{item: 'User', link :  constants.ROUTE_URL.USERS}];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private userService: UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  
  logoutHandler() {
    localStorage.clear();
    this.userService.updateIsUserLogged.next(false);
    this.router.navigateByUrl(constants.ROUTE_URL.LOGIN);
  }
}