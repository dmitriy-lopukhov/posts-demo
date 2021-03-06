import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { defaultPage, defaultPageLimit } from '../constants';
import { Post, PostId } from '../types/post';

type PagingState = {
  page: number;
  limit: number;
};

const initialPagingState: PagingState = {
  page: defaultPage,
  limit: defaultPageLimit,
};

@Injectable({
  providedIn: 'root',
})
export class PostsService implements OnDestroy {
  private destroy$ = new Subject();
  private posts = new BehaviorSubject<Post[]>([]);
  public readonly posts$ = this.posts.asObservable();

  private paging = new BehaviorSubject<PagingState>(initialPagingState);
  public readonly postsByPage$ = combineLatest([this.posts$, this.paging]).pipe(
    map(([posts, paging]) => posts.slice(0, paging.page * paging.limit))
  );
  public readonly isEnd$ = combineLatest([
    this.posts$.pipe(map((posts) => posts.length)),
    this.postsByPage$.pipe(map((posts) => posts.length)),
  ]).pipe(map(([total, current]) => total === current));

  private loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loading.asObservable();

  constructor(private httpClient: HttpClient) {}

  setState(posts: Post[]): void {
    this.posts.next(posts);
  }

  getPosts(): void {
    this.loading.next(true);
    this.httpClient
      .get<Post[]>(`${environment.apiUrl}/posts`)
      .pipe(
        finalize(() => this.loading.next(false)),
        takeUntil(this.destroy$)
      )
      .subscribe((posts) => this.setState(posts));
  }

  deletePost(id: PostId): void {
    const oldState = this.posts.getValue();
    const items = [...oldState].filter((i) => i.id !== id);
    this.setState(items);
    this.httpClient
      .delete<void>(`${environment.apiUrl}/posts/${id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {},
        () => {
          console.log('something went wrong');
          this.setState(oldState);
        }
      );
  }

  getPost(id: PostId): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${environment.apiUrl}/posts/${id}`);
  }

  addPage(): void {
    const oldState = this.paging.getValue();
    this.paging.next({
      ...oldState,
      page: oldState.page + 1,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
