import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, finalize, map } from 'rxjs/operators';
import { defaultPage, defaultPageLimit } from '../constants';
import { Post } from '../types/post';

type PostDict = { [id: number]: Post };

type State = {
  items: PostDict;
  page: number;
  pageLimit: number;
};

const inititalState: State = {
  items: {},
  page: defaultPage,
  pageLimit: defaultPageLimit,
};

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts = new BehaviorSubject<State>(inititalState);
  public readonly posts$ = this.posts
    .asObservable()
    .pipe(map((state) => Object.values(state)));

  private loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loading.asObservable();

  constructor(private http: HttpClient) {}

  setState(posts: Post[]): void {
    const state: State = {
      ...this.posts.getValue(),
      items: posts.reduce((res: PostDict, i) => {
        res[i.id] = i;
        return res;
      }, {}),
    };
    console.log(state);
    this.posts.next(state);
  }

  getPosts(): Observable<Post[]> {
    this.loading.next(true);
    return this.http
      .get<Post[]>(`https://jsonplaceholder.typicode.com/posts`)
      .pipe(
        tap((posts) => this.setState(posts)),
        finalize(() => this.loading.next(false))
      );
  }

  getPost(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
  }
}
