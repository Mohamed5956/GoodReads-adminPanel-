import { Component, OnChanges, OnInit } from '@angular/core';
import { Ibook } from 'src/app/models/ibook';
import Swal from 'sweetalert2';
import { AddbookComponent } from '../addbook/addbook.component';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { MatTableModule } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EditbookComponent } from '../editbook/editbook.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnChanges {
  image = `${environment.APIBaseURL}/assets/uploads/book`;
  displayedColumns: string[] = [
    'id',
    'title',
    'image',
    'description',
    'authorId',
    'categoryId',
    'actions',
  ];
  showMoreList: boolean[] = [];
  onShow(index: number) {
    this.showMoreList[index] = !this.showMoreList[index];
  }
  paginated!: any[];
  books!: Ibook[];
  currentPage!: number;
  pageSize!: number;
  totalPages!: number;
  pages: number[] = [];
  count: number = 0;
  constructor(
    private dialog: MatDialog,
    private bookservice: BookService,
    private router: Router
  ) {
    this.books = [];
    this.currentPage = 1;
    this.pageSize = 10;
    this.totalPages = 5;
    this.pages = [];
    this.paginated = [];
  }
  ngOnInit() {
    this.bookservice.getAllBooks().subscribe((bookList) => {
      this.books = bookList;
      this.calculatePages();
      this.paginated = this.books.slice(this.count, this.pageSize);
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddbookComponent, {
      width: '400px',
    });
    dialogRef.componentInstance.BookAdded.subscribe(() => {
      this.bookservice.getAllBooks().subscribe((bookList) => {
        this.books = bookList;
      });
    });
  }
  openEditDialog(id: string) {
    const dialogRef = this.dialog.open(EditbookComponent, {
      width: '400px',
      data: { bookId: id },
    });
  }
  ngOnChanges() {
    this.openDialog();
  }
  deleteBook(id: string) {
    this.bookservice.deleteBook(id).subscribe({
      next: (v) => {
        Swal.fire('Deleted Succesfully!', 'You clicked the button!', 'success');
        this.books = this.books.filter((b) => b._id !== id);

        this.router.navigate(['/books']);
      },
      error: (e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      },
    });
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.books.length / this.pageSize);
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    this.currentPage = page;
    let start = this.currentPage * 10 - 10
    let end = this.currentPage * 10
    this.paginated = this.books.slice(this.currentPage * 10 - 10, this.currentPage * 10);
    this.count = this.currentPage * 10 - 10;
    this.pageSize = this.currentPage * 10;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }

    this.count += 10;
    this.pageSize += 10;
    this.paginated = this.books.slice(this.count, this.pageSize)
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.count -= 10;
    this.pageSize -= 10;
    this.paginated = this.books.slice(this.count, this.pageSize);
  }
}
