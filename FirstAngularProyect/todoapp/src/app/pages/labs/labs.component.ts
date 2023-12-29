import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Welcome';
  tasks = signal([
    'Install Angular CLI',
    'Create Proyect',
    'Create Components'
  ]);
  name = signal('René');
  age = 33;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = {
    name: 'René',
    age: 33,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  }

  clickhandler() {
    alert('Hola')
  }

  changehandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownhandler(event: KeyboardEvent) {
const input = event.target as HTMLInputElement;
console.log(input.value);
  }
}
