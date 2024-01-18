import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { RegistrationStatusService } from './registration/registration-status.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private registrationStatusService: RegistrationStatusService) {}

  canActivate(): boolean {
    const isUserRegistered = this.registrationStatusService.isUserRegistered();
    if(isUserRegistered) {
      return true
    } else {
      this.router.navigate(['/register'])
      return false
    }
  }
}
