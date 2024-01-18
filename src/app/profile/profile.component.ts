import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';
import { error } from 'console';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {

  userProfile: any

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe(
      response => {
        this.userProfile = response
      }, error => {
        console.error('Error Fetching user profile: ', error)
      }
    )
  }

}
