import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Comment, CommentId } from '../types/comment';
import { PostId } from '../types/post';

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
export class CommentsService implements OnDestroy {
  private destroy$ = new Subject();
  private comments = new BehaviorSubject<CommentDict>(initialState);
  public readonly comments$ = this.comments.asObservable();

  constructor(private http: HttpClient) {}

  getComments(id: PostId): void {
    this.http
      .get<Comment[]>(`${environment.apiUrl}/posts/${id}/comments`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((comments) => this.setState(comments, id));
  }

  deleteComment(postId: PostId, commentId: CommentId): void {
    const oldState = this.comments.getValue();
    const newState = {
      ...oldState,
      [postId]: oldState[postId].filter((i) => i.id !== commentId),
    };
    this.comments.next(newState);
    this.http
      .delete<void>(
        // there was no api to delete the comment, so i used delete handler for post just for the demo
        `${environment.apiUrl}/posts/${postId}/`
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {},
        () => {
          console.log('something went wrong');
          this.comments.next(oldState);
        }
      );
  }

  setState(comments: Comment[], id?: PostId): void {
    const state = {
      ...this.comments.getValue(),
    };
    if (id) {
      state[id] = comments;
    }
    this.comments.next(state);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
