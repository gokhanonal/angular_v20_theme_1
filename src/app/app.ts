import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'tr']);
    this.translate.setDefaultLang('en');

    const browserLang = navigator.language.startsWith('tr') ? 'tr' : 'en';
    this.translate.use(browserLang);
  }
}
