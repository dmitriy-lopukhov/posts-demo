import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ClicksService } from './core/services/clicks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'post-feed';
  count$: Observable<number>;

  constructor(private clicksService: ClicksService) {
    this.count$ = this.clicksService.clicks$;
  }
}
