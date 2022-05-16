import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { FormBuilderHelper } from "src/app/services/helpers-and-utilities/formBuilderHelper";
import { langHelper } from "src/app/services/helpers-and-utilities/language-helper";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from 'primeng/api';
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  showPassword: boolean = false;
  formType: string = "login";
  userProfile;
  countriesCode: any[] = ["+966"];
  selectedCountryCode: any = this.countriesCode[0];
  userRoles: any[] = ['ROLE_ADMIN']
  selectedRole: any = this.userRoles[0];

  isLoading: boolean = false;
  isLoggedIn: boolean = false;

  displayModal: boolean = false;

  langVar;
  LoginForm: FormGroup;
  RegisterForm: FormGroup;
  userName = localStorage.getItem("userName");
  constructor(
    public authService: AuthenticationService,
    public langHelper: langHelper,
    private formBuilderHelper: FormBuilderHelper,
    private router: Router,
    private messageService: MessageService
  ) {
    this.langVar = this.langHelper.initializeMode();
    this.LoginForm = this.formBuilderHelper.CreateFormBuilder({
      loginIdentifier: "",
      password: "",
    });
    this.RegisterForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      type: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  get LoginFormControls() {
    return this.LoginForm.controls;
  }

  ngOnInit(): void {
    console.log(this.authService.isAuthenticated());
  }

  getUserDetails() {
    this.authService.GetAccountViaToken().subscribe(
      (res) => {
        if (res.succeeded) {
          this.userProfile = res.data;
          this.isLoggedIn = true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loginFailed: boolean = false;
  login() {
    console.log("form ", this.LoginForm);
    this.isLoading = true;
    const model = {
      usernameOrEmail:
        this.selectedCountryCode + this.LoginForm.value.loginIdentifier,
      password: this.LoginForm.value.password,
    };
    console.log(model);
    this.authService.login(model).subscribe(
      (res) => {
        this.messageService.add({ severity: 'success', summary: 'تم تسجيل الدخول', detail: `مرحبا ,${res.userName}` });
        console.log(res);
        this.isLoading = false;
        this.displayModal = false;
        this.LoginForm.reset();
        this.userName = res.userName;
        console.log("login model", res);
        localStorage.setItem("userID", res.userId);
        localStorage.setItem("userName", res.userName);
        localStorage.setItem("accountID", res.accountId);
        localStorage.setItem("accountName", res.accountName);
        localStorage.setItem("phoneNumber", model.usernameOrEmail);
        this.authService.setToken(res.accessToken);
      },
      (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: `فشل فى الدخول, يرجى مراجعه البيانات` });
        this.isLoading = false;
        this.loginFailed = true;
        this.LoginForm.reset();
      }
    );
  }
  register() {
    this.authService
      .register(this.RegisterForm.value)
      .subscribe((result: any) => {
        this.isLoading = false;
        this.formType = "login";
        this.displayModal = false;
      });
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  logout() {
    this.authService.logout();
  }
  openForm(formType: string) {
    this.formType = formType;
  }
  selectCountryCode(event: any) {
    this.selectedCountryCode = event
  }
}
