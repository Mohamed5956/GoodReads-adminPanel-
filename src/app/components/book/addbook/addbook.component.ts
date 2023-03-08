import { Component } from '@angular/core';
import { Ibook } from 'src/app/models/ibook';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BookService } from 'src/app/services/book.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookListComponent } from '../book-list/book-list.component';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddbookComponent {
  newBook: Ibook = {};
  bookForm: FormGroup;
  name: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<BookListComponent>,
    private bookserivce: BookService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      authorId: ['', Validators.required],
      reviewId: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
  saveData() {
    this.newBook = {
      title: this.bookForm.value.title,
      description: this.bookForm.value.description,
      categoryId: this.bookForm.value.categoryId,
      authorId: this.bookForm.value.authorId,
      reviewId: this.bookForm.value.reviewId,
      image: this.bookForm.value.image,
    };
    console.log(this.newBook);
    this.bookserivce.addBook(this.newBook).subscribe({
      next: (v: any) => {
        console.log(v);
        Swal.fire('Added Succesfully!', 'You clicked the button!', 'success');
        this.router.navigate(['/book']);
        this.closeDialog();
      },
      error: (e: any) => {
        console.error(e);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
