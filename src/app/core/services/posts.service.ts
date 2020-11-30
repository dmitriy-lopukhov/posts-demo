import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../types/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService implements OnDestroy {
  destroy$ = new Subject();
  private posts = new BehaviorSubject<Post[]>([]);
  public readonly posts$ = this.posts.asObservable();

  private loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loading.asObservable();

  constructor(private http: HttpClient) {}

  setState(posts: Post[]): void {
    this.posts.next(posts);
  }

  getPosts(): void {
    this.loading.next(true);
    this.http
      .get<Post[]>(`${environment.apiUrl}/posts`)
      .pipe(
        finalize(() => this.loading.next(false)),
        takeUntil(this.destroy$)
      )
      .subscribe((posts) => this.setState(posts));
  }

  deletePost(id: number): void {
    const oldState = this.posts.getValue();
    const items = [...oldState].filter((i) => i.id !== id);
    this.setState(items);
    this.http
      .delete<void>(`${environment.apiUrl}/posts/${id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {},
        () => {
          this.setState(oldState);
          console.log('something went wrong');
        }
      );
  }

  getPost(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts/${id}`);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
