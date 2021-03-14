import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ClicksService } from './core/services/clicks.service';

describe('AppComponent', () => {
  let clicksService: any;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    clicksService = {
      clicks$: of(0),
      addClick(count: number) {
        this.clicks$ = of(count);
      },
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: ClicksService, useValue: clicksService }],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'post-feed'`, () => {
    expect(app.title).toEqual(app.title);
  });

  it('should show clicks counter', () => {
    const compiled = fixture.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('h3').textContent).toContain(
      'Clicks counter: 0'
    );
  });

  it('should add clicks to counter', () => {
    const count = 5;
    clicksService.addClick(count);
    const compiled = fixture.nativeElement;
    fixture.detectChanges();
    expect(compiled.querySelector('h3').textContent).toContain(
      `Clicks counter: ${count}`
    );
  });
});
