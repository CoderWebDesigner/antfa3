import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentOppDetailsComponent } from './investment-opp-details.component';

describe('InvestmentOppDetailsComponent', () => {
  let component: InvestmentOppDetailsComponent;
  let fixture: ComponentFixture<InvestmentOppDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentOppDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentOppDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
