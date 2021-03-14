import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommentsService } from '../core/services/comments.service';
import { PostsService } from '../core/services/posts.service';
import { Post, assertPostId, assertUserId } from '../core/types/post';

import { PostsComponent } from './posts.component';

const testPosts: Post[] = Array.from({ length: 10 })
  .fill(null)
  .map((_, index) => {
    const i = index + 1;
    const post: Post = {
      userId: assertUserId(i),
      id: assertPostId(i),
      body: `post body ${i}`,
      title: `post title ${i}`,
    };
    return post;
  });

describe('PostsComponent', () => {
  let postsComponent: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let commentsService: CommentsService;
  let mockPostsService: any;
  let de: DebugElement;

  beforeEach(async () => {
    mockPostsService = {
      isEnd$: of(false),
      loading$: of(false),
      posts$: of(testPosts),
      getPosts: () => {},
      deletePost: () => {},
      addPage: () => {},
      postsByPage$: of(testPosts),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PostsComponent],
      providers: [{ provide: PostsService, useValue: mockPostsService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    postsComponent = fixture.componentInstance;
    de = fixture.debugElement;
    commentsService = de.injector.get(CommentsService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(postsComponent).toBeTruthy();
  });

  it('should implement ngOnDestroy', () => {
    expect(postsComponent.ngOnDestroy).toBeTruthy();
  });

  it('should show posts', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('app-post').length).toBe(testPosts.length);
  });

  it('should trigger getComments from CommentsService', () => {
    spyOn(commentsService, 'getComments');
    const postComponent = fixture.componentInstance;
    postComponent.onLoadComments(testPosts[0].id);
    fixture.detectChanges();
    expect(commentsService.getComments).toHaveBeenCalled();
  });

  it('should trigger deletePost from PostsService', () => {
    spyOn(mockPostsService, 'deletePost');
    const postComponent = fixture.componentInstance;
    postComponent.onDeletePost(testPosts[0].id);
    fixture.detectChanges();
    expect(mockPostsService.deletePost).toHaveBeenCalled();
  });

  it('should have call addPage when isEnd === false', () => {
    spyOn(mockPostsService, 'addPage');
    postsComponent.isEnd = false;
    postsComponent.onScroll();
    fixture.detectChanges();
    expect(mockPostsService.addPage).toHaveBeenCalled();
  });

  it('should have not call addPage when isEnd === true', () => {
    spyOn(mockPostsService, 'addPage');
    postsComponent.isEnd = true;
    postsComponent.onScroll();
    fixture.detectChanges();
    expect(mockPostsService.addPage).not.toHaveBeenCalled();
  });

  it('should emit destroy$ on ngOnDestroy', () => {
    spyOn(postsComponent.destroy$, 'next');
    postsComponent.ngOnDestroy();
    expect(postsComponent.ngOnDestroy).toBeTruthy();
    expect(postsComponent.destroy$.next).toHaveBeenCalled();
  });
});
