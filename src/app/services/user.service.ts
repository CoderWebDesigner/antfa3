import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/shared/api-response';
import { API_CONSTANTS } from './common/api-constants';
import { BaseService } from './common/base-service';

@Injectable({
  providedIn: 'root'
})

export class UserService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  // LoginAsync( model): Observable<ApiResponse> {
  //   return this.post(API_CONSTANTS.Users.Login , model);
  // }

  // Register( model): Observable<ApiResponse> {
  //   return this.post(API_CONSTANTS.Users.Register , model);
  // }


}
