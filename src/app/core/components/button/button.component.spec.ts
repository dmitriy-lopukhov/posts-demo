import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

const testLabel = 'test label';
const btnClass: ButtonComponent['btnClass'] = 'outlined';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have label', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const btn = fixture.componentInstance;
    btn.label = testLabel;

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain(
      `${testLabel}`
    );
  });

  it('should have outlined class', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const btn = fixture.componentInstance;
    btn.btnClass = btnClass;

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector(`button[class="btn ${btnClass}"]`)
    ).toBeTruthy();
  });

  it('should test click', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const btn = fixture.componentInstance;
    spyOn(btn, 'handleClick');
    const compiled = fixture.nativeElement;
    compiled.querySelector('button').click();
    expect(btn.handleClick).toHaveBeenCalled();
  });
});
