import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationStatusService {
  private userRegistered = false;

  setUserRegistered(status: boolean): void {
    this.userRegistered = status;
  }

  isUserRegistered(): boolean {
    return this.userRegistered;
  }
}
