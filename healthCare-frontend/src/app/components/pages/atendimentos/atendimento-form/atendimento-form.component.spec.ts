import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoFormComponent } from './atendimento-form.component';

describe('AtendimentoFormComponent', () => {
  let component: AtendimentoFormComponent;
  let fixture: ComponentFixture<AtendimentoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentoFormComponent]
    });
    fixture = TestBed.createComponent(AtendimentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});