import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastModule } from "primeng/toast";
import { GMapModule } from "primeng/gmap";
import { DialogModule } from "primeng/dialog";
import {CheckboxModule} from 'primeng/checkbox';

const primengModules = [ToastModule, GMapModule, DialogModule,CheckboxModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, primengModules],
  exports: [primengModules],
})
export class PrimengModule {}
