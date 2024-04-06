import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0.8
      })),
      transition('void <=> *', animate(3000)),
    ])
  ]
})
export class RewardsComponent {
  showDiv: boolean = false;

  toggleDiv() {
    this.showDiv = !this.showDiv;
  }
}


