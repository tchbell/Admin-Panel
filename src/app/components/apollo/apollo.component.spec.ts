import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApolloComponent } from './apollo.component';

describe('ApolloComponent', () => {
  let component: ApolloComponent;
  let fixture: ComponentFixture<ApolloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApolloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
