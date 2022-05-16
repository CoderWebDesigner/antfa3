import { ActionType } from 'src/app/enums/action-type';
import { ErrorType } from '../../enums/error-type';

export interface ApiResponse {
  data?: any;
  errors?: string[];
  errorType?: ErrorType;
  actionType?: ActionType;
  succeeded?: boolean;
}

export interface ApiResponseTemplate<T> {
  data?: T;
  errors?: string[];
  errorType?: ErrorType;
  actionType?: ActionType;
  succeeded?: boolean;
}