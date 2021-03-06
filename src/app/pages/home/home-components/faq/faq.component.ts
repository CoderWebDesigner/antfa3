import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  items;
  responsiveOptions;
  constructor() {
    //Carousel responsive options
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.items = [
      {
        id: 1, title: 'ماهي معايير تقييم العقار المنزوع؟', description: 'يعتمد ممثلي الهيئة المشاركين في لجان التقدير على معايير التقييم الدولية 2020 المتوافقة مع معايير الهيئة السعودية للمقيمين المعتمدين ومجلس معايير التقييم الدولية (IVSC) ومن هذه المعايير: الغرض من التقييم وطبيعة العقار المراد تقييمه وأساس القيمة والموضوعية والبحث والاستقصاء والاختصاص والكفاءة، ويتم التقييم بأساليب وطرق التقييم المعتمدة ومنها: أسلوب السوق (طريقة المقارنة) أسلوب الدخل (طريقة للإستثمار ، طريقة التدفقات النقدية المخصومة، طريقة القيمة المتبقية، طريقة الأرباح) وأسلوب التكلفة (طريقة المقاول).'
      },
      {
        id: 2, title: 'كيف يتم تقييم المواقع الخاضعة   للإستثمار', description: 'يتم تقييم المواقع الخاضعة  للاستثمار بعد تحليل السوق وتحديد السعر من خلال التفاعل بين العرض والطلب   ويتم الإعتماد  على أسلوب الدخل (طريقة للإستثمار) بحيث يتم تقدير القيمة الرأسمالية للعقار بناء على الدخل الذي يحققه بعد خصم مصروفات التشغيل والصيانة والنفقات الأخرى.'
      },
      {
        id: 4, title: 'كيف اعترض على التثمين المحدد للعقار محل النزع؟', description: 'تضمنت المادة الرابعة والعشرين من نظام نزع ملكية العقارات للمنفعة العامة ووضع اليد المؤقت على العقار الصادر بالمرسوم الملكي رقم م/ 15 وتاريخ 11/3/1442هـ (انه يجوز لأصحاب الشأن التظلم أمام ديوان المظالم من جميع قرارات اللجان والأجهزة الإدارية التي تتخذ وفقا لهذا النظام خلال ستين يوما من تاريخ ابلاغهم بالقرار).'
      },
      {
        id: 5, title: 'ماهي منصة انتفاع؟', description: 'منصة الكترونية تابعة للهيئة العامة لعقارات الدولة تهدف إلى تقديم كافة الخدمات العقارية وتسهيل إنجاز الطلبات إلكترونياً للمستفيدين من جهات حكومية، قطاع خاص وأفراد'
      },
      {
        id: 3, title: 'كيف يمكنني التقديم على فرصة استثمارية؟', description: 'يمكنك الاطلاع على دليل المستخدم، للوصول انقر هنا'
      },
      {
        id: 6, title: 'ماهي الخدمات الإلكترونية التي تقدمها منصة انتفاع؟',
        description: ' يمكنك التعرف على الخدمات التي تقدمها منصة انتفاع من خلال صفحة الخدمات الإلكترونية، للوصول اضغط هنا'
      },
      {
        id: 7, title: 'أواجه مشكلة في أحد الخدمات الإلكترونية؟', description: 'يمكنك التواصل معنا لنتمكن من خدمتك عبر أحد قنوات الاتصال المتاحة في صفحة اتصل بنا'
      },

    ].reverse();
  }

}
