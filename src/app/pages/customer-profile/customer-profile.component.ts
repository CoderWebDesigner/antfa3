import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FormBuilderHelper } from 'src/app/services/helpers-and-utilities/formBuilderHelper';
import { langHelper } from 'src/app/services/helpers-and-utilities/language-helper';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  userProfile;
  ProfileForm: FormGroup;
  profileImageToUpload: any;


  langVar;
  isLoading: boolean = false;

  constructor(private authService: AuthenticationService, public langHelper: langHelper, private formBuilderHelper: FormBuilderHelper, private router: Router) {
    this.langVar = this.langHelper.initializeMode();
    this.ProfileForm = this.formBuilderHelper.CreateFormBuilder({
      displayName: '',
      title: '',
      firstName: '',
      lastName: '',
      secondaryContact: '',
      unit: '',
      company: '',
      dateOfBirth: '',
      email: '',
      phoneNumber: ''
    });
  }

  get ProfileFormControls() {
    return this.ProfileForm.controls;
  }


  ngOnInit(): void {
  }

  SaveProfileChanges() {
  }


  uploadFile(e: any) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      var base64data = reader.result;
      var strImage = base64data.toString().replace(/^data:image\/[a-z]+;base64,/, "");
      this.profileImageToUpload = strImage;
    }
  }
}




