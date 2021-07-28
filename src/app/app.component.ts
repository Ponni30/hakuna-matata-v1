import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EncrDecrService } from './services/encrdecr.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  constructor(private translate: TranslateService, private EncrDecr: EncrDecrService) {

    let language = localStorage.getItem('language')
    translate.setDefaultLang(language ? this.EncrDecr.get(language) : 'en');
  }
}