import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MylinksComponent } from './mylinks.component';

describe('MylinksComponent', () => {
  let component: MylinksComponent;
  let fixture: ComponentFixture<MylinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MylinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MylinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
