import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommentsService } from 'src/app/core/services/comments.service';
import { assertCommentId, Comment } from 'src/app/core/types/comment';
import { assertPostId } from 'src/app/core/types/post';

import { CommentsComponent } from './comments.component';

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

const comments = createTestComments(10);
const postId = assertPostId(1);

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let mockCommentsService: any;

  beforeEach(async () => {
    mockCommentsService = {
      comments$: of({
        [postId]: comments,
      }),
      deleteComment: () => {},
      getComments: () => {},
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CommentsComponent],
      providers: [{ provide: CommentsService, useValue: mockCommentsService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have delete method', () => {
    expect(component.delete).toBeTruthy();
  });

  it('should have delete toHaveBeenCalled', () => {
    spyOn(mockCommentsService, 'deleteComment');
    component.id = postId;
    component.delete(comments[0]);
    fixture.detectChanges();
    expect(mockCommentsService.deleteComment).toHaveBeenCalled();
  });

  it('comments$ length should not be 0', () => {
    component.id = postId;

    expect(component.comments$).not.toBeNull();
    component.comments$ &&
      component.comments$.subscribe((value) => {
        expect(value.length).not.toBe(0);
      });
  });

  it('comments$ length should be 0', () => {
    expect(component.comments$).not.toBeNull();
    component.comments$ &&
      component.comments$.subscribe((value) => {
        expect(value.length).toBe(0);
      });
  });
});
