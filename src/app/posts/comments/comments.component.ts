import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentsService } from 'src/app/core/services/comments.service';
import { Comment } from 'src/app/core/types/comment';
import { trackingFn } from 'src/app/core/utils';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
  @Input() id: number | null = null;
  comments$: Observable<Comment[] | null>;
  trackingFn = trackingFn;

  constructor(private commentsService: CommentsService) {
    this.comments$ = this.commentsService.comments$.pipe(
      map((state) => (this.id ? state[this.id] : []))
    );
  }

  delete(comment: Comment): void {
    this.commentsService.deleteComment(comment.postId, comment.id);
  }
}
