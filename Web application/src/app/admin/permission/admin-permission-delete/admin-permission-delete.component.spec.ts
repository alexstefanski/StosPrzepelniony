import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissionDeleteComponent } from './admin-permission-delete.component';

describe('AdminPermissionDeleteComponent', () => {
  let component: AdminPermissionDeleteComponent;
  let fixture: ComponentFixture<AdminPermissionDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPermissionDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPermissionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
