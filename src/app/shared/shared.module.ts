import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxModule } from './ngx/ngx.module';
import { PrimengModule } from './primeng/primeng.module';



@NgModule({
  declarations: [ModalComponent,],
  providers: [MessageService, ConfirmationService],
  imports: [
    FormsModule,
    ToastModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxModule,
    PrimengModule
  ],
  exports: [ModalComponent,NgxModule,PrimengModule]
})
export class SharedModule { }
