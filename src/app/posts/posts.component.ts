import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommentsService } from '../core/services/comments.service';
import { PostsService } from '../core/services/posts.service';
import { Post } from '../core/types/post';
import { trackingFn } from '../core/utils';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnDestroy {
  destroy$ = new Subject();
  posts$: Observable<Post[]>;
  trackingFn = trackingFn;

  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {
    this.posts$ = this.postsService.posts$;
    this.postsService.getPosts();
  }

  onDeletePost(id: number): void {
    this.postsService.deletePost(id);
  }

  onLoadComments(id: number): void {
    this.commentsService.getComments(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
