import { ComponentFixture, TestBed } from '@angular/core/testing';
import { assertPostId, Post } from 'src/app/core/types/post';

import { PostComponent } from './post.component';

const testPost: Post = {
  id: assertPostId(1),
  body: 'post body',
  title: 'post title',
  userId: 1,
};

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show title', () => {
    const fixture = TestBed.createComponent(PostComponent);
    const postComponent = fixture.componentInstance;
    postComponent.post = testPost;

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h5').textContent).toContain(
      `${testPost.id} - ${testPost.title}`
    );
  });

  it('should show message', () => {
    const fixture = TestBed.createComponent(PostComponent);
    const postComponent = fixture.componentInstance;
    postComponent.post = testPost;

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(
      `${testPost.body}`
    );
  });

  it('should show delete btn', () => {
    const fixture = TestBed.createComponent(PostComponent);
    const postComponent = fixture.componentInstance;
    postComponent.post = testPost;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-button[label="✕"]')).toBeTruthy();
  });

  it('should show comments btn', () => {
    const fixture = TestBed.createComponent(PostComponent);
    const postComponent = fixture.componentInstance;
    postComponent.post = testPost;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('app-button[label="See comments"]')
    ).toBeTruthy();
  });
});
