import { Component } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  widthImg = 10;
  name = 'David';
  age = 27;
  img = 'https://images.unsplash.com/photo-1690106431514-123a069f5912?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1286&q=80'
  btnDisabled = true;
  register = {
    name: '',
    email: '',
    password: ''
  }
box={
  width: 100,
  height: 100,
  background: 'crimson'
}
  person = {
    name: 'David',
    age: 27,
    avatar: 'https://images.unsplash.com/photo-1690106431514-123a069f5912?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1286&q=80'
  }

  names: string[] = ['David', 'Angelina', 'Omar']
  newName = ''
  products: Product[] = [{
    name: 'El mejor juguete',
    price: 565,
    image: './assets/images/toy.jpg',
    category: 'all',
  },
  {
    name: 'Bicicleta casi nueva',
    price: 356,
    image: './assets/images/bike.jpg'
  },
  {
    name: 'Colleción de albumnes',
    price: 34,
    image: './assets/images/album.jpg'
  },
  {
    name: 'Mis libros',
    price: 23,
    image: './assets/images/books.jpg'
  },
  {
    name: 'Casa para perro',
    price: 34,
    image: './assets/images/house.jpg'
  },
  {
    name: 'Gafas',
    price: 3434,
    image: './assets/images/glasses.jpg'
  }]

  toogleButton() {
    this.btnDisabled = !this.btnDisabled
  }

  increaseAge() {
    this.person.age += 1
  }
  onScroll(event: Event) {
    const element = event.target as HTMLDivElement;

    console.log(element.scrollTop)
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;

    this.person.name = input.value
  }

  addName() {
    this.names.push(this.newName)
    this.newName = ''
  }

  deleteName(index: number) {
    this.names.splice(index, 1)
  }

  onRegister(){
    console.log(this.register)
  }
}
