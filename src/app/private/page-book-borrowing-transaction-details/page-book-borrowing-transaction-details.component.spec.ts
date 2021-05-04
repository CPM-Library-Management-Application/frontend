import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBookBorrowingTransactionDetailsComponent } from './page-book-borrowing-transaction-details.component';

describe('PageBookBorrowingTransactionDetailsComponent', () => {
  let component: PageBookBorrowingTransactionDetailsComponent;
  let fixture: ComponentFixture<PageBookBorrowingTransactionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBookBorrowingTransactionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBookBorrowingTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
