import { Component, ElementRef, OnInit } from '@angular/core';
import { langHelper } from 'src/app/services/helpers-and-utilities/language-helper';
import { ViewChild } from '@angular/core';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-investment-opportunities',
  templateUrl: './investment-opportunities.component.html',
  styleUrls: ['./investment-opportunities.component.scss']
})
export class InvestmentOpportunitiesComponent implements OnInit {

  items;


  responsiveOptions;


  constructor(public langHelper: langHelper ) {

    //Carousel responsive options
    this.responsiveOptions =  [
      {
        breakpoint: '991px',
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

    this.items = [
      {
        id: 1, type: 'فرصة إستثمارية في مدينة الرياض', image: './assets/images/background/introbg.png',
        title: 'مدة عقد الإيجار تصل إلى 25 سنة',
        description: 'تقع الأرض في مدينة الرياض بحي المعذر الشمالي على طريق مكة المكرمة، ويمتاز موقعها بسهولة الوصول إلى المشاريع الكبرى في الرياض لوقوعها بين طريقي التخصصي والأمير تركي الأول وتبلغ مساحتها (8,000) م2'
      },
      {
        id: 2, type: 'فرصة إستثمارية في مدينة الدمام', image: './assets/images/background/introbg2.png',
        title: 'مدة عقد الإيجار تصل إلى 25 سنة',
        description: 'تقع الأرض بحي السوق وسط الدمام على شارع الأمير محمد، ويمتاز موقعها بتنوع الأنشطة التجارية من حولها  مثل المطاعم والمقاهي والتموينات ، وتبلغ مساحتها (2,389 )م2'
      },
      {
        id: 3, type: 'فرصة إستثمارية في منطقة الباحة ', image: './assets/images/background/introbg3.png',
        title: 'مدة تأجيرية تصل إلى 10 سنوات ',
        description: 'قصر افراح بمحافظة بلجرشي تبلغ مساحته (7,885,87)م2 ويمتاز موقعها بالقرب من منطقة حيوية في وسط المدينة ووجودها على شارع مهم'
      },
      {
        id: 4, type: 'فرصة إستثمارية في مدينة الرياض', image: './assets/images/background/introbg.png',
        title: 'مدة عقد الإيجار تصل إلى 25 سنة',
        description: 'تقع الأرض في مدينة الرياض بحي المعذر الشمالي على طريق مكة المكرمة، ويمتاز موقعها بسهولة الوصول إلى المشاريع الكبرى في الرياض لوقوعها بين طريقي التخصصي والأمير تركي الأول وتبلغ مساحتها (8,000) م2'
      },
    ].reverse()
  }

  ngOnInit(): void {

  }



}
