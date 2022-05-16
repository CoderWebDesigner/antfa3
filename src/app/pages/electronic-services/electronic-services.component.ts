import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePageService } from 'src/app/services/servicepage.service';

@Component({
  selector: 'app-electronic-services',
  templateUrl: './electronic-services.component.html',
  styleUrls: ['./electronic-services.component.scss']
})
export class ElectronicServicesComponent implements OnInit {


  services;

  constructor(private router: Router,private servicePageService:ServicePageService) { }


  ViewService(serviceID) {
    this.router.navigate(['/service/' + serviceID])
  }

  ngOnInit(): void {
    // this.getServices()
    this.services = [
      {
        header: "أحدث الخدمات",
        items: [
          {
            id: 500,
            icon: "./assets/images/icons/services/icon1.png",
            name: "طلب عقار",
            description: "تتيح هذه الخدمة للجهات الحكومية التقدم بطلب عقار يلبى احتياجها الفعلي وفق الحلول العقارية المتاحة بالهيئة"

          },

          {
            id: 564,
            icon: "./assets/images/icons/services/icon1.png",
            name: "إبداء رغبات المستثمرين",
            description:
              " تتيح هذه الخدمة للمستثمر التسجيل عبرالمنصة لإبداء الرغبات على الفرص الإستثمارية المطروحة من قبل الهيئة.."
          },
          {
            id: 565,
            icon: "./assets/images/icons/services/icon1.png",
            name: "طلب مشاركة في مزايدة علنية",
            description:
              "تتيح هذه الخدمة للمستثمر طلب المشاركة في المزايدة العلنية للفرص الإستثمارية التي تم طرحها من قبل الهيئة"
          },
          {
            id: 519,
            icon: "./assets/images/icons/services/icon1.png",
            name: "تغيير إسم مستثمر",
            description:
              "تتيح هذه الخدمة للمستثمر طلب تغيير إسم من خلال خدمات منصة انتفاع"
          },
          {
            id: 527,
            icon: "./assets/images/icons/services/icon1.png",
            name: "طلب الموافقة على التأجير بالباطن",
            description:
              "تتيح هذه الخدمة للمستثمر طلب الموافقة على التأجير بالباطن من خلال خدمات منصة انتفاع"
          },
          {
            id: 559,
            icon: "./assets/images/icons/services/icon1.png",
            name: "طلب إعادة تقييم",
            description:
              "تتيح هذه الخدمة للمواطنيين بتقديم طلب إعادة تقييم عقار يقع ضمن نطاق مشروع  تشرف على نزع ملكيته الهيئة"
          },
          {
            id: 4,
            icon: "./assets/images/icons/services/icon1.png",
            name: "طلب استغناء",
            description:
              "تتيح هذه الخدمة للجهة الحكومية المنتفعة من عقار بالاستغناء عنه في حال عدم الحاجة اليه"
          },
          {
            id: 4,
            icon: "./assets/images/icons/services/icon1.png",
            name: "طلب الإفصاح عن الخطط المستقبلية للجهات الحكومية",
            description:
              "تتيح هذه الخدمة"
          },
        ],
      },
      {
        header: "الأكثر استخداماً",
        items: [
          {
            id: 1,
            icon: "./assets/images/icons/services/icon1.png",
            name: "طلب فرصة استئجارية",
            description:
              "تيح هذه الخدمة لملاك العقارات الاطلاع على الفرص الاستئجاريه المطروحة بواسطة الهيئة لتلبية احتياج الجهات الحكومية مع إمكانية"
          },
          {
            id: 2,
            icon: "./assets/images/icons/services/icon2.png",
            name: "طلب تأهيل مستثمر",
            description:
              "تتيح هذه الخدمة للمستثمرين التقدم بطلب التأهيل على أحد الفرص الإستثمارية المطروحة "
          },
          {
            id: 3,
            icon: "./assets/images/icons/services/icon3.png",
            name: "طلب تجديد عقد",
            description:
              "تتيح هذه الخدمة للمستثمر تجديد عقد التأجير أو الإستثمار في حال انتهاء العقد الحالي"
          },
          {
            id: 4,
            icon: "./assets/images/icons/services/icon1.png",
            name: "طلب أجرة مثل",
            description:
              "تتيح هذه الخدمة للمواطنين بتقديم طلب  أجرة مثل عن عقار تم نزع ملكيته لصالح الهيئة"
          },
          {
            id: 5,
            icon: "./assets/images/icons/services/icon1.png",
            name: "طلب تعويض",
            description:
              "تتيح هذه الخدمة للمواطنين تقديم طلب تعويض عن ضرر وقع على عقاره بسبب تنفيذ مشروع ضمن مشاريع الهيئة"
          },
          {
            id: 5,
            icon: "./assets/images/icons/services/icon1.png",
            name: "إدارة مستخدمي الجهات الحكومية",
            description:
              "تتيح هذه الخدمة للجهة الحكومية إدارة صلاحيات المستخدمين عبر المنصة",
          },
        ],
      },
      {
        header: "خدمات الفرص الإستثمارية",
        items: [
          {
            id: 1,
            icon: "./assets/images/icons/services/icon1.png",
            name: "طلب فرصة استئجارية",
            description:
              "تيح هذه الخدمة لملاك العقارات الاطلاع على الفرص الاستئجاريه المطروحة بواسطة الهيئة لتلبية احتياج الجهات الحكومية مع إمكانية"
          },
          {
            id: 2,
            icon: "./assets/images/icons/services/icon2.png",
            name: "طلب فرصة تأجير مؤقت",
            description:
              "تتيح هذه الخدمة للمستثمرين من أفراد أو شركات خاصة بتقديم طلبات لاستئجار عقار من الهيئة لإقامة فعاليات مؤقتة"
          },
          {
            id: 511,
            icon: "./assets/images/icons/services/icon3.png",
            name: "طلب تجديد عقد",
            description:
              "تتيح هذه الخدمة للهيئة أو المستثمر طلب تجديد عقد التأجير أو الإستثمار في حال انتهاء العقد الحالي"
          },
          {
            id: 515,
            icon: "./assets/images/icons/services/icon1.png",
            name: "طلب إلغاء عقد",
            description:
              "تتيح هذه الخدمة للمستثمر طلب إلغاء عقد التأجير أو الإستثمار في حال"
          },
          {
            id: 523,
            icon: "./assets/images/icons/services/icon1.png",
            name: "طلب تنازل عن عقد",
            description:
              "تتيح هذه الخدمة للمستثمر طلب تنازل عن عقد التأجير أو الإستثمار"

          },
        ],
      },
      {
        header: "اخرى",
        items: [
          {
            id: 1,
            icon: "./assets/images/icons/services/icon1.png",
            name: "التخطيط المستقبلي للاحتياج العقاري",
            description:
              "تتيح هذه الخدمة للجهات الحكومية التخطيط المستقبلي لاحتياجها الفعلي من العقارات مما يمكن الجهة من رسم استراتيجيتها"
          },
          {
            id: 2,
            icon: "./assets/images/icons/services/icon2.png",
            name: "إدارة مستخدمي الجهات الحكومية",
            description:
              "تتيح هذه الخدمة للجهة الحكومية إدارة صلاحيات المستخدمين عبر المنصة"
          },
          {
            id: 3,
            icon: "./assets/images/icons/services/icon3.png",
            name: "إدارة مستخدمي القطاع الخاص",
            description:
              "تتيح هذه الخدمة للشركات الخاصة إدارة صلاحيات المستخدمين عبر المنصة"
          },
          {
            id: 4,
            icon: "./assets/images/icons/services/icon1.png",
            name: "إدارة مستخدمي الافراد",
            description:
              "تتيح هذه الخدمة للأفراد إدارة صلاحيات المستخدمين عبر المنصة"
          },
          {
            id: 5,
            icon: "./assets/images/icons/services/icon1.png",
            name: "طلب إفراغ عقار",
            description:
              "تتيح هذه الخدمة للجهة الحكومية إنشاء طلب إفراغ عقار منزوع الملكية للمنفعة العامة وإصدار صك لصالح الدولة مقابل العقار المنزوع"
          },
          // {
          //   id: 5,
          //   icon: "./assets/images/icons/services/icon1.png",
          //   name: "طلب نقل ملكية",
          //   description:
          //     "",
          // },
          // {
          //   id: 5,
          //   icon: "./assets/images/icons/services/icon1.png",
          //   name: "طلب إصدار صك",
          //   description:
          //     "تتيح هذه الخدمة للجهات الحكومية بطلب اصدار صك لعقار الدولة"
          // },
          // {
          //   id: 5,
          //   icon: "./assets/images/icons/services/icon1.png",
          //   name: "طلب تغيير بيانات صك",
          //   description:
          //     "تتيح هذه الخدمة للجهات الحكومية بطلب تعديل بيانات الصك"
          // },
          // {
          //   id: 5,
          //   icon: "./assets/images/icons/services/icon1.png",
          //   name: "إدارة مستخدمي الشركات",
          //   description:
          //     "تتيح هذه الخدمة"
          // },
          // {
          //   id: 5,
          //   icon: "./assets/images/icons/services/icon1.png",
          //   name: "إدارة مستخدمي الافراد",
          //   description:
          //     "تتيح هذه الخدمة"
          // },
          // {
          //   id: 5,
          //   icon: "./assets/images/icons/services/icon1.png",
          //   name: "الموافقة على تجديد استئجار",
          //   description:
          //     "تتيح هذه الخدمة للمستفيد من عقار الدولة طلب تمديد مدة الاستئجار  على العقار الحالي"
          // },
        ],
      },
    ];


  }
  getServices(){
    this.servicePageService.getAllServices().subscribe((result:any)=>{
      console.log(result)
      this.services = result
    })
  }
}
