import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Iauthor } from 'src/app/models/iauthor';
import { AuthorService } from 'src/app/services/author.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AuthorComponent } from '../authorList/author.component';

@Component({
  selector: 'app-editauthor',
  templateUrl: './editauthor.component.html',
  styleUrls: ['./editauthor.component.css']
})
export class EditauthorComponent {
  @Output() AuthorUpdated = new EventEmitter<boolean>();
  @Input() authorId: string;
  author: Iauthor
  authorForm: FormGroup;
  selectedImage!: File;
  constructor(
    public dialogRef: MatDialogRef<AuthorComponent>,
    private authorService: AuthorService,
    private router: Router,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { authorId: string },
    private datePipe: DatePipe

  ) {

    this.authorId = this.data.authorId;
    this.author = {};

    this.authorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      photo: [],
      birthDate: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.authorService.getAuthorById(this.authorId).subscribe(author => {
      this.author = author;
      const formattedDate = this.datePipe.transform(author.birthDate, 'yyyy-MM-dd');
      this.authorForm.patchValue({
        firstName: author.firstName,
        lastName: author.lastName,
        description: author.description,
        birthDate: formattedDate,
      })
    })
  }
  saveData() {
    var form: any = new FormData;
    const authorImage = this.selectedImage;
    if (authorImage) {
      form.append('photo', authorImage, authorImage?.name);
    } else {
      form.append('photo', this.author.photo);
    }
    form.append('birthDate', this.authorForm.get('birthDate')?.value)
    form.append('firstName', this.authorForm.get('firstName')?.value)
    form.append('lastName', this.authorForm.get('lastName')?.value)
    form.append('description', this.authorForm.get('description')?.value)
    for (const [key, value] of form.entries()) {
      console.log(`${key}: ${value}`);
    }
    this.authorService.updateAuthor(this.authorId, form).subscribe({
      next: (v) => {
        this.AuthorUpdated.emit(true);
        Swal.fire('Added Succesfully!', 'You clicked the button!', 'success');
        this.router.navigate(['/authors']);
        this.closeDialog();
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
}
