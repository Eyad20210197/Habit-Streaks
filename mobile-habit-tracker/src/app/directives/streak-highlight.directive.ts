import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStreakHighlight]',
  standalone: true
})
export class StreakHighlightDirective implements OnChanges {
  @Input('appStreakHighlight') streak: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.streak > 5) {
      this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 0 12px 2px rgba(241, 0, 128, 0.4)');
      // A more subtle border color outline instead of full blown replacement
      this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #F10080');
      this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 300ms ease-in-out');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
      this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid transparent');
    }
  }
}
