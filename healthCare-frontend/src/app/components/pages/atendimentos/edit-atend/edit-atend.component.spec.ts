import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAtendComponent } from './edit-atend.component';

describe('EditAtendComponent', () => {
  let component: EditAtendComponent;
  let fixture: ComponentFixture<EditAtendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAtendComponent]
    });
    fixture = TestBed.createComponent(EditAtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
