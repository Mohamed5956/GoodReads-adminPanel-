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
  image = `${environment.APIBaseURL}/assets/uploads/book`
  displayedColumns: string[] = [
    'id',
    'title',
    'image',
    'description',
    'authorId',
    'categoryId',
    'reviewId',
    'actions',
  ];
  books: Ibook[];
  constructor(
    private dialog: MatDialog,
    private bookservice: BookService,
    private router: Router
  ) {
    this.books = [];
  }
  ngOnInit() {
    this.bookservice.getAllBooks().subscribe((bookList) => {
      this.books = bookList;
      console.log(this.books);
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
      data: { bookId: id }
    });}
  ngOnChanges() {
    this.openDialog();
  }
  deleteBook(id: string) {
    console.log(id);
    this.bookservice.deleteBook(id).subscribe({
      next: (v) => {
        console.log(v);
        Swal.fire('Deleted Succesfully!', 'You clicked the button!', 'success');
        this.router.navigate(['/books']);
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
