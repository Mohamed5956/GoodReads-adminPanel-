import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Icategory } from 'src/app/models/icategory';
import { CategoryService } from 'src/app/services/category.service';
import { AddcategoryComponent } from '../addcategory/addcategory.component';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnChanges {
  image = `${environment.APIBaseURL}/assets/uploads/category`;
  displayedColumns: string[] = ['id', 'image', 'name', 'actions'];
  categories: Icategory[];
  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categories = [];
  }
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((catList) => {
      this.categories = catList;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddcategoryComponent, {
      width: '400px',
    });
    dialogRef.componentInstance.categoryAdded.subscribe(() => {
      this.categoryService.getAllCategories().subscribe((catList) => {
        this.categories = catList;
      });
    });
  }
  ngOnChanges() {
    this.openDialog();
  }
  deleteCategory(id: string) {
    console.log(id);
    this.categoryService.deleteCategory(id).subscribe({
      next: (v) => {
        console.log(v);
        Swal.fire('Deleted Succesfully!', 'You clicked the button!', 'success');
        this.categories = this.categories.filter((c) => c._id !== id);
      },
      error: (e) => {
        console.error(e);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      },
    });
  }
}
