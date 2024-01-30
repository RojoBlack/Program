import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImgComponent } from './components/img/img.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { Product } from './models/product.model';
import { CommonModule, NgForOf } from '@angular/common';
import { ProductsComponent } from "./components/products/products.component";
import { NavComponent } from "./components/nav/nav.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ImgComponent, FormsModule, ProductComponent, CommonModule, ProductsComponent, NgForOf, NavComponent]
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }
}
