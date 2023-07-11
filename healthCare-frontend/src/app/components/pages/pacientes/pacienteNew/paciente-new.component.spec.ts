import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteNewComponent } from './paciente-new.component';

describe('PacienteNewComponent', () => {
  let component: PacienteNewComponent;
  let fixture: ComponentFixture<PacienteNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacienteNewComponent]
    });
    fixture = TestBed.createComponent(PacienteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
