import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/user/LoginModel';
import { ApiResponse } from '../../models/shared/api-response';
import { API_CONSTANTS } from '../common/api-constants';
import { BaseService } from '../common/base-service';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService extends BaseService {


  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  jwtHelper = new JwtHelperService();

  setToken(token: string) {
    localStorage.setItem("access_token", token);
  }

  setSessionToken(token: string) {
    sessionStorage.setItem("access_token", token);
  }

  getToken(): string {
    const token = localStorage.getItem("access_token");
    if (token) {
      return token;
    }
    else {
      const token = sessionStorage.getItem("access_token");
      if (token) {
        return token;
      }
    }
  }

  removeToken(): void {
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");
  }

  getUserRole(): string {
    const token = this.getToken();
    if (token) {
      const { role } = this.jwtHelper.decodeToken(token);
      return role;
    }
  }

  getUserID(): string {
    const token = this.getToken();
    if (token) {
      const { nameid } = this.jwtHelper.decodeToken(token);
      return nameid;
    }
  }


  getUserAuthModel(): string {

    const token = this.getToken();

    debugger;
    if (token) {

      var userDetails: any = atob(token.split('.')[1])

      userDetails = JSON.parse(userDetails);

      const UserAuthModel = userDetails.AuthModel;

      return UserAuthModel;

    }
    else {
      return "False";
    }

  }

  isAuthenticated(): boolean {
    try {
      const token = this.getToken();
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
      return false;
    }
    catch {
      return false;
    }
  }

  isInRole(roleName: string): boolean {
    const token = this.getToken();
    if (token) {
      let roles: string[];
      const { role } = this.jwtHelper.decodeToken(token);
      roles = role;
      const res = roles.includes(roleName);
      if (res) {
        return true;
      }
    }
    return false;
  }

  getUserDetailsViaToken(): object {
    const token = this.getToken();
    if (token) {
      var userDetails: any = atob(token.split('.')[1])
      userDetails = JSON.parse(userDetails);
      return userDetails;
    }
  }

  GetAccountViaToken(): Observable<ApiResponse> {
    return this.get(API_CONSTANTS.GetUserAccountByToken);
  }

  login(model): Observable<any> {
    return this.post(API_CONSTANTS.Auth.Login, model);
  }


  register(model): Observable<any> {
    return this.post(API_CONSTANTS.Auth.Register, model);
  }

  // UpdateUserprofileInformation(model): Observable<ApiResponse> {
  //   return this.post(API_CONSTANTS.Users.UpdateUserProfileInformation, model);
  // }

  // UpdateUserProfileImage(model): Observable<ApiResponse> {
  //   return this.post(API_CONSTANTS.Users.UpdateUserProfileImage, model);
  // }

  // CompleteUserRegistration( model): Observable<ApiResponse> {
  //   return this.post(API_CONSTANTS.Users.CompleteRegistration , model);
  // }

  // GeneratePasswordResetToken( model): Observable<ApiResponse> {
  //   return this.post(API_CONSTANTS.Users.GeneratePasswordResetToken , model);
  // }

  // ResetUserPassword( model): Observable<ApiResponse> {
  //   return this.post(API_CONSTANTS.Users.ResetUserPassword , model);
  // }

  logout() {
    this.removeToken();
  }

}
