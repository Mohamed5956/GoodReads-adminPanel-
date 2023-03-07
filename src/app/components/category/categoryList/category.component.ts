import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Icategory } from 'src/app/models/icategory';
import { CategoryService } from 'src/app/services/category.service';
import { AddcategoryComponent } from '../addcategory/addcategory.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService
     categories:Array<any>
  ) {
  }
  ngOnInit(categories:Array<any>) {
    categories=new Array<Icategory>
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddcategoryComponent, {
      width: '400px',
    });
  }
}
