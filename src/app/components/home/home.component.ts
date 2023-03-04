import { Component, OnInit } from '@angular/core';
import { Icategory } from 'src/app/models/icategory';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Array<Icategory>
  constructor(private categoryService: CategoryService) {
    this.categories = [];
  }
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(cat => {
      console.log(cat);
    });
  }

}
