import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GlobalVariablesCacheService {

  private variables = {}

  variableUpdateSubject = new Subject<[string, string]>();

  constructor() {}

  getVariableValue(name: string, defaultValue: any) {
    if (name in this.variables) {
      return this.variables[name]
    }
    this.variables[name] = defaultValue
    return defaultValue
  }

  updateVariableValue(name: string, newValue: any) {
    this.variables[name] = newValue
    this.variableUpdateSubject.next([name, newValue]);
    return newValue
  }

  variableUpdateListner(name: string): Observable<any> {
    return this.variableUpdateSubject[name]
  }


}
