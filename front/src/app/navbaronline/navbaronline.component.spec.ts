import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbaronlineComponent } from './navbaronline.component';

describe('NavbaronlineComponent', () => {
  let component: NavbaronlineComponent;
  let fixture: ComponentFixture<NavbaronlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbaronlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbaronlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
