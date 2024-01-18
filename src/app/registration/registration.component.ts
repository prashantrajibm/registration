import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  
  user = {
    name: '',
    email: '',
    password: '',
    bio: ''
  };

  register() {
    console.log('User Registered:', this.user);
  }
}
