import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { debounceTime, throttleTime } from "rxjs/operators";
import { GlobalVariablesCacheService } from "../services/globalVariables.service";

@Directive({
  selector: "[maxHeightSet]",
})
export class MaxHeightSetDirective implements AfterViewInit {
  
  @Input("maxHeightSet") heightVariableName: string;
  
  private domElement: HTMLElement;
  private subsciption: Observable<any> = null;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private cache: GlobalVariablesCacheService) {
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
    let currentHeight = this.domElement.offsetHeight;
    let maxHeight = this.cache.getVariableValue(this.heightVariableName, currentHeight)

    if (currentHeight > maxHeight) {
      maxHeight = this.cache.updateVariableValue(this.heightVariableName, currentHeight)
    }

    if (this.subsciption == null) {
      this.subsciption = this.cache.variableUpdateSubject
      this.subsciption.subscribe(([name, value]) => {
        if (this.heightVariableName == name) {
          this.renderer.setStyle(this.domElement, "height", `${value}px`);
        }
      })
    }

    setTimeout(() => {
      this.renderer.setStyle(this.domElement, "height", `${maxHeight}px`);
    }, 100);
    
  }
}
