import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {
  viewButton = true;

  @Input() temp: any[];

  @ViewChild('item', { static: false }) accordion;

  toggleMain() {
    this.accordion.toggle();
  }
  constructor() { }

  ngOnInit() {
    console.log(this.temp);
  }

}
