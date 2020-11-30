import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { Comment } from '../types/comment';

type CommentDict = { [id: number]: Comment[] };

type State = {
  comments: CommentDict;
};

const initialState: State = {
  comments: {},
};

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  destroy$ = new Subject();
  private comments = new BehaviorSubject<CommentDict>(initialState);
  public readonly comments$ = this.comments.asObservable();

  constructor(private http: HttpClient) {}

  getComments(id: number): void {
    this.http
      .get<Comment[]>(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((comments) => this.setState(id, comments));
  }

  setState(id: number, comments: Comment[]): void {
    const state = {
      ...this.comments.getValue(),
      [id]: comments,
    };
    this.comments.next(state);
  }
}
