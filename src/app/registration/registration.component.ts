import { Component } from '@angular/core'
import { UserRegistrationService } from '../user-registration.service';
import { Router } from '@angular/router';
import { RegistrationStatusService } from './registration-status.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  user = {
    name: '',
    email: '',
    password: '',
    bio: ''
  };

  constructor(
    private registrationService: UserRegistrationService,
    private router: Router,
    private registrationStatusService: RegistrationStatusService
  ) { }

  register() {
    console.log('User Registered:', this.user);

    this.registrationService.registerUser(this.user).subscribe(
      response => {
        console.log('User Registered:', response);
        if (response.success) {
          console.log('Navigation to profile page...');
          this.registrationStatusService.setUserRegistered(true);
          this.router.navigate(['/profile']);
        } else {
          console.error('Registration failed.');
        }
      },
      error => {
        console.error('Error Registering User', error);
      }
    );
  }
}
