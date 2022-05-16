import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressBar } from 'primeng/progressbar';
import { langHelper } from 'src/app/services/helpers-and-utilities/language-helper';

//Shared Modal component for displaying general popups in parent components.
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'

})
export class ModalComponent implements OnInit {

  succesMsg;
  failmsg;
  langVar;
  currentLang;
  //info modal vars
  infoTitle: string;
  infoMessage: string;
  infoType: number; // enum number
  toastPosition: string = 'top-center';


  constructor(private formBuilder: FormBuilder, private router: Router,
    private langHelper: langHelper, public confirmationService: ConfirmationService, private messageService: MessageService) {
    this.langVar = this.langHelper.initializeMode();
    this.currentLang = this.langHelper.currentLang;
  }

  ngOnInit(): void {
  }

  DisplayHTTPRequestError(error: any) {
    if (error.error.errors != undefined) { //Defined
      console.log(error);
      if (this.currentLang == 'en') { //English
        if (error.error?.errorType == 4) { //Warning
          this.DisplayWarningToast(error.error.errors[0], null);
        }
        else { //Error
          this.DisplayErrorToast(error.error.errors[0], null)
        }
      }
      else { //Arabic
        if (error.error?.errorType == 4) { //Warning
          this.DisplayWarningToast(error.error.errors[1], null)
        }
        else { //Error
          this.DisplayErrorToast(error.error.errors[1], null)
        }
      }
    }
    else { //Internal server error
      this.DisplayErrorToast(this.langVar.modal.serverError, null);
    }
  }

  DisplaySuccessToast(message: string, position?: string) {
    // this.toastr.clear();
    // this.toastr.success(message, this.langVar.success, {
    //   disableTimeOut: false,
    //   closeButton: true,
    //   positionClass: position ? position : 'toast-top-center',
    // });
    this.messageService.add({ severity: 'success', summary: this.langVar.success, detail: message });

    if (position) {
      this.toastPosition = position;
    }
    else {
      if (this.toastPosition != 'top-center')
        this.toastPosition = 'top-center'
    }
  }

  DisplayWarningToast(message: string, position?: string) {
    // this.toastr.clear();
    // this.toastr.warning(message, this.langVar.error, {
    //   disableTimeOut: false,
    //   closeButton: true,
    //   positionClass: 'toast-top-center'
    // });

    this.messageService.add({ severity: 'warn', summary: this.langVar.error, detail: message });

    if (position) {
      this.toastPosition = position;
    }
    else {
      if (this.toastPosition != 'top-center')
        this.toastPosition = 'top-center'
    }
  }

  DisplayErrorToast(message: string, position?: string) {
    // this.toastr.error(message, this.langVar.error, {
    //   disableTimeOut: false,
    //   closeButton: true,
    //   positionClass: 'toast-top-center'
    // });
    this.messageService.clear();
    this.messageService.add({ severity: 'error', summary: this.langVar.error, detail: message });

    if (position) {
      this.toastPosition = position;
    }
    else {
      if (this.toastPosition != 'top-center')
        this.toastPosition = 'top-center'
    }
  }

  //Login success toast with progress bar

  //Confirmation Section

}
