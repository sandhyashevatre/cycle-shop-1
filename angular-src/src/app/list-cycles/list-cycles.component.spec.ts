import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCyclesComponent } from './list-cycles.component';

describe('ListCyclesComponent', () => {
  let component: ListCyclesComponent;
  let fixture: ComponentFixture<ListCyclesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCyclesComponent]
    });
    fixture = TestBed.createComponent(ListCyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
