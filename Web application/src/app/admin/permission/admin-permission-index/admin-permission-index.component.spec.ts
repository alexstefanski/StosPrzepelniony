import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissionIndexComponent } from './admin-permission-index.component';

describe('AdminPermissionIndexComponent', () => {
  let component: AdminPermissionIndexComponent;
  let fixture: ComponentFixture<AdminPermissionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPermissionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPermissionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
