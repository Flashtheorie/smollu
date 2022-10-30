import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarofflineComponent } from './navbaroffline.component';

describe('NavbarofflineComponent', () => {
  let component: NavbarofflineComponent;
  let fixture: ComponentFixture<NavbarofflineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarofflineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarofflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
