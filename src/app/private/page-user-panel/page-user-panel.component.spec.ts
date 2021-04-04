import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUserPanelComponent } from './page-user-panel.component';

describe('PageUserPanelComponent', () => {
  let component: PageUserPanelComponent;
  let fixture: ComponentFixture<PageUserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageUserPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
