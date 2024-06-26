import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRegisterComponent } from './pre-register.component';

describe('PreRegisterComponent', () => {
  let component: PreRegisterComponent;
  let fixture: ComponentFixture<PreRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
