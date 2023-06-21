import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentosComponent } from './atendimentos.component';

describe('AtendimentosComponent', () => {
  let component: AtendimentosComponent;
  let fixture: ComponentFixture<AtendimentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentosComponent]
    });
    fixture = TestBed.createComponent(AtendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
