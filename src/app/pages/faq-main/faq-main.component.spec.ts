import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqMainComponent } from './faq-main.component';

describe('FaqMainComponent', () => {
  let component: FaqMainComponent;
  let fixture: ComponentFixture<FaqMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
