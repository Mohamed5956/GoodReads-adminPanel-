import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Icategory } from 'src/app/models/icategory';
import { CategoryService } from 'src/app/services/category.service';
import { AddcategoryComponent } from '../addcategory/addcategory.component';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
import { EditcategoryComponent } from '../editcategory/editcategory.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['id', 'image', 'name', 'actions'];
  categories: Icategory[];
  paginated!: any[];
  currentPage!: number;
  pageSize!: number;
  totalPages!: number;
  pages: number[] = [];
  count: number = 0;
  image = `${environment.APIBaseURL}/assets/uploads/category`;
  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categories = [];
    this.currentPage = 1;
    this.pageSize = 2;
    this.totalPages = 5;
    this.pages = [];
    this.paginated = [];
  }
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((catList) => {
      this.categories = catList;
      this.calculatePages();
      this.paginated = this.categories.slice(this.count, this.pageSize);
      console.log(this.categories);
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
  openEditDialog(id: string) {
    const dialogRef = this.dialog.open(EditcategoryComponent, {
      width: '400px',
      data: { categoryId: id }
    });
    dialogRef.componentInstance.categoryUpdated.subscribe(() => {
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
  calculatePages() {
    this.totalPages = Math.ceil(this.categories.length / this.pageSize);

    console.log(this.totalPages);
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    this.currentPage = page;
    // this.paginated = this.books.slice(this.count,this.pageSize);
    console.log(page)
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    // console.log('next');

    this.count += 2;
    this.pageSize += 2;
    this.paginated=this.categories.slice(this.count,this.pageSize)
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    console.log('prev');
    this.count -= 2;
    this.pageSize -= 2;
    this.paginated = this.categories.slice(this.count,this.pageSize);
  }
}
