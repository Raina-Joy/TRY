import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { CountUp } from 'countup.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  @ViewChild('counterElement') counterElement: ElementRef;

ngOnInit() {
    const countUp = new CountUp(this.counterElement.nativeElement,91242);
    countUp.start();
  }
}