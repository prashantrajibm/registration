import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { UserProfileService } from '../user-profile.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockUserProfileService: jasmine.SpyObj<UserProfileService>;

  beforeEach(() => {
    mockUserProfileService = jasmine.createSpyObj('UserProfileService', ['getUserProfile']);

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        { provide: UserProfileService, useValue: mockUserProfileService },
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user profile on component initialization', () => {
    const mockUserProfile = { name: 'John', email: 'john@example.com', bio: 'Hello World' };
    mockUserProfileService.getUserProfile.and.returnValue(of(mockUserProfile));

    component.ngOnInit();

    expect(mockUserProfileService.getUserProfile).toHaveBeenCalled();
    expect(component.userProfile).toEqual(mockUserProfile);
  });

  it('should handle error when fetching user profile', () => {
    const errorMessage = 'Error fetching profile';
    mockUserProfileService.getUserProfile.and.returnValue(of({}));
    
    spyOn(console, 'error').and.callFake(() => {}); 
    
    try {
      component.ngOnInit();
    } catch (error) {
      expect(mockUserProfileService.getUserProfile).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Error fetching profile:', errorMessage);
    }
  });
});