import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  activeMenu = false;

  constructor() { }

  ngOnInit(): void {

  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

}
