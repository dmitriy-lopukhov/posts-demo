import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { defaultPage, defaultPageLimit } from '../constants';
import { Post } from '../types/post';

type State = {
  items: { [id: number]: Post };
  loading: boolean;
  loaded: boolean;
  page: number;
  pageLimit: number;
};

const inititalState: State = {
  items: {},
  loading: false,
  loaded: false,
  page: defaultPage,
  pageLimit: defaultPageLimit,
};

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts = new BehaviorSubject<State>(inititalState);
  public readonly posts$ = this.posts.asObservable();

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts`);
  }

  getPost(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
  }
}
