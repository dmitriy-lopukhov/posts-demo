import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { assertCommentId, Comment } from '../types/comment';
import { assertPostId } from '../types/post';
import { CommentsService } from './comments.service';

function createTestComments(length: number) {
  const testComments: Comment[] = Array.from({ length })
    .fill(null)
    .map((_, index) => {
      const i = index + 1;
      const comment: Comment = {
        id: assertCommentId(i),
        body: `comment body ${i}`,
        email: `comment email ${i}`,
        name: `comment name ${i}`,
        postId: assertPostId(i),
      };
      return comment;
    });
  return testComments;
}

describe('CommentsService', () => {
  let service: CommentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CommentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit destroy$ on ngOnDestroy', () => {
    spyOn(service.destroy$, 'next');
    service.ngOnDestroy();
    expect(service.ngOnDestroy).toBeTruthy();
    expect(service.destroy$.next).toHaveBeenCalled();
  });

  it('should setState with no id', () => {
    const comments = createTestComments(10);
    service.setState(comments);

    service.comments$.subscribe((value) => {
      expect(Object.keys(value).length).toBe(0);
    });
  });

  it('should setState with id', () => {
    const comments = createTestComments(10);
    const postId = assertPostId(1);
    service.setState(comments, postId);

    service.comments$.subscribe((value) => {
      expect(value[postId]).toBeTruthy();
      expect(Object.keys(value).length).toBe(1);
      expect(value[postId]?.length).toBe(comments.length);
    });
  });

  it('should setState with wrong id', () => {
    const comments = createTestComments(10);
    const postId = NaN;
    service.setState(comments, postId as any);

    service.comments$.subscribe((value) => {
      expect(Object.keys(value).length).toBe(0);
    });
  });

  it('should getComments', () => {
    spyOn(service, 'setState');
    const comments = createTestComments(10);
    const postId = assertPostId(1);
    service.getComments(postId);

    const request = httpMock.expectOne(
      `${environment.apiUrl}/posts/${postId}/comments`
    );
    expect(request.request.method).toBe('GET');
    request.flush(comments);

    expect(service.setState).toHaveBeenCalled();
    service.comments$
      .pipe(filter((value) => !!value[postId]))
      .subscribe((value) => {
        expect(value[postId]?.length).toBe(comments.length);
      });
  });

  it('should emit destroy$ on ngOnDestroy', () => {
    const comments = createTestComments(10);
    const postId = assertPostId(1);
    const commentId = assertCommentId(1);
    service.setState(comments, postId);
    service.deleteComment(postId, commentId);

    const request = httpMock.expectOne(
      `${environment.apiUrl}/posts/${postId}/`
    );
    expect(request.request.method).toBe('DELETE');
    request.flush({});

    service.comments$
      .pipe(filter((value) => !!value[postId]))
      .subscribe((value) => {
        expect(value[postId]?.length).toBe(comments.length - 1);
      });
  });
});
