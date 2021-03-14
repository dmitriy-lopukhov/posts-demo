import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommentsService } from '../core/services/comments.service';
import { PostsService } from '../core/services/posts.service';
import { Post, PostId } from '../core/types/post';
import { trackingFn } from '../core/utils';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  posts$: Observable<Post[]> | null = null;
  isEnd = false;
  trackingFn = trackingFn;

  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.posts$ = this.postsService.postsByPage$;
    this.postsService.isEnd$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isEnd) => (this.isEnd = isEnd));
    this.postsService.getPosts();
  }

  onDeletePost(id: PostId): void {
    this.postsService.deletePost(id);
  }

  onLoadComments(id: PostId): void {
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
