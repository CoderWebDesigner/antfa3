import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { langHelper } from 'src/app/services/helpers-and-utilities/language-helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  langVar;
  constructor(public langHelper: langHelper, private router: Router) { }

  ngOnInit(): void {
    this.langVar = this.langHelper.initializeMode();
  }


  NavigateToCompounds() {
    console.log(this.router.url)
    if (this.router.url == '/home') {
      let el = document.getElementById('compounds');
      el.scrollIntoView();
    }
    else {
      this.router.navigate(['/home'])
    }
  }
}
