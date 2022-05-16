import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ServicePageService } from "src/app/services/servicepage.service";
import * as moment from "moment";
import { MessageService } from "primeng/api";
// import { loadModules } from "esri-loader";
// import esri = __esri;

interface AddDetailsModel {
  id: number;
  type:string;
  property_name: string;
  usage_type: string;
  location: string;
  owner: string;
  instrument_no: number;
  total_area: number;
  building_area: number;
  rental: number;
  employees_info: number;
  employees_no: number;
  capacity: number;
  capacity_building: number;
  coordinates: string;
  notes: number;
}

interface AddAttachments {
  name: string;
  type?: string;
  description?: string;
  content: string;
}
interface Order {
  building: any;
  docs: any;
  explanation: string;
  land: any;
  ownerBuildings: any;
  special_requests: string;
  status: boolean;
  type: any;
  userDetails: any;
}
@Component({
  selector: "app-property-request",
  templateUrl: "./property-request.component.html",
  styleUrls: ["./property-request.component.scss"],
})
export class PropertyRequestComponent implements OnInit, OnDestroy {
  selectCurrentUsageType:any;
  selectedCurrentType:any;
  selectedOwnerType:any
  selectedLocation: any;
  selectedLocationNearby: any;
  selectedLocationCurrentBuilding: any;
  checked: boolean = false;
  orderData: Order;
  count: number = 0;
  countriesCode: any[] = ["+966"];
  displayModal: boolean = false;
  selectedCountryCode: any = this.countriesCode[0];
  files: any[] = [];
  overlays: any[] = [];
  overlaysNearby: any[] = [];
  overlaysCurrentBuilding: any[] = [];
  filesTypes: any[] = [
    { name: "مرفقات الاراضي" },
    { name: "مرفقات المباني" },
    { name: "مرفقات العقارات" },
    { name: "مرفقات الفضاء" },
    { name: "اخرى" },
  ];
  selectedNearByProperty: any;
  selectedCurrentBuilding: any;
  display: boolean = false;
  selectedRow: any;
  usageTypes: any[] = [
    { name: "أمني" },
    { name: "عسكري" },
    { name: "صحي" },
    { name: "صناعي" },
    { name: "تعليمي" },
    { name: "مستودعات" },
    { name: "اخرى" },
  ];
  ownTypes: any[] = [{ name: "مملوك" }, { name: "مستأجر" }];
  selectedUsageType: any;
  currentPage: number;

  Authorities: any[];

  Cities: any[];

  Districts: any[];

  PropertyTypes: any[];

  Locations: any[];

  NearbyProperties: any[];

  SelectedPropertyType: any;

  PropertyDetails: AddDetailsModel[] = [];

  AttachmentsDetails: AddAttachments[] = [];

  AddDetailsForm: FormGroup;

  PropertyRequestForm: FormGroup;

  PropertyRequestFormTwo: FormGroup;

  PropertyRequestFormThree: FormGroup;

  PropertyRequestFormFour: FormGroup;

  isLoading: boolean = false;

  RequestSubmittedSuccessfully: boolean = false;

  FailedToSubmitRequest: boolean = false;

  filteredDistricts: any[];

  SelectedEndDate;

  SelectedStartDate: Date;

  TotalNumberOfEmployees;

  AttachmentTableHeaders = ["الاسم", "الملفات الملصقة"]; //"الوصف",

  headers = [
    "اسم العقار",
    "نوع الاستخدام",
    "موقع المبني",
    "ملكية العقار",
    "رقم الصك",
  ];
  propertyDetailsHeader = [
    "اسم العقار",
    "نوع الاستخدام",
    "موقع المبني",
    "ملكية العقار",
    "رقم الصك",
    "إجمالي المساحة",
    "مساحة مسطح البناء",
    "نسبة الاشغال",
    "مبلغ الإستئجار السنوي للعقار",
    "عدد الموظفين",
    "نسبة إشغالهم",
    "الاحداثيات",
    "ملاحظات",
  ];
  options: any;
  // buildings Form
  buildingForm: FormGroup;
  // Land Form
  landForm: FormGroup;
  numRegex = /^-?\d*[.,]?\d{0}$/;
  constructor(
    private propertiesService: ServicePageService,
    private messageService: MessageService
  ) {
    this.currentPage = 0;

    this.Authorities = [
      { name: "4" },
      { name: "3" },
      { name: "2" },
      { name: "1" },
    ];

    this.Cities = [
      { index: 1, name: "جدة" },
      { index: 2, name: "الرياض" },
      { index: 3, name: "مكة" },
      { index: 4, name: "المدينة المنورة" },
      { index: 5, name: "الدمام" },
      { index: 6, name: "الطائف" },
      { index: 7, name: "بريدة" },
      { index: 8, name: "تبوك" },
      { index: 9, name: "حمص" },
      { index: 10, name: "ابها" },
      { index: 11, name: "خميس مشيط" },
      { index: 12, name: "عفيف" },
      { index: 13, name: "عرعر" },
      { index: 14, name: "أبقيق" },
      { index: 15, name: "الدرعية" },
      { index: 16, name: "ضبا" },
      { index: 17, name: "دومة الجندل" },
    ];

    this.Districts = [
      //Ryadh
      { index: 1, cityIndex: 2, name: "البطحاء" },
      { index: 2, cityIndex: 2, name: "التعاون" },
      { index: 3, cityIndex: 2, name: "الخالدية" },
      { index: 4, cityIndex: 2, name: "الخزامى" },
      { index: 5, cityIndex: 2, name: "الديرة" },
      { index: 6, cityIndex: 2, name: "الربوة" },
      { index: 7, cityIndex: 2, name: "السلام" },
      { index: 8, cityIndex: 2, name: "السليمانية" },
      { index: 9, cityIndex: 2, name: "السويدي" },

      //Mekkah
      { index: 10, cityIndex: 3, name: "أجياد" },
      { index: 11, cityIndex: 3, name: "العدل" },
      { index: 12, cityIndex: 3, name: "الأندلس" },
      { index: 13, cityIndex: 3, name: "العوالي" },
      { index: 14, cityIndex: 3, name: "العزيزية" },
      { index: 15, cityIndex: 3, name: "الفيصلية" },
      { index: 16, cityIndex: 3, name: "الحجون" },
      { index: 17, cityIndex: 3, name: "التيسير" },
      { index: 18, cityIndex: 3, name: "الهنداوية" },
      { index: 19, cityIndex: 3, name: "الحجون" },
      { index: 20, cityIndex: 3, name: "الإسكان" },
      { index: 21, cityIndex: 3, name: "الجميزة" },
      { index: 22, cityIndex: 3, name: "الكعكية" },
      { index: 23, cityIndex: 3, name: "الخالدية" },

      //Jeddah
      { index: 24, cityIndex: 1, name: "المرجان" },
      { index: 25, cityIndex: 1, name: "البساتين" },
      { index: 26, cityIndex: 1, name: "النزهة" },
      { index: 27, cityIndex: 1, name: "الحمراء" },
      { index: 28, cityIndex: 1, name: "النعيم" },
      { index: 29, cityIndex: 1, name: "البوادي" },
      { index: 30, cityIndex: 1, name: "الخالدية" },
      { index: 31, cityIndex: 1, name: "الفيصلية  " },
      { index: 32, cityIndex: 1, name: "السامر" },
      { index: 33, cityIndex: 1, name: "الرويس" },
      { index: 34, cityIndex: 1, name: "العزيزية" },
      { index: 35, cityIndex: 1, name: "العمارية" },
      { index: 36, cityIndex: 1, name: "العمارية" },
      { index: 37, cityIndex: 1, name: "البغدادية الشرقية" },
      { index: 38, cityIndex: 1, name: "البغدادية الغربية" },

      //Al Madinah Al monawarah
      { index: 39, cityIndex: 4, name: "العزيزية" },
      { index: 40, cityIndex: 4, name: "الملك فهد" },
      { index: 41, cityIndex: 4, name: "الربوة" },
      { index: 42, cityIndex: 4, name: "سيد الشهداء" },
      { index: 43, cityIndex: 4, name: "قباء" },
      { index: 44, cityIndex: 4, name: "العنابس" },

      //Dammam
      { index: 45, cityIndex: 5, name: "العنابس" },
      { index: 46, cityIndex: 5, name: "المريكبات" },
      { index: 47, cityIndex: 5, name: "الجامعيين" },
      { index: 48, cityIndex: 5, name: "النزهة" },
      { index: 49, cityIndex: 5, name: "الفردوس" },

      //Al ta'ef
      { index: 50, cityIndex: 6, name: "الوشحاء" },
      { index: 51, cityIndex: 6, name: "شهار" },
      { index: 52, cityIndex: 6, name: "الوسام" },
      { index: 53, cityIndex: 6, name: "السداد" },
      { index: 54, cityIndex: 6, name: "العزيزية" },

      //Tabook
      { index: 55, cityIndex: 8, name: "قرطبة" },
      { index: 56, cityIndex: 8, name: "الأخضر" },
      { index: 57, cityIndex: 8, name: "النزهة الصناعية" },
      { index: 58, cityIndex: 8, name: "الروضة" },
      { index: 59, cityIndex: 8, name: "المصيف" },

      //Hems
      { index: 60, cityIndex: 9, name: "الخالدية " },

      //Abha
      { index: 61, cityIndex: 10, name: "البديع" },
      { index: 62, cityIndex: 10, name: "الربوه" },
      { index: 63, cityIndex: 10, name: "شمسان" },
      { index: 64, cityIndex: 10, name: "المروج" },
      { index: 65, cityIndex: 10, name: "الضباب" },

      //Khamees Mashyat
      { index: 66, cityIndex: 11, name: "شباعة" },
      { index: 67, cityIndex: 11, name: "عتود" },
      { index: 68, cityIndex: 11, name: "السد" },
      { index: 69, cityIndex: 11, name: "المنتزه" },
      { index: 70, cityIndex: 11, name: "شكر" },
    ];

    this.Locations = [
      { name: "4" },
      { name: "3" },
      { name: "2" },
      { name: "1" },
    ];

    this.PropertyTypes = [{ name: "مبنى" }, { name: "ارض" }];

    this.NearbyProperties = [{ name: "لا" }, { name: "نعم" }];

    this.SelectedPropertyType = this.PropertyTypes[0].name;

    var emailValidationPattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.PropertyRequestForm = new FormGroup({
      authority_name: new FormControl(localStorage.getItem("accountName"), []), // Validators.required,
      property_type: new FormControl("ارض", [Validators.required]),
      representative: new FormControl(localStorage.getItem("userName"), []), //Validators.required,
      mobile: new FormControl(localStorage.getItem("phoneNumber"), [
        Validators.pattern("^([+0-9]{13})$"),
      ]), // Validators.required,
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern("^([+0-9]{9})$"),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(emailValidationPattern),
      ]),
      explanation: new FormControl("", [
        Validators.required,
        Validators.maxLength(500),
      ]),
      special_requests: new FormControl("", [Validators.required]),
    });

    this.PropertyRequestFormThree = new FormGroup({
      type: new FormControl("", [Validators.required]),
      property_name: new FormControl("", [Validators.required]),
      usage_type: new FormControl("", [Validators.required]),
      location: new FormControl("", [Validators.required]),
      owner: new FormControl("", [Validators.required]),
      instrument_no: new FormControl("", [Validators.required]),
      total_area: new FormControl(""),
      building_area: new FormControl("", [Validators.required]),
      rental: new FormControl("", [Validators.required]),
      employees_no: new FormControl("", [
        Validators.required,
        Validators.pattern(this.numRegex),
      ]),
      employees_info: new FormControl("", [Validators.required]),
      capacity: new FormControl("", [Validators.required]),
      capacity_building: new FormControl("", [Validators.required]),
      coordinates: new FormControl(""),
      notes: new FormControl("", [Validators.required]),
    });

    this.PropertyRequestFormFour = new FormGroup({
      // name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    });

    this.AddDetailsForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
    });
  }
  // @ViewChild("mapViewNode", { static: true }) myDiv: ElementRef;
  get PropertyRequestFormControls() {
    return this.PropertyRequestForm.controls;
  }

  get PropertyRequestFormTwoControls() {
    return this.PropertyRequestFormTwo.controls;
  }

  get PropertyRequestFormThreeControls() {
    return this.PropertyRequestFormThree.controls;
  }
  get PropertyRequestFormFourControls() {
    return this.PropertyRequestFormFour.controls;
  }

  ngOnInit(): void {
    // Building Form Creation
    this.buildingForm = new FormGroup({
      property_type: new FormControl("مبنى", [Validators.required]),
      explanation: new FormControl("", [
        Validators.required,
        Validators.maxLength(500),
      ]),
      special_requests: new FormControl(""),
      location: new FormControl("", [Validators.required]),
      Branch_Manager: new FormControl("", [Validators.required]),
      Supervisor_Jobs: new FormControl("", [
        Validators.required,
        Validators.pattern(this.numRegex),
      ]),
      Emp_Office: new FormControl("", [
        Validators.required,
        Validators.pattern(this.numRegex),
      ]),
      Emp_Nooffice: new FormControl("", [
        Validators.required,
        Validators.pattern(this.numRegex),
      ]),
      Expected_Jobs: new FormControl("", [
        Validators.required,
        Validators.pattern(this.numRegex),
      ]),
      Total_Employee: new FormControl("", [Validators.required]),
      Visitor_Avg: new FormControl("", [Validators.required]),
      Main_Building: new FormControl("", [Validators.required,Validators.pattern(this.numRegex)]),
      Building_Service: new FormControl("", [Validators.required,Validators.pattern(this.numRegex)]),
      Building_Store: new FormControl("", [Validators.required,]),
      Security_Building: new FormControl("", [Validators.required,Validators.pattern(this.numRegex)]),
      Electric_room: new FormControl("", [Validators.required,Validators.pattern(this.numRegex)]),
      Parking: new FormControl("", [Validators.required,Validators.pattern(this.numRegex)]),
    });
    // Land Form Creation
    this.landForm = new FormGroup({
      property_type: new FormControl("مبنى", [Validators.required]),
      explanation: new FormControl("", [
        Validators.required,
        Validators.maxLength(500),
      ]),
      special_requests: new FormControl(""),
      location: new FormControl("",[Validators.required]), //required
      space: new FormControl(""),
      coordinates: new FormControl(""),
      buildings_num: new FormControl("", [Validators.required]),
      flats_buildings: new FormControl("", [Validators.required]),
      workers_no: new FormControl("", [Validators.required]),
      project_info: new FormControl("", [Validators.required]),
      project_name: new FormControl("", [Validators.required]),
      project_budget: new FormControl("", [Validators.required]),
      amount_approved: new FormControl("", [Validators.required]),
      project_start_date: new FormControl("", [Validators.required]),
      project_end_date: new FormControl("", [Validators.required]),
      usage_type: new FormControl("", [Validators.required]),
    });

    this.options = {
      center: { lat: 24.774265, lng: 46.738586 },
      zoom: 6,
    };
    this.UpdateForm();
  }

  UpdateEmployeesTotal() {
    this.PropertyRequestFormTwo.controls["Total_Employee"].setValue(
      Number(this.PropertyRequestFormTwo.value.Expected_Jobs) +
        Number(this.PropertyRequestFormTwo.value.Emp_Nooffice) +
        Number(this.PropertyRequestFormTwo.value.Emp_Office) +
        Number(this.PropertyRequestFormTwo.value.Supervisor_Jobs)
    );

    console.log(this.PropertyRequestFormTwo.value.Total_Employee);
  }

  UpdateEndDate(event) {
    console.log(this.PropertyRequestFormTwo);
    this.SelectedEndDate = event;

    if (this.SelectedEndDate < this.SelectedStartDate) {
      console.log("End date less than start date !");
    }
  }

  UpdateStartDate(event) {
    this.SelectedStartDate = event;

    this.SelectedEndDate = this.SelectedStartDate;
  }

  changeTab(tab) {}

  UpdateForm() {
    console.log("Form Updated !");

    if (this.SelectedPropertyType == "ارض") {
      this.PropertyRequestFormTwo = this.landForm;
    } else if (this.SelectedPropertyType == "مبنى") {
      this.PropertyRequestFormTwo = this.buildingForm;
    }
    this.overlays = [];
  }

  NextPage() {
    console.log(this.RequestSubmittedSuccessfully);
    console.log("current page", this.currentPage);

    this.currentPage = this.currentPage === 3 ? 3 : this.currentPage + 1;

    //Scroll to top
    const element = document.querySelector("#scrollElement");
    element.scrollIntoView();

    console.log(this.SelectedPropertyType);
    if (this.currentPage == 3) {
      let land = {
        location: this.PropertyRequestFormTwo.value.location,
        space: this.PropertyRequestFormTwo.value.space,
        coordinates: this.PropertyRequestFormTwo.value.coordinates,
        buildings_num: this.PropertyRequestFormTwo.value.buildings_num,
        flats_buildings: this.PropertyRequestFormTwo.value.flats_buildings,
        workers_no: this.PropertyRequestFormTwo.value.workers_no,
        project_info: this.PropertyRequestFormTwo.value.project_info,
        project_name: this.PropertyRequestFormTwo.value.project_name,
        project_budget: this.PropertyRequestFormTwo.value.project_budget,
        amount_approved: this.PropertyRequestFormTwo.value.amount_approved,
        projct_start_date: moment(
          this.PropertyRequestFormTwo.value.project_start_date
        ).format("YYYY-MM-DD"),
        projct_end_date: moment(
          this.PropertyRequestFormTwo.value.project_end_date
        ).format("YYYY-MM-DD"),
        usage_type: this.PropertyRequestFormTwo.value.usage_type,
      };
      let build = {
        location: this.PropertyRequestFormTwo.value.location,
        branch_manager: this.PropertyRequestFormTwo.value.Branch_Manager,
        supervisory_jobss: this.PropertyRequestFormTwo.value.Supervisor_Jobs,
        office_emp_num: this.PropertyRequestFormTwo.value.Emp_Office,
        w_office_emp_num: this.PropertyRequestFormTwo.value.Emp_Nooffice,
        expected_jobs: this.PropertyRequestFormTwo.value.Expected_Jobs,
        total_num: this.PropertyRequestFormTwo.value.Total_Employee,
        visitors: this.PropertyRequestFormTwo.value.visitors,
        average_visitors: this.PropertyRequestFormTwo.value.Visitor_Avg,
        blank_num: this.PropertyRequestFormTwo.value.blank_num,
        main_building: this.PropertyRequestFormTwo.value.Main_Building,
        service_building: this.PropertyRequestFormTwo.value.Building_Service,
        store_building: this.PropertyRequestFormTwo.value.Building_Store,
        guard_building: this.PropertyRequestFormTwo.value.Security_Building,
        electric_building: this.PropertyRequestFormTwo.value.Electric_room,
        situations: this.PropertyRequestFormTwo.value.Parking,
      };
      this.orderData = {
        building: this.SelectedPropertyType != "ارض" ? build : null,
        docs: this.AttachmentsDetails,
        explanation: this.PropertyRequestFormTwo.value.explanation,
        land: this.SelectedPropertyType == "ارض" ? land : null,
        ownerBuildings: this.PropertyDetails,
        special_requests: this.PropertyRequestFormTwo.value.special_requests,
        status: this.SelectedPropertyType == "ارض" ? true : false,
        type: this.SelectedPropertyType,
        userDetails: {
          userId: localStorage.getItem("userID"),
          userName: localStorage.getItem("userName"),
          accountId: localStorage.getItem("accountID"),
          accountName: localStorage.getItem("accountName"),
        },
      };
      console.log("data", this.orderData);
    }
  }

  PreviousPage() {
    this.PropertyRequestFormThree.reset();

    this.currentPage = this.currentPage - 1;
    //Scroll to top
    const element = document.querySelector("#scrollElement");
    element.scrollIntoView();
    window.scroll(0, 0);
    console.log(this.currentPage);
  }

  attachmentsList: any[] = [];
  attachment_file: any[] = [];
  attachment_type: any[] = [];

  onUpload(event) {
    console.log(event.target.files);
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let fileSize = parseInt((file.size / (1024 * 1024)).toFixed(2));

        if(file.type=="application/pdf"){
          if (fileSize <= 5  ) {
            var base64data = (<string>reader.result).split("base64,")[1];
            this.files.push({ file: base64data, name: file.name });
            this.messageService.add({
              severity: "success",
              summary: "تم ادراك الملف",
            });
          } else {
            this.files = [];
            this.messageService.add({
              severity: "error",
              summary: "حجم الملف اكتر من 5 ميجا ",
            });
          }
        }else{
          this.files = [];
            this.messageService.add({
              severity: "error",
              summary: "إختار نوع الملف pdf ",
            });
        }

      };
    }
  }

  AddAttachmentsDetails() {
    let checkArray = [];
    console.log(this.files)
    for (let i = 0; i < this.files?.length; i++) {
      const addAttachmentsDetal = {
        name: this.files[i].name,
        description: this.PropertyRequestFormFour.value.description,
        content: this.files[i].file,
      };
      console.log(this.PropertyRequestFormFour.value.description);
      checkArray = this.AttachmentsDetails.filter((obj: any) => {
        return (
          obj.description == this.PropertyRequestFormFour.value.description &&
          obj.description != "اخرى"
        );
      });
      console.log(checkArray);
      if (checkArray.length == 0) {
        this.AttachmentsDetails.push(addAttachmentsDetal);
      } else {
        this.messageService.add({
          severity: "error",
          summary: "تم اختيار نوع المرفق من قبل ",
        });
      }
    }
    console.log("attachment details ", this.AttachmentsDetails);
    // this.AttachmentsDetails.push(addAttachmentsDetal);
    //reset form and upload model
    this.PropertyRequestFormFour.reset();
    this.files = [];
  }

  AddPropertyRequestDetails() {
    console.log(this.PropertyRequestFormThree);
    // this.currentPage = this.currentPage + 1;
    this.count = this.count + 1;
    const addDetailsModel = {
      id: this.count,
      type:this.PropertyRequestFormThree.value.type,
      property_name: this.PropertyRequestFormThree.value.property_name,
      usage_type: this.PropertyRequestFormThree.value.usage_type,
      location: this.PropertyRequestFormThree.value.location,
      owner: this.PropertyRequestFormThree.value.owner,
      instrument_no: this.PropertyRequestFormThree.value.instrument_no,
      total_area: this.PropertyRequestFormThree.value.total_area,
      building_area: this.PropertyRequestFormThree.value.building_area,
      rental: this.PropertyRequestFormThree.value.rental,
      employees_info: this.PropertyRequestFormThree.value.employees_info,
      employees_no: this.PropertyRequestFormThree.value.employees_no,
      capacity: this.PropertyRequestFormThree.value.capacity,
      capacity_building: this.PropertyRequestFormThree.value.capacity,
      coordinates: this.PropertyRequestFormThree.value.coordinates,
      notes: this.PropertyRequestFormThree.value.notes,
    };

    this.PropertyDetails.push(addDetailsModel);

    console.log("test", this.PropertyDetails);

    this.PropertyRequestFormThree.reset();
  }

  LogRequestFormControls() {
    console.log("Form Controls :");
    console.log(this.PropertyRequestFormControls);
  }

  SubmitPropertyRequest() {
    this.isLoading = true;
    this.propertiesService.SubmitPropertyRequest(this.orderData).subscribe(
      (res) => {
        console.log(res);
        this.displayModal = true;
        this.isLoading = false;

        this.RequestSubmittedSuccessfully = true;

        this.FailedToSubmitRequest = false;
      },
      (error) => {
        this.displayModal = true;
        console.log(error);
        this.isLoading = false;

        this.FailedToSubmitRequest = true;
      }
    );
  }

  previewFile(file) {
    console.log("base64," + file.type + ";" + file.content);

    var newWindow = window.open("");
    newWindow.document.write(
      "<iframe width='100%' height='100%' style='overflow-y: hidden' src = '" +
        "data:" +
        file.type +
        ";base64," +
        file.content +
        "' frameborder='0' allowfullscreen > </iframe>"
    );
    newWindow.document.title = file.name;
  }

  downloadFile(file) {
    const downloadLink = document.createElement("a");
    const fileName = file.name;
    downloadLink.href = "data:" + file.type + ";base64," + file.content;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  FilterDistricts(event) {
    console.log(event);
    var selectedCity = this.Cities.find((t) => t.name == event);
    console.log(selectedCity);

    this.filteredDistricts = this.Districts.filter(
      (t) => t.cityIndex == selectedCity.index
    );

    console.log(this.filteredDistricts);
  }

  selectCountryCode(event: any) {
    this.selectedCountryCode = event;
  }
  getForm() {
    console.log("fourth form", this.PropertyRequestFormThree);
    console.log(this.files);
    console.log(this.AttachmentsDetails);
  }
  openModal(data: any) {
    this.display = true;
    this.selectedRow = data;
  }
  deleteRow(row) {
    let index = this.PropertyDetails.findIndex((obj) => {
      return obj.id === row.id;
    });
    this.PropertyDetails.splice(index, 1);
  }
  onDragOver(event) {
    event.preventDefault();
  }

  // From drag and drop
  onDropSuccess(event) {
    event.preventDefault();
    console.log(event);
    this.onUpload(event);
  }
  resetForm() {
    this.PropertyRequestFormFour.reset();
    this.files = [];
  }
  removeAttachment(file: any) {
    let index = this.AttachmentsDetails.findIndex((obj) => {
      return obj.description === file.description;
    });
    this.AttachmentsDetails.splice(index, 1);
  }
  handleMapClick(event: any, type?: string) {
    if (type == "nearby") {
      this.overlaysNearby = [];
      this.selectedLocationNearby = event.latLng;
      this.getLocationByLatlng(this.selectedLocationNearby)
      this.landForm.patchValue({
        project_info:
          this.selectedLocationNearby?.lat() + ','+
          this.selectedLocationNearby?.lng(),
      });

      this.overlaysNearby.push(
        new google.maps.Marker({
          position: {
            lat: this.selectedLocationNearby?.lat(),
            lng: this.selectedLocationNearby?.lng(),
          },
          title: "location",
          draggable: true,
        })
      );
    }else if(type=='building'){
      this.overlaysCurrentBuilding = [];
      this.selectedLocationCurrentBuilding = event.latLng;
      this.getLocationByLatlng(this.selectedLocationCurrentBuilding)

      this.PropertyRequestFormThree.patchValue({
        location:
          this.selectedLocationCurrentBuilding?.lat() + ','+
          this.selectedLocationCurrentBuilding?.lng(),
          coordinates:this.selectedLocationCurrentBuilding?.lat() + ','+
          this.selectedLocationCurrentBuilding?.lng(),

      });

      this.overlaysCurrentBuilding.push(
        new google.maps.Marker({
          position: {
            lat: this.selectedLocationCurrentBuilding?.lat(),
            lng: this.selectedLocationCurrentBuilding?.lng(),
          },
          title: "location",
          draggable: true,
        })
      );
    } else {
      this.overlays = [];
      this.selectedLocation = event.latLng;
      this.getLocationByLatlng(this.selectedLocation)
      this.buildingForm.patchValue({
        location: this.selectedLocation?.lat() + ','+ this.selectedLocation?.lng(),
      });
      this.landForm.patchValue({
        location: this.selectedLocation?.lat() + ','+ this.selectedLocation?.lng(),
        coordinates:
          this.selectedLocation?.lat() + ','+ this.selectedLocation?.lng(),
      });
      this.overlays.push(
        new google.maps.Marker({
          position: {
            lat: this.selectedLocation?.lat(),
            lng: this.selectedLocation?.lng(),
          },
          title: "location",
          draggable: true,
        })
      );
    }
  }
  getLocationByLatlng(latlng:any){
    let geoCoder = new google.maps.Geocoder;
    geoCoder.geocode({ location: latlng },(result,status)=>{
      if (status === 'OK') {
        console.log('location result',result)
        // this.position = {
        //   "lat": results[0].geometry.location.lat(),
        //   "lng": results[0].geometry.location.lng()
        // }
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    })
    // .then((response) => {
    //   if (response.results[0]) {
    //     map.setZoom(11);

    //     const marker = new google.maps.Marker({
    //       position: latlng,
    //       map: map,
    //     });

    //     infowindow.setContent(response.results[0].formatted_address);
    //     infowindow.open(map, marker);
    //   } else {
    //     window.alert("No results found");
    //   }
    // })
    // .catch((e) => window.alert("Geocoder failed due to: " + e));

  }
  setRentalValue(){
    this.PropertyRequestFormThree.patchValue({
      rental:(this.selectedOwnerType=='مملوك')?0:this.PropertyRequestFormThree.value.rental
    })
  }
  changeCurrentType(){
    if(this.selectedCurrentType=='ارض'){
      this.PropertyRequestFormThree.patchValue({
        capacity_building:0
      })
    }
  }
  ngOnDestroy(): void {}
}
