import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentOpportunitiesComponent } from './investment-opportunities.component';

describe('InvestmentOpportunitiesComponent', () => {
  let component: InvestmentOpportunitiesComponent;
  let fixture: ComponentFixture<InvestmentOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentOpportunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
