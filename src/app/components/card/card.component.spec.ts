import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardComponent } from './card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, CardComponent, HttpClientTestingModule, NoopAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when button is clicked', () => {
    spyOn(component, 'onFormSubmit');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.onFormSubmit).toHaveBeenCalled();
  });

  it('should get data from the two inputs when form is submitted', () => {
    // Set the form control values
    component.userForm.controls['userLocation'].setValue({
      "name": "Hartsfield-Jackson Atlanta International Airport",
      "code": "ATL",
      "city": "Atlanta",
      "country": "USA"
    });
    component.userForm.controls['userDesiredLocation'].setValue({
      "name": "Hartsfield-Jackson Atlanta International Airport",
      "code": "ATL",
      "city": "Atlanta",
      "country": "USA"
    });

    // Simulate form submission
    component.onFormSubmit();

    // Check that the form value includes the correct data
    expect(component.userForm.value).toEqual({
      userLocation: {
        "name": "Hartsfield-Jackson Atlanta International Airport",
        "code": "ATL",
        "city": "Atlanta",
        "country": "USA"
      },
      userDesiredLocation: {
        "name": "Hartsfield-Jackson Atlanta International Airport",
        "code": "ATL",
        "city": "Atlanta",
        "country": "USA"
      }
    });
  });

});
