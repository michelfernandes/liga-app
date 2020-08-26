import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPacientComponent } from './new-pacient.component';

describe('NewPacientComponent', () => {
  let component: NewPacientComponent;
  let fixture: ComponentFixture<NewPacientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPacientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
