import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { AddcategoryComponent } from '../addcategory/addcategory.component';
// import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) {
    let categories: Array<string>
  }
  ngOnInit() {
    categories = CategoryService;
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddcategoryComponent, {
      width: '400px',
    });
  }
}
