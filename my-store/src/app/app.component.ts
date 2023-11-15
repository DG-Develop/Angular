import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  showImg = true;
  imgRta = ''

  constructor(private authService: AuthService, private userService: UsersService, private filesService: FilesService, private tokenService: TokenService) { }

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if(token){
      this.authService.getProfile()
        .subscribe()
    }

  }

  onLoaded(img: string) {
    console.log('log padre ', img)
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.userService.create({
      name: 'David Gómez',
      email: 'dgdband@gmail.com',
      password: '123456',
      avatar: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp',
      role: 'customer'
    }).subscribe(data => {
      console.log(data)
    })
  }

  downloadPDF() {
    this.filesService.getFile('mypdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
      .subscribe()
  }

  onUpload(e: Event) {
    const element = e.target as HTMLInputElement

    const file = element.files?.item(0)
    if (file) {
      this.filesService.uploadile(file)
        .subscribe(rta => {
          this.imgRta = rta.location
        })
    }


  }
}
