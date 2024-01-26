import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImgComponent } from './components/img/img.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImgComponent, FormsModule, ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  imgParent = '';
  products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      image: "https://picsum.photos/100",
      price: 100
    },
    {
      id: '2',
      name: 'Product 2',
      image: "https://picsum.photos/200",
      price: 200
    },
    {
      id: '3',
      name: 'Product 3',
      image: "https://picsum.photos/300",
      price: 300
    },
    {
      id: '4',
      name: 'Product 4',
      image: "https://picsum.photos/400",
      price: 400
    }
  ]

  onLoaded(img: string) {
    console.log('log padre', img);
  }
}
