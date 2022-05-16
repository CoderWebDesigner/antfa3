import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { delay, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private primengConfig: PrimeNGConfig, router: Router, viewportScroller: ViewportScroller) {
    router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .pipe(delay(1))   // <--------------------------- This line
      .subscribe((e) => {
        if (e.position) {
          // backward navigation
          viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
          // anchor navigation
          viewportScroller.scrollToAnchor(e.anchor);
        } else {
          // forward navigation
          viewportScroller.scrollToPosition([0, 0]);
        }
      });
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
  }


}
