import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Comment, CommentId } from '../types/comment';
import { PostId } from '../types/post';

type CommentsState = { [id: number]: Comment[] };

@Injectable({
  providedIn: 'root',
})
export class CommentsService implements OnDestroy {
  destroy$ = new Subject();
  private comments = new BehaviorSubject<CommentsState>({});
  public readonly comments$ = this.comments.asObservable();

  constructor(private httpClient: HttpClient) {}

  getComments(id: PostId): void {
    this.httpClient
      .get<Comment[]>(`${environment.apiUrl}/posts/${id}/comments`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((comments) => this.setState(comments, id));
  }

  deleteComment(postId: PostId, commentId: CommentId): void {
    const oldState: CommentsState = this.comments.getValue();
    const comments = oldState[postId]
      ? oldState[postId].filter((i) => i.id !== commentId)
      : [];

    const newState: CommentsState = {
      ...oldState,
      [postId]: comments,
    };
    this.comments.next(newState);
    this.httpClient
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

  setState(comments: Comment[], postId?: PostId): void {
    const state: CommentsState = {
      ...this.comments.getValue(),
    };
    if (typeof postId === 'number' && !isNaN(postId)) {
      state[postId] = comments;
    }
    this.comments.next(state);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
