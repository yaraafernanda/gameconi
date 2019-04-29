import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesinprogressComponent } from './gamesinprogress.component';

describe('GamesinprogressComponent', () => {
  let component: GamesinprogressComponent;
  let fixture: ComponentFixture<GamesinprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesinprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesinprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
