import { Directive, HostBinding, HostListener, Output, ElementRef } from '@angular/core';

@Directive({
  selector: '[back-color]'
})
export class TextBackColor {
  private colorText: boolean = false;
  constructor(private el: ElementRef) { }

  @HostBinding('class.lead') private lead: boolean;


  @HostListener('click')
  onclick() {
    console.log('Color: ', this.el.nativeElement.style.background);
    this.colorText = !this.colorText;
    this.lead = this.colorText;
    console.log('Color Text', this.colorText);
    if (this.colorText)
      this.el.nativeElement.style.background = 'green';
    else
      this.el.nativeElement.style.background = 'red';
  }
}
