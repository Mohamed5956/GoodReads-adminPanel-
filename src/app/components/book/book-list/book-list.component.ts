import { Component, OnChanges, OnInit } from '@angular/core';
import { Ibook } from 'src/app/models/ibook';
import Swal from 'sweetalert2';
import { AddbookComponent } from '../addbook/addbook.component';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { MatTableModule } from '@angular/material/table';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnChanges {
  displayedColumns: string[] = [
    'id',
    'title',
    'image',
    'description',
    'authorId',
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
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddbookComponent, {
      width: '400px',
    });
  }
  ngOnChanges() {
    this.openDialog();
  }
  deleteBook(id: string) {
    console.log(id);
    this.bookservice.deleteBook(id).subscribe({
      next: (v) => {
        console.log(v);
        Swal.fire('Deleted Succesfully!', 'You clicked the button!', 'success');
        this.router.navigate(['/book']);
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
