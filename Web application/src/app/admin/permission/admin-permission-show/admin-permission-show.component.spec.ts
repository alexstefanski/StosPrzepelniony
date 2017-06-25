import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissionShowComponent } from './admin-permission-show.component';

describe('AdminPermissionShowComponent', () => {
  let component: AdminPermissionShowComponent;
  let fixture: ComponentFixture<AdminPermissionShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPermissionShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPermissionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
