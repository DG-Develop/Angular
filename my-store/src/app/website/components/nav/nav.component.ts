import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  activeMenu = false
  counter = 0
  profile: User | null = null;
  categories: Category[] = [];

  constructor(private storeService: StoreService, private authService: AuthService, private categoryService: CategoriesService, private route: Router){}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length
    })

    this.getAllCategories();

    this.authService.user$
      .subscribe(data => {
        this.profile = data;
      })
  }

  toogleMenu(){
    this.activeMenu = !this.activeMenu
  }

  login(){
    this.authService.loginAndGet("john@mail.com", "changeme")
    // this.authService.loginAndGet("admin@mail.com", "admin123")
      .subscribe(() => {
        this.route.navigate(['/profile'])
      })
  }

  getAllCategories(){
    this.categoryService.getAll()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  logout(){
    this.authService.logout()
    this.profile = null;
    this.route.navigate(['/home'])
  }
}
