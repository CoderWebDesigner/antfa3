import { Injectable } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class FormBuilderHelper {

  controllers;
  emailValidationPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private formBuilder: FormBuilder) {

    this.controllers = {
      name: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")],//arabic & english letters
      firstName: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")],//arabic & english letters
      lastName: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")],//arabic & english letters
      fullName: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")], //arabic & english letters
      displayName: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")], //arabic & english letters
      company: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")], //arabic & english letters
      title: [Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")], //arabic & english letters
      unit: [Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")], //arabic & english letters
      email: [Validators.required, Validators.pattern(this.emailValidationPattern)],
      loginIdentifier: [Validators.required, Validators.maxLength(9),Validators.pattern("^[0-9]*$")],
      calendar: [Validators.required],
      dateOfBirth: [""],
      age: [Validators.required],
      requiredTitle: [""],
      Party: [""],
      type: [Validators.required],
      note: [Validators.required],
      option: [Validators.required],
      file: [Validators.required],
      ruleName: [Validators.required],
      editName: [Validators.required, Validators.min(1), Validators.max(50), Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")], //arabic & english letters
      editDescription: [Validators.required],
      address: [Validators.required],
      subject: [Validators.required],
      body: [Validators.required],
      image: [Validators.required],
      percentage: [Validators.required, Validators.maxLength(3), Validators.pattern("^[0-9]{1,}[.]{0,1}[0-9]*$")],
      userName: [Validators.required], // Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$")// deprecated
      newPassword: [Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")],
      // password: [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")],
      password: [Validators.required],
      description: [Validators.required, Validators.maxLength(200)],
      code: [Validators.minLength(5), Validators.maxLength(5)],
      orgUnitId: [Validators.required],
      currency: [Validators.required],
      managerId: [Validators.required],
      isPurchasing: [Validators.required],
      companyCodeId: [Validators.required],
      reCaptcha: [Validators.required],
      confirmPassword: [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")],

      //general
      ENValidation: [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.max(40)],
      ARValidation: [Validators.required, Validators.pattern('^[\u0600-\u06ff ]+$'), Validators.max(40)],
      nameEN: [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.max(40)],
      nameAR: [Validators.required, Validators.pattern('^[\u0600-\u06ff ]+$'), Validators.max(40)],
      descriptionEN: [Validators.required, Validators.maxLength(200), Validators.pattern('[a-zA-Z ]*')],
      descriptionAR: [Validators.required, Validators.maxLength(200), Validators.pattern('^[\u0600-\u06ff ]+$')],
      hiringDate: [Validators.required],
      startDate: [Validators.required],
      area: [Validators.required],
      governance: [Validators.required],
      phoneNumber: [Validators.required, Validators.pattern("^([0]{1}?[1]{1}?[0-2-5]{1}?[0-9]{8})$")], //, Validators.pattern("^([0]{1}?[1]{1}?[0-2-5]{1}?[0-9]{8})$")
      homeNumber: [Validators.required, Validators.pattern("^([0]{1}?[1]{1}?[0-2-5]{1}?[0-9]{8})$")], //, Validators.pattern("^([0]{1}?[1]{1}?[0-2-5]{1}?[0-9]{8})$")
      otherPhoneNumber: [Validators.pattern("^([0]{1}?[1]{1}?[0-2-5]{1}?[0-9]{8})$")],
      secondaryContact: [Validators.pattern("^([0]{1}?[1]{1}?[0-2-5]{1}?[0-9]{8})$")],
      gender: [Validators.required],
      abbreviation: [Validators.required, Validators.maxLength(10), Validators.minLength(1)],

      //Address
      country: [Validators.required],
      governorate: [Validators.required],
      district: [Validators.required],
      street: [Validators.required],
      building: [Validators.required],
      other_info: [],

      //Create general data detail
      attachment: [Validators.required],
      //chat
      chatInput: [Validators.required, Validators.pattern("^[a-zA-Z\u0600-\u06ff0-9\u0660\u0669\\)\\(_=~`!@#\$%^&*+\"'}{\\]\\[;:?><,.\\\\/\|\-][a-zA-Z\u0600-\u06ff0-9\u0660\u0669\\)\\(_=~`!@#\$%^&*+\"'}{\\]\\[;:?><,.\\\\/\|\-\\s]*$")],

      visitDate: [Validators.required],
    }
  }

  CreateFormBuilder(controllerNames) {
    for (let entry of Object.entries(controllerNames)) {
      if (this.controllers[entry[0]][0] != '') {
        let x = [entry[1], this.controllers[entry[0]]]
        controllerNames[entry[0]] = x
      }
      else controllerNames[entry[0]] = [""]

    }
    return (this.formBuilder.group(controllerNames))
  }

  CustomizeFormbuilderValidator(controllerNames, customValidation) {
    for (let entry of Object.entries(controllerNames)) {

      let x = [entry[1], this.controllers[entry[0]]]
      entry[1] = x;
    }
    return (this.formBuilder.group(controllerNames, { validator: customValidation }))
  }

}
