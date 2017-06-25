import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissionAddComponent } from './admin-permission-add.component';

describe('AdminPermissionAddComponent', () => {
  let component: AdminPermissionAddComponent;
  let fixture: ComponentFixture<AdminPermissionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPermissionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPermissionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
