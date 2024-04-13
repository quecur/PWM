import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticityComponent } from './authenticity.component';

describe('AuthenticityComponent', () => {
  let component: AuthenticityComponent;
  let fixture: ComponentFixture<AuthenticityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthenticityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
