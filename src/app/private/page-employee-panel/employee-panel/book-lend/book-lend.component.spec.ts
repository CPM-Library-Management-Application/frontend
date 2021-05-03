import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLendComponent } from './book-lend.component';

describe('BookLendComponent', () => {
  let component: BookLendComponent;
  let fixture: ComponentFixture<BookLendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookLendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookLendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
