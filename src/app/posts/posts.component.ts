import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { PostsService } from '../core/services/posts.service';
import { Post } from '../core/types/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnDestroy {
  destroy$ = new Subject();
  posts$: Observable<Post[]>;

  constructor(
    private postsService: PostsService,
    private cdf: ChangeDetectorRef
  ) {
    this.posts$ = this.postsService.posts$;
    this.postsService.getPosts();
  }

  onDeletePost(id: number): void {
    this.postsService.deletePost(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
