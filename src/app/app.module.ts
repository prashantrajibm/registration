import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component'; 
import { AuthGuard } from './auth.guard';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RegistrationStatusService } from './registration/registration-status.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    provideHttpClient(withFetch()),
    RegistrationStatusService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
