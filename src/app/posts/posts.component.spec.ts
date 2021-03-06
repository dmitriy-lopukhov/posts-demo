import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostsService } from '../core/services/posts.service';
import { Post, assertPostId } from '../core/types/post';

import { PostsComponent } from './posts.component';

const testPosts: Post[] = [
  {
    id: assertPostId(1),
    body: 'post body',
    title: 'post title',
    userId: 1,
  },
  {
    id: assertPostId(2),
    body: 'post body',
    title: 'post title',
    userId: 1,
  },
];

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PostsComponent],
      providers: [PostsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show posts', () => {
    const fixture = TestBed.createComponent(PostsComponent);
    const postsComponent = fixture.componentInstance;
    postsComponent.posts$ = of(testPosts);

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('app-post').length).toBe(2);
  });
});
