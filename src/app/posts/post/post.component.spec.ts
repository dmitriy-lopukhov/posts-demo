import { ComponentFixture, TestBed } from '@angular/core/testing';
import { assertPostId, assertUserId, Post } from 'src/app/core/types/post';

import { PostComponent } from './post.component';

const testPost: Post = {
  id: assertPostId(1),
  body: 'post body',
  title: 'post title',
  userId: assertUserId(1),
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show nothing', () => {
    const postComponent = fixture.componentInstance;
    postComponent.post = null;

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.post')).toBeFalsy();
  });

  it('should show title', () => {
    const postComponent = fixture.componentInstance;
    postComponent.post = testPost;

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h5').textContent).toContain(
      `${testPost.id} - ${testPost.title}`
    );
  });

  it('should show message', () => {
    const postComponent = fixture.componentInstance;
    postComponent.post = testPost;

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(
      `${testPost.body}`
    );
  });

  it('should show delete btn', () => {
    const postComponent = fixture.componentInstance;
    postComponent.post = testPost;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('app-button[label="See comments"]')
    ).toBeTruthy();
  });

  it('should show comments btn', () => {
    const postComponent = fixture.componentInstance;
    postComponent.post = testPost;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('app-button[label="See comments"]')
    ).toBeTruthy();
  });

  it('should emit event for deletePost', () => {
    spyOn(component.deletePost, 'emit');
    const postComponent = fixture.componentInstance;
    postComponent.post = testPost;
    postComponent.delete(testPost.id);
    fixture.detectChanges();
    expect(component.deletePost.emit).toHaveBeenCalled();
  });

  it('should emit event for loadComments', () => {
    spyOn(component.loadComments, 'emit');
    const postComponent = fixture.componentInstance;
    postComponent.post = testPost;
    postComponent.toggleComments(testPost.id);
    fixture.detectChanges();
    expect(component.loadComments.emit).toHaveBeenCalled();
  });

  it('should NOT emit event for loadComments', () => {
    spyOn(component.loadComments, 'emit');
    const postComponent = fixture.componentInstance;
    postComponent.expanded = true;
    postComponent.post = testPost;
    postComponent.toggleComments(testPost.id);
    fixture.detectChanges();
    expect(component.loadComments.emit).not.toHaveBeenCalled();
  });
});
