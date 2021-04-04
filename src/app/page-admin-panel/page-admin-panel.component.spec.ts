import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdminPanelComponent } from './page-admin-panel.component';

describe('PageAdminPanelComponent', () => {
  let component: PageAdminPanelComponent;
  let fixture: ComponentFixture<PageAdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAdminPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
