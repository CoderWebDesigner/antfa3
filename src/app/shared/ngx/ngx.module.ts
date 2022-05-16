import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const ngxModules = [
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ngxModules
  ],
  exports:[
    ngxModules
  ]
})
export class NgxModule { }
