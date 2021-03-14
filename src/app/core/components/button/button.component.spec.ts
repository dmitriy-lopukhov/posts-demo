import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClicksService } from '../../services/clicks.service';

import { ButtonComponent } from './button.component';

const testLabel = 'test label';
const btnClass: ButtonComponent['btnClass'] = 'outlined';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let clicksService: any;

  beforeEach(async () => {
    clicksService = {
      clicks$: of(3),
      addClick() {},
    };

    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      providers: [{ provide: ClicksService, useValue: clicksService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have label', () => {
    component.label = testLabel;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain(
      `${testLabel}`
    );
  });

  it('should have outlined class', () => {
    component.btnClass = btnClass;

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector(`button[class="btn ${btnClass}"]`)
    ).toBeTruthy();
  });

  it('should test click', () => {
    spyOn(component, 'handleClick');
    const compiled = fixture.nativeElement;
    compiled.querySelector('button').click();
    expect(component.handleClick).toHaveBeenCalled();
  });

  it('click event should be emited', () => {
    spyOn(component.clicked, 'next');
    component.handleClick();
    expect(component.clicked.next).toHaveBeenCalled();
  });

  it('clicksService should increase click count', () => {
    spyOn(clicksService, 'addClick');
    component.handleClick();
    expect(clicksService.addClick).toHaveBeenCalled();
    clicksService.clicks$.subscribe((value: number) => {
      expect(value).toBeGreaterThan(0);
    });
  });
});
