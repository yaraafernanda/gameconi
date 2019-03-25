import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameplayedComponent } from './gameplayed.component';

describe('GameplayedComponent', () => {
  let component: GameplayedComponent;
  let fixture: ComponentFixture<GameplayedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameplayedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameplayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
