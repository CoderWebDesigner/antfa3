import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { langHelper } from 'src/app/services/helpers-and-utilities/language-helper';

@Component({
  selector: 'app-intro-section',
  templateUrl: './intro-section.component.html',
  styleUrls: ['./intro-section.component.scss']
})
export class IntroSectionComponent implements OnInit {


  langVar;

  sliderImages;
  constructor(public langHelper: langHelper, private router: Router) {
    this.langVar = this.langHelper.initializeMode();
  }

  ngOnInit(): void {

    this.sliderImages = [
      { image: './assets/images/background/intro-back.jpeg' },
      { image: './assets/images/background/intro-back.jpeg' },
    ]
  }

}
