import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Icategory } from 'src/app/models/icategory';
import { CategoryService } from 'src/app/services/category.service';
import { AddcategoryComponent } from '../addcategory/addcategory.component';
// import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  categories: Icategory[];
  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) {
    this.categories = [];
  }
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(catList => {
      this.categories = catList;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddcategoryComponent, {
      width: '400px',
    });
  }
}
