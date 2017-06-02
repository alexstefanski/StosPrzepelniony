import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdShowComponent } from './show.component';

describe('ShowComponent', () => {
  let component: AdShowComponent;
  let fixture: ComponentFixture<AdShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
