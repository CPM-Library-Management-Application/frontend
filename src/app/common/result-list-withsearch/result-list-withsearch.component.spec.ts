import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultListWithsearchComponent } from './result-list-withsearch.component';

describe('ResultListWithsearchComponent', () => {
  let component: ResultListWithsearchComponent;
  let fixture: ComponentFixture<ResultListWithsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultListWithsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListWithsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
