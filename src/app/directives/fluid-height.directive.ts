import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from "@angular/core";
import { fromEvent } from "rxjs";
import { debounceTime, throttleTime } from "rxjs/operators";

@Directive({
  selector: "[fluidHeight]",
})
export class FluidHeightDirective implements AfterViewInit {
  @Input() minHeight: number = 250;
  @Input() maxHeight: number;
  
  // @Input() maxHeight: number = 400;
  @Input("fluidHeight") ratio: number;

  private domElement: HTMLElement;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.domElement = this.elementRef.nativeElement as HTMLElement;
    
    setTimeout(() => {
      this.setHeight();
    }, 100);
    // register on window resize event
    fromEvent(window, "resize")
      .pipe(throttleTime(500), debounceTime(500))
      .subscribe(() => this.setHeight());
  }

  ngAfterViewInit() {
    this.setHeight();
  }

  private setHeight() {
    let height = this.domElement.offsetWidth * this.ratio;

    // set min height instead of the calculated
    if (this.minHeight && height < this.minHeight * this.ratio) {
      height = this.minHeight * this.ratio;
    }

    if (this.maxHeight && height > this.maxHeight) {
      height = this.maxHeight;
    }

    this.renderer.setStyle(this.domElement, "height", `${height}px`);
  }
}
