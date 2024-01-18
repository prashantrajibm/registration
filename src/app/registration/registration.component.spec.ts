import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { UserRegistrationService } from '../user-registration.service';
import { Router } from '@angular/router';
import { RegistrationStatusService } from './registration-status.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import the MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import the MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Import the MatButtonModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import the BrowserAnimationsModule

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let registrationServiceSpy: jasmine.SpyObj<UserRegistrationService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let statusServiceSpy: jasmine.SpyObj<RegistrationStatusService>;

  beforeEach(() => {
    registrationServiceSpy = jasmine.createSpyObj('UserRegistrationService', ['registerUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    statusServiceSpy = jasmine.createSpyObj('RegistrationStatusService', ['setUserRegistered']);

    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: UserRegistrationService, useValue: registrationServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: RegistrationStatusService, useValue: statusServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
  });

  it('should register user and navigate to profile on success', () => {
    registrationServiceSpy.registerUser.and.returnValue(of({ success: true }));

    component.user = { name: 'John', email: 'john@example.com', password: 'secret', bio: 'Hello World' };
    component.register();

    expect(registrationServiceSpy.registerUser).toHaveBeenCalledWith(component.user);
    expect(statusServiceSpy.setUserRegistered).toHaveBeenCalledWith(true);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should handle registration failure', () => {
    registrationServiceSpy.registerUser.and.returnValue(of({ success: false }));

    component.user = { name: 'John', email: 'john@example.com', password: 'secret', bio: 'Hello World' };
    component.register();

    expect(registrationServiceSpy.registerUser).toHaveBeenCalledWith(component.user);
    expect(statusServiceSpy.setUserRegistered).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});