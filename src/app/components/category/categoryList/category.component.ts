import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Icategory } from 'src/app/models/icategory';
import { CategoryService } from 'src/app/services/category.service';
import { AddcategoryComponent } from '../addcategory/addcategory.component';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['id', 'name', 'actions'];
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
        this.router.navigate(['/category']);
        window.location.reload();
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
