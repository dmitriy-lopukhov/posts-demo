import { TestBed } from '@angular/core/testing';
import { PostsService } from './posts.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { assertPostId, assertUserId, Post, PostId } from '../types/post';
import { filter } from 'rxjs/operators';

function createTestPosts(length: number) {
  const testPosts: Post[] = Array.from({ length })
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
  return testPosts;
}

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isEnd$ should be true', () => {
    service.isEnd$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('loading$ should be false', () => {
    service.loading$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('posts$ should be []', () => {
    service.posts$.subscribe((value) => {
      expect(value.length).toBe(0);
    });
  });

  it('getPosts', () => {
    const testPosts = createTestPosts(10);
    service.getPosts();
    service.posts$
      .pipe(filter((val) => !!(val && val.length)))
      .subscribe((value) => {
        expect(value.length).toBe(testPosts.length);
      });

    const request = httpMock.expectOne(`${environment.apiUrl}/posts`);
    expect(request.request.method).toBe('GET');
    request.flush(testPosts);
  });

  it('setState', () => {
    const testPosts = createTestPosts(10);
    service.setState(testPosts);
    service.posts$
      .pipe(filter((val) => !!(val && val.length)))
      .subscribe((value) => {
        expect(value.length).toBe(testPosts.length);
      });
  });

  it('deletePost', () => {
    const testPosts = createTestPosts(10);
    const postId: PostId = assertPostId(1);
    const length = testPosts.length - 1;
    service.setState(testPosts);
    service.deletePost(postId);
    service.posts$
      .pipe(filter((val) => !!(val && val.length)))
      .subscribe((value) => {
        expect(value.length).toBe(length);
      });

    const request = httpMock.expectOne(`${environment.apiUrl}/posts/${postId}`);
    expect(request.request.method).toBe('DELETE');
    request.flush({});
  });

  it('addPage', () => {
    const testPosts = createTestPosts(20);
    service.setState(testPosts);
    service.addPage();
    service.postsByPage$
      .pipe(filter((val) => !!(val && val.length)))
      .subscribe((value) => {
        expect(value.length).toBe(testPosts.length);
      });
  });

  it('isEnd$ should be reached', () => {
    const testPosts = createTestPosts(25);
    service.setState(testPosts);
    service.addPage();
    service.addPage();
    service.isEnd$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('should emit destroy$ on ngOnDestroy', () => {
    spyOn(service.destroy$, 'next');
    service.ngOnDestroy();
    expect(service.ngOnDestroy).toBeTruthy();
    expect(service.destroy$.next).toHaveBeenCalled();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
