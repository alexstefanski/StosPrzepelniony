import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdChangeStatusComponent } from './change-status.component';

describe('ChangeStatusComponent', () => {
  let component: AdChangeStatusComponent;
  let fixture: ComponentFixture<AdChangeStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdChangeStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdChangeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
