import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesComponent } from './unidades.component';

describe('UnidadesComponent', () => {
  let component: UnidadesComponent;
  let fixture: ComponentFixture<UnidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadesComponent]
    });
    fixture = TestBed.createComponent(UnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
