import {
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
  OnInit,
  Input,
  OnDestroy
} from '@angular/core';

import { Subject, timer, Subscription, of } from 'rxjs';
import { debounceTime, tap, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[appConfirmButton]'
})
export class ConfirmButtonDirective implements OnInit, OnDestroy {
  @Input() confirmWindow = 5; // 5 seconds
  @Output() confirmed = new EventEmitter();

  private waitingSecondClick = false;
  private originalContent = '';
  private clicks$ = new Subject();
  private subscriptions: Subscription[] = [];

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.subscriptions.push(
      this.clicks$
        .pipe(
          debounceTime(250),
          switchMap(event => {
            if (this.waitingSecondClick) {
              this.confirmed.next(event);
              return of(event);
            }

            this.waitingSecondClick = true;
            this.originalContent = this.el.nativeElement.innerText;
            this.el.nativeElement.innerText = 'Click to Confirm';

            return timer(this.confirmWindow * 1000);
          }),
          tap(() => {
            this.waitingSecondClick = false;
            this.el.nativeElement.innerText = this.originalContent;
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  @HostListener('click', ['$event']) onClick(event) {
    this.clicks$.next(event);
    console.log('shit');
  }
}
