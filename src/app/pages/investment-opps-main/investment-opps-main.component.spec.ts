import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentOppsMainComponent } from './investment-opps-main.component';

describe('InvestmentOppsMainComponent', () => {
  let component: InvestmentOppsMainComponent;
  let fixture: ComponentFixture<InvestmentOppsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentOppsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentOppsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
