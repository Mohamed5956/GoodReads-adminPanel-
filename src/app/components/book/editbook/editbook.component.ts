import { Component, EventEmitter, Output, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Iauthor } from 'src/app/models/iauthor';
import { Ibook } from 'src/app/models/ibook';
import { Icategory } from 'src/app/models/icategory';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { BookListComponent } from '../book-list/book-list.component';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css'],
})
export class EditbookComponent {
  bookForm: FormGroup;
  name: boolean = false;
  selectedImage!: File;
  book: Ibook;
  @Input() bookId: string;
  @Output() BookUpdated = new EventEmitter<boolean>();
  categories: Icategory[];
  authors: Iauthor[];
  constructor(
    public dialogRef: MatDialogRef<BookListComponent>,
    private catService: CategoryService,
    private authorService: AuthorService,
    private bookService: BookService,
    private router: Router,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: string }
  ) {
    this.categories = [];
    this.authors = [];
    this.bookId = this.data.bookId;
    this.book = {};

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      authorId: ['', Validators.required],
      image: [],
    });
    this.bookId = this.data.bookId;
    this.book = {};
  }

  ngOnInit(): void {
    this.bookService.getBookById(this.bookId).subscribe((book) => {
      this.book = book;
      this.bookForm.patchValue({
        title: book.title,
        description: book.description,
        categoryId: book.categoryId,
        authorId: book.authorId,
      });
      console.log(book.description);
    });
    this.catService.getAllCategories().subscribe((cat) => {
      this.categories = cat;
      console.log(this.categories);
    });

    this.authorService.getAllAuthors().subscribe((author) => {
      this.authors = author;
      console.log(this.authors);
    });
  }
  saveData() {
    const bookImage = this.selectedImage;
    var form: any = new FormData();
    if (bookImage) {
      form.append('image', bookImage, bookImage?.name);
    } else {
      form.append('image', this.book.image);
    }
    form.append('title', this.bookForm.get('title')?.value);
    form.append('description', this.bookForm.get('description')?.value);
    form.append('authorId', this.bookForm.get('authorId')?.value);
    form.append('categoryId', this.bookForm.get('categoryId')?.value);
    for (const [key, value] of form.entries()) {
      console.log(`${key}: ${value}`);
    }
    this.bookService.updateBook(this.bookId, form).subscribe({
      next: (v) => {
        Swal.fire('Updated Succesfully!', 'You clicked the button!', 'success');
        this.BookUpdated.emit(true);
        this.router.navigate(['/books']);
        this.closeDialog();
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

  onSelectedFile(event: any) {
    this.selectedImage = <File>event.target.files[0];
    console.log(this.selectedImage);
  }

  closeDialog() {
    this.dialogRef.close();
  }
  get bookNAme() {
    return this.bookForm.get('name');
  }
}
