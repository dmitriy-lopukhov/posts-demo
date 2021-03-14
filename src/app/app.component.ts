import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClicksService } from './core/services/clicks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'post-feed';
  count$: Observable<number> | null = null;

  constructor(public clicksService: ClicksService) {}

  ngOnInit(): void {
    this.count$ = this.clicksService.clicks$;
  }
}
