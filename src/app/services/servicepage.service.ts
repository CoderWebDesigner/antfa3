import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/shared/api-response';
import { API_CONSTANTS } from './common/api-constants';
import { BaseService } from './common/base-service';


@Injectable({
  providedIn: 'root'
})

export class ServicePageService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }


  SubmitPropertyRequest(model): Observable<ApiResponse> {
    return this.post(API_CONSTANTS.Services.PropertyRequest, model);
  }

  getAllServices(): Observable<any> {
    return this.get(API_CONSTANTS.Services.getAllServices);
  }

  getServiceViaID(id): Observable<any> {
    return this.get(API_CONSTANTS.Services.getServiceViaID + id);
  }

}
