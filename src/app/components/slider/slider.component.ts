import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  @Input() sliderTitle: string;
  @Input() size: string;

  constructor() {
    this.sliderTitle = '';
    this.size = 'big';
  }

  ngOnInit(): void {}
}
