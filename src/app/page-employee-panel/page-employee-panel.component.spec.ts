import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEmployeePanelComponent } from './page-employee-panel.component';

describe('PageEmployeePanelComponent', () => {
  let component: PageEmployeePanelComponent;
  let fixture: ComponentFixture<PageEmployeePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEmployeePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEmployeePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
