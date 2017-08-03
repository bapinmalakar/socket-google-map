import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[myDraggable]'
})
export class MydragableDirective {

  //private options: DraggableOptions = {};
  constructor() { }

  @HostBinding('draggable')
  get draggable(){
    return true;
  }

}
