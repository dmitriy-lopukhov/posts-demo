import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
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
  isEnd = false;
  trackingFn = trackingFn;

  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {
    this.posts$ = this.postsService.postsByPage$.pipe(
      tap((data) => console.log(data))
    );
    this.postsService.isEnd$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isEnd) => (this.isEnd = isEnd));
    this.postsService.getPosts();
  }

  onDeletePost(id: number): void {
    this.postsService.deletePost(id);
  }

  onLoadComments(id: number): void {
    this.commentsService.getComments(id);
  }

  onScroll(): void {
    if (this.isEnd) {
      return;
    }
    this.postsService.addPage();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
