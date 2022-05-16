import { Component, OnInit } from '@angular/core';
import { FormBuilderHelper } from 'src/app/services/helpers-and-utilities/formBuilderHelper';
import { langHelper } from 'src/app/services/helpers-and-utilities/language-helper';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  langVar;


  items;
  responsiveOptions;


  constructor(public langHelper: langHelper, private formBuilderHelper: FormBuilderHelper) {
    this.langVar = this.langHelper.initializeMode();
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '768px',
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
        id: 1, title: ' تقديم + 30 خدمة عبر بوابة تفاعلية موحد', description: 'تسهل الوصول للخدمات على المستفيدين .'
      },
      {
        id: 2, title: 'التكامل الرقمي مع أنظمة الشركا ء', description: 'لتعزيز التعاون وتبادل البيانات والمعلومات بين الأنظمة المختلفة، وتقديم تجربة مميزة للمستفيد'
      },
      {
        id: 4, title: 'رفع جودة الخدمات المقدمة.', description: 'لتحسين تجربة المستفيدين وزيادة الرضا عن الخدمات المقدمة.'
      }
    ]
  }

}
