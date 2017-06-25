import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissionEditComponent } from './admin-permission-edit.component';

describe('AdminPermissionEditComponent', () => {
  let component: AdminPermissionEditComponent;
  let fixture: ComponentFixture<AdminPermissionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPermissionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPermissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
