import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Welcome';
  tasks = [
    'Install Angular CLI',
    'Create Proyect',
    'Create Components'
  ];
  name = 'René';
  age = 33
}
