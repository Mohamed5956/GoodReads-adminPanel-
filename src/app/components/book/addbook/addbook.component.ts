import { Component, OnInit } from '@angular/core';
import { Ibook } from 'src/app/models/ibook';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BookService } from 'src/app/services/book.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookListComponent } from '../book-list/book-list.component';
import { Icategory } from 'src/app/models/icategory';
import { CategoryService } from 'src/app/services/category.service';
import { AuthorService } from 'src/app/services/author.service';
import { Iauthor } from 'src/app/models/iauthor';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddbookComponent implements OnInit {
  newBook: Ibook = {};
  bookForm: FormGroup;
  name: boolean = false;
  selectedImage!: File;
  categories: Icategory[];
  authors: Iauthor[];
  constructor(
    public dialogRef: MatDialogRef<BookListComponent>,
    private bookserivce: BookService,
    private catService: CategoryService,
    private authorService: AuthorService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.categories = [];
    this.authors = [];
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      authorId: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.catService.getAllCategories().subscribe((cat) => {
      this.categories = cat;
      console.log(this.categories);
    });

    this.authorService.getAllAuthors().subscribe((author) => {
      this.authors = author;
    });
  }
  saveData() {
    var formData: any = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);
    this.newBook = {
      title: this.bookForm.value.title,
      description: this.bookForm.value.description,
      categoryId: this.bookForm.value.categoryId,
      authorId: this.bookForm.value.authorId,
      image: this.selectedImage.name,
    };
    console.log(this.newBook);
    this.bookserivce.addBook(this.newBook).subscribe({
      next: (v: any) => {
        console.log(v);
        Swal.fire('Added Succesfully!', 'You clicked the button!', 'success');
        this.router.navigate(['/books']);
        this.closeDialog();
        window.location.reload();
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

  onSelectedFile(event: any) {
    this.selectedImage = <File>event.target.files[0];
    console.log(this.selectedImage);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
