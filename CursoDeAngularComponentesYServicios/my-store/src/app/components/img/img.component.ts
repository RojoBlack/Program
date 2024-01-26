import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './img.component.html',
  styleUrl: './img.component.css'
})
export class ImgComponent implements OnInit {

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault = "https://picsum.photos/200"

  constructor() { }

  ngOnInit(): void {

  }

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    console.log('log hijo');
    this.loaded.emit();
  }
}
