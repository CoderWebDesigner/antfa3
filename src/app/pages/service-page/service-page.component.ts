import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { MessageService } from "primeng/api";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { ServicePageService } from "src/app/services/servicepage.service";

@Component({
  selector: "app-service-page",
  templateUrl: "./service-page.component.html",
  styleUrls: ["./service-page.component.scss"],
})
export class ServicePageComponent implements OnInit {
  customOptions: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    // margin:20,
    autoplay: true,
    autoplaySpeed: 500,
    autoplayHoverPause: true,
    navText: [
      '<i class="pi pi-angle-left"></i>',
      '<i class="pi pi-angle-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 2,
      },
      940: {
        items: 2
      }
    },
    nav: true,
  };
  service;
  serviceID;

  journeyItems;
  relatedServices;
  responsiveOptions;

  isLoggedIn: boolean = false;

  constructor(
    private servicePageService: ServicePageService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.isLoggedIn = authService.isAuthenticated();

    // this.isLoggedIn = true; //Test
  }

  NavigateToPropertyRequest() {
    if (this.isLoggedIn) {
      this.router.navigate(["/property-request"]);
    } else {
      this.messageService.add({
        severity: "error",
        summary: "خطأ",
        detail: `يرجى تسجيل الدخول لاستخدام هذه الخدمة`,
      });
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const ID = parseInt(params.id);

      this.serviceID = ID;
      console.log("Service ID: ", this.serviceID);

      this.getService();
    });

    this.journeyItems = [
      {
        id: 502,
        serviceeDto: null,
        title: "تحديد العقار المناسب",
        desc: "تقوم الهيئة بعد دراسة الاحتياج بتحديد العقار المناسب للجهة الحكومية المستفيدة",
      },
      {
        id: 503,
        serviceeDto: null,
        title: "دراسة الاحتياج من قبل الهيئة",
        desc: "تقوم الهيئة بعد التأكد من اكتمال الطلب بدراسة احتياج الجهة الحكومية المستفيدة",
      },
      {
        id: 505,
        serviceeDto: null,
        title: "تعديل منفعة الصك",
        desc: "تقوم الهيئة بتعديل منفعة الصك لصالح الجهة المستفيدة",
      },
      {
        id: 506,
        serviceeDto: null,
        title: "إنهاء الطلب",
        desc: "",
      },
      {
        id: 501,
        serviceeDto: null,
        title: "تقديم الطلب عن طريق الجهة المستفيدة",
        desc: "تقوم الجهة الحكومية المستفيدة بتقديم طلب عقار بالمواصفات التي تلبي احتياجها",
      },
      {
        id: 504,
        serviceeDto: null,
        title: "تسليم العقار للجهة المستفيدة",
        desc: "تقوم اللجنة الفنية التابعة للهيئة بزيارة الموقع مع الجهة المستفيدة لتسليم العقار",
      },
    ];

    this.relatedServices = [
      // {
      //   id: 500,
      //   icon: "./assets/images/icons/services/icon1.png",
      //   name: "طلب عقار",
      //   description:
      //     "تتيح هذه الخدمة للجهات الحكومية التقدم بطلب عقار يلبي إحتياجها الفعلي الحالي وفق الحلول العقارية المتاحة بالهيئة",
      // },
      // {
      //   id: 564,
      //   icon: "./assets/images/icons/services/icon1.png",
      //   name: "إبداء رغبات المستثمرين",
      //   description:
      //     "خدمة تتيح للمستثمر  التسجيل عبر المنصة لإبداء الرغبات على الفرص الإستثمارية المقدمة بواسطة الهيئة ",
      // },
      // {
      //   id: 519,
      //   icon: "./assets/images/icons/services/icon1.png",
      //   name: "تغيير اسم مستثمر",
      //   description:
      //     "تتيح هذه الخدمة للمستثمر طلب تغيير اسم من خلال منصة انتفاع",
      // },
    ];

    this.responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: "767px",
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.getServices()
    console.log(this.orderSteps(this.journeyItems));
  }
  orderSteps(steps) {
    console.log();
    return steps.sort(function (a, b) {
      return a.id - b.id || a.name.localeCompare(b.name);
    });
  }
  getService() {
    this.servicePageService.getServiceViaID(this.serviceID).subscribe(
      (res) => {
        console.log(res);
        this.service = res;
        console.log(this.service);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getServices(){
    this.servicePageService.getAllServices().subscribe((result:any)=>{
      this.relatedServices = result
    })
  }
}
