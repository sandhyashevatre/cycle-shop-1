import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFromCartComponent } from './remove-from-cart.component';

describe('RemoveFromCartComponent', () => {
  let component: RemoveFromCartComponent;
  let fixture: ComponentFixture<RemoveFromCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveFromCartComponent]
    });
    fixture = TestBed.createComponent(RemoveFromCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
