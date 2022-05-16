import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from '../common/base-service';

// @Injectable()
// export class CanDeactivateGuard implements CanDeactivate<SelectionCriteriaComponent> {


//   canDeactivate(
//     component: SelectionCriteriaComponent,
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//     nextState: RouterStateSnapshot
//   ): Observable<any> | any {
//     component.CalculateTotalPercentage();
//     if (component.canDeactivate === true) {
//       return true;
//     }
//     else {
//       return component.Display_TaskNotDone_Modal(nextState);
//     }
//   }

// }
