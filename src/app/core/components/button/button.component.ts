import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ClicksService } from '../../services/clicks.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input() label = '';
  @Input() btnClass: '' | 'round' | 'outlined' = '';
  @Output() clicked = new EventEmitter();

  constructor(private clicksService: ClicksService) {}

  ngOnInit(): void {}

  handleClick(): void {
    this.clicksService.addClick();
    this.clicked.next();
  }
}
